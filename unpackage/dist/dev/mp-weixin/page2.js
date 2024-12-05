"use strict";
const common_vendor = require("./common/vendor.js");
const common_request = require("./common/request.js");
const utils_store = require("./utils/store.js");
const PopupWrapper = () => "./components/PopupManager/PopupManager.js";
const _sfc_main = {
  components: {
    PopupWrapper
  },
  setup() {
    const popupWrapper = common_vendor.ref(null);
    const list = common_vendor.reactive([]);
    const toView = common_vendor.ref();
    const titlePositions = common_vendor.ref([]);
    const currentCategoryIndex = common_vendor.ref(0);
    const keyword = common_vendor.ref("搜索");
    const currentProducts = common_vendor.computed(() => {
      const currentCategory = list[currentCategoryIndex.value].categoryName;
      return list.filter((item) => item.categoryName === currentCategory);
    });
    const switchCategory = (index) => {
      toView.value = "title" + index;
      currentCategoryIndex.value = index;
    };
    const selectProduct = (product) => {
      console.log("选择商品：", product);
      common_vendor.index.navigateTo({
        url: `/pages/productDetail/productDetail?name=${product.name}`
      });
    };
    const toAddDish = () => {
      if (!list.value) {
        common_vendor.index.navigateTo({
          url: "/pages/mine/login"
        });
        return;
      }
      const toList = list.value.map(({ dishes, categoryOrder, ...rest }) => rest);
      common_vendor.index.setStorageSync("categoriesList", toList);
      common_vendor.index.navigateTo({
        url: "/pages/dish/loverAddDish"
      });
    };
    const toAddCategories = () => {
      if (!list.value) {
        common_vendor.index.navigateTo({
          url: "/pages/mine/login"
        });
        return;
      }
      const toList = list.value.map(({ dishes, categoryOrder, ...rest }) => rest);
      common_vendor.index.setStorageSync("categoriesList", toList);
      common_vendor.index.navigateTo({
        url: "/pages/dish/loverAddCategories"
      });
    };
    const scroll = (e) => {
      const scrollTop = e.detail.scrollTop + 152;
      for (let i = 0; i < titlePositions.value.length; i++) {
        if (scrollTop >= titlePositions.value[i] && (i === titlePositions.value.length - 1 || scrollTop < titlePositions.value[i + 1])) {
          if (currentCategoryIndex.value !== i) {
            currentCategoryIndex.value = i;
          }
          break;
        }
      }
    };
    common_vendor.onMounted(async () => {
      var _a, _b;
      try {
        const response = await common_request.request.get("/lover-categories/list-dish/vo");
        if (response.code === 0) {
          response.data.sort((a, b) => {
            return a.categoryOrder - b.categoryOrder;
          });
          list.value = response.data;
        } else {
          (_a = popupWrapper.value) == null ? void 0 : _a.openMessage("error", response.message);
        }
      } catch (error) {
        console.log("数据请求失败", error);
        (_b = popupWrapper.value) == null ? void 0 : _b.openMessage("error", "数据请求失败");
      }
      setTimeout(() => {
        var _a2;
        const query = common_vendor.index.createSelectorQuery().in(this);
        (_a2 = list.value) == null ? void 0 : _a2.forEach((item, index) => {
          console.log(item);
          query.select(`#title${index}`).boundingClientRect();
        });
        query.exec((res) => {
          console.log("节点信息：", res);
          titlePositions.value = res.map((item) => item ? item.top : 0);
        });
      }, 100);
    });
    const to_dish_info = async (dishid) => {
      var _a, _b;
      console.log(dishid);
      try {
        const response = await common_request.request.post("/lover-dish/get", {
          "id": dishid
        });
        if (response.code === 0) {
          utils_store.store.commit("setSelectedDish", response.data);
          common_vendor.index.navigateTo({
            url: "/pages/dish/dishdetails"
          });
        } else {
          (_a = popupWrapper.value) == null ? void 0 : _a.openMessage("error", response.message);
        }
      } catch (error) {
        console.log("数据请求失败", error);
        (_b = popupWrapper.value) == null ? void 0 : _b.openMessage("error", "数据请求失败");
      }
    };
    return {
      currentCategoryIndex,
      keyword,
      currentProducts,
      switchCategory,
      selectProduct,
      toAddDish,
      toAddCategories,
      list,
      toView,
      scroll,
      popupWrapper,
      to_dish_info
    };
  }
};
if (!Array) {
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _component_popup_wrapper = common_vendor.resolveComponent("popup-wrapper");
  (_easycom_u_search2 + _easycom_u_button2 + _component_popup_wrapper)();
}
const _easycom_u_search = () => "./node-modules/uview-plus/components/u-search/u-search.js";
const _easycom_u_button = () => "./node-modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_search + _easycom_u_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $setup.keyword = $event),
    b: common_vendor.p({
      placeholder: "",
      modelValue: $setup.keyword
    }),
    c: common_vendor.f($setup.list.value, (item, index, i0) => {
      return {
        a: common_vendor.t(item.categoryName),
        b: index,
        c: common_vendor.n($setup.currentCategoryIndex === index ? "active" : ""),
        d: common_vendor.o(($event) => $setup.switchCategory(index), index)
      };
    }),
    d: common_vendor.f($setup.list.value, (category, index, i0) => {
      return {
        a: common_vendor.t(category.categoryName),
        b: "title" + index,
        c: common_vendor.f(category.dishes, (item, seq, i1) => {
          return {
            a: item.imageUrl,
            b: common_vendor.t(item.dishName),
            c: common_vendor.t(item.spec),
            d: common_vendor.t(item.dishPrice),
            e: common_vendor.o(($event) => $setup.selectProduct(_ctx.product), seq),
            f: "1a0b1a9e-1-" + i0 + "-" + i1,
            g: seq,
            h: common_vendor.o(($event) => $setup.to_dish_info(item.id), seq)
          };
        }),
        d: index
      };
    }),
    e: common_vendor.p({
      text: "选规格",
      shape: "circle",
      size: "mini"
    }),
    f: $setup.toView,
    g: common_vendor.o((...args) => $setup.scroll && $setup.scroll(...args)),
    h: common_vendor.o(($event) => $setup.toAddCategories()),
    i: common_vendor.p({
      color: "red",
      type: "primary",
      plain: "true",
      text: "分类管理",
      shape: "circle"
    }),
    j: common_vendor.o(($event) => $setup.toAddDish()),
    k: common_vendor.p({
      color: "rgba(213, 51, 186, 0.4)",
      type: "primary",
      text: "添加菜谱",
      shape: "circle"
    }),
    l: common_vendor.sr("popupWrapper", "1a0b1a9e-4")
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
exports.MiniProgramPage = MiniProgramPage;
