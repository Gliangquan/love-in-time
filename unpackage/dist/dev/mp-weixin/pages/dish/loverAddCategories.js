"use strict";
const common_vendor = require("../../common/vendor.js");
const common_request = require("../../common/request.js");
const PopupWrapper = () => "../../components/PopupManager/PopupManager.js";
const topTabBarDynamicVue = () => "../../components/topTabBarDynamic.js";
const _sfc_main = {
  components: {
    topTabBarDynamicVue,
    PopupWrapper
  },
  setup() {
    const categories = common_vendor.ref([]);
    const dialogValue = common_vendor.ref("");
    const currentIndex = common_vendor.ref(null);
    const popupWrapper = common_vendor.ref(null);
    const openDialog = (index) => {
      currentIndex.value = index;
      dialogValue.value = index !== null ? categories.value[index].categoryName : "";
      popupWrapper.value.openInputDialog(dialogValue.value);
    };
    const onDialogInputConfirm = (value) => {
      if (currentIndex.value !== null) {
        categories.value[currentIndex.value].categoryName = value;
      } else {
        categories.value.push({
          categoryName: value,
          id: -1,
          isDeleting: false
        });
      }
    };
    const deleteCategory = async (index, item) => {
      var _a, _b;
      if (item.isDeleting) {
        categories.value.splice(index, 1);
        const response = await common_request.request.post("/lover-categories/delete", {
          id: item.id
        });
        if (response.code === 0) {
          (_a = popupWrapper.value) == null ? void 0 : _a.openMessage("success", response.message);
          list.value = response.data;
        } else {
          (_b = popupWrapper.value) == null ? void 0 : _b.openMessage("error", response.message);
        }
      } else {
        item.isDeleting = true;
      }
    };
    const moveUp = (index) => {
      if (index > 0) {
        const temp = categories.value[index];
        categories.value[index] = categories.value[index - 1];
        categories.value[index - 1] = temp;
      }
    };
    const moveDown = (index) => {
      if (index < categories.value.length - 1) {
        const temp = categories.value[index];
        categories.value[index] = categories.value[index + 1];
        categories.value[index + 1] = temp;
      }
    };
    const onConfirm = async () => {
      var _a, _b;
      const response = await common_request.request.post(
        "/lover-categories/add-list",
        categories.value
      );
      if (response.code === 0) {
        (_a = popupWrapper.value) == null ? void 0 : _a.openMessage("success", response.message);
        try {
          common_vendor.index.navigateBack();
        } catch (e) {
          common_vendor.index.redirectTo({
            url: `/pages/pagetemplate/pagetemplate?id=${1}`
          });
        }
      } else {
        (_b = popupWrapper.value) == null ? void 0 : _b.openMessage("error", response.message);
      }
    };
    common_vendor.onMounted(async () => {
      const categoriesList = common_vendor.index.getStorageSync("categoriesList");
      console.log(categoriesList);
      categories.value = JSON.parse(JSON.stringify(categoriesList));
    });
    return {
      categories,
      dialogValue,
      currentIndex,
      popupWrapper,
      openDialog,
      onDialogInputConfirm,
      deleteCategory,
      moveUp,
      moveDown,
      onConfirm
    };
  }
};
if (!Array) {
  const _component_popup_wrapper = common_vendor.resolveComponent("popup-wrapper");
  const _component_topTabBarDynamicVue = common_vendor.resolveComponent("topTabBarDynamicVue");
  (_component_popup_wrapper + _component_topTabBarDynamicVue)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sr("popupWrapper", "5d0b33fd-0"),
    b: common_vendor.o(_ctx.onPopupChange),
    c: common_vendor.o(_ctx.onDialogConfirm),
    d: common_vendor.o($setup.onDialogInputConfirm),
    e: common_vendor.p({
      ["default-message"]: "默认提示消息"
    }),
    f: common_vendor.p({
      title: "添加类别",
      showBackButton: "true"
    }),
    g: common_vendor.f($setup.categories, (item, index, i0) => {
      return {
        a: common_vendor.t(item.categoryName),
        b: common_vendor.o(($event) => $setup.openDialog(index), item.id),
        c: common_vendor.o(($event) => $setup.moveUp(index), item.id),
        d: common_vendor.o(($event) => $setup.moveDown(index), item.id),
        e: item.isDeleting ? 1 : "",
        f: common_vendor.o(($event) => $setup.deleteCategory(index, item), item.id),
        g: item.id
      };
    }),
    h: common_vendor.o(($event) => $setup.openDialog(null)),
    i: common_vendor.o((...args) => $setup.onConfirm && $setup.onConfirm(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5d0b33fd"]]);
wx.createPage(MiniProgramPage);
