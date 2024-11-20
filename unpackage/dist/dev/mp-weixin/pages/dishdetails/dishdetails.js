"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_store = require("../../utils/store.js");
const common_assets = require("../../common/assets.js");
const numberBox = () => "../../components/numberBox/numberBox.js";
const topTabBarDynamicVue = () => "../../components/topTabBarDynamic.js";
const _sfc_main = {
  components: {
    numberBox,
    topTabBarDynamicVue
  },
  setup() {
    const dishitem = common_vendor.reactive({
      imgSrc: [
        "https://img.js.design/assets/img/66b48af16f38077bbb6fc891.png#9fe61a693049c3aa850128b76044780c",
        "https://img.js.design/assets/img/66b48af16f38077bbb6fc891.png#9fe61a693049c3aa850128b76044780c",
        "https://img.js.design/assets/img/66b48af16f38077bbb6fc891.png#9fe61a693049c3aa850128b76044780c"
      ],
      dishName: "菜品名称",
      dishPrice: 20,
      description: "这是菜品描述，这是菜品描述，这是菜品描述。这是菜品描述这是菜品描述这是菜品描述"
    });
    const showLineNum = common_vendor.ref(1);
    const clickMoreText = common_vendor.ref("More...");
    const clickMoreBtn = () => {
      showLineNum.value = showLineNum.value === 1 ? 100 : 1;
      clickMoreText.value = clickMoreText.value === "More..." ? "Less..." : "More...";
    };
    const menuItems = ["详情", "评价"];
    const selectedIndex = common_vendor.ref(0);
    const selectMenu = (index) => {
      selectedIndex.value = index;
    };
    const count = common_vendor.ref(6);
    const value = common_vendor.ref(2);
    const totlePrice = common_vendor.computed(() => {
      return dishitem.dishPrice * value.value;
    });
    common_vendor.onMounted(() => {
      const dish = utils_store.store.state.selectedDish;
      if (dish && dish.imgSrc) {
        dishitem.imgSrc.unshift(dish.imgSrc);
      }
    });
    return {
      dishitem,
      count,
      value,
      totlePrice,
      showLineNum,
      clickMoreText,
      clickMoreBtn,
      menuItems,
      selectedIndex,
      selectMenu
    };
  }
};
if (!Array) {
  const _component_topTabBarDynamicVue = common_vendor.resolveComponent("topTabBarDynamicVue");
  const _easycom_u_text2 = common_vendor.resolveComponent("u-text");
  const _easycom_u_divider2 = common_vendor.resolveComponent("u-divider");
  const _easycom_u_rate2 = common_vendor.resolveComponent("u-rate");
  const _easycom_u__text2 = common_vendor.resolveComponent("u--text");
  const _easycom_numberBox2 = common_vendor.resolveComponent("numberBox");
  (_component_topTabBarDynamicVue + _easycom_u_text2 + _easycom_u_divider2 + _easycom_u_rate2 + _easycom_u__text2 + _easycom_numberBox2)();
}
const _easycom_u_text = () => "../../node-modules/uview-plus/components/u-text/u-text.js";
const _easycom_u_divider = () => "../../node-modules/uview-plus/components/u-divider/u-divider.js";
const _easycom_u_rate = () => "../../node-modules/uview-plus/components/u-rate/u-rate.js";
const _easycom_u__text = () => "../../node-modules/uview-plus/components/u-text/u-text.js";
const _easycom_numberBox = () => "../../components/numberBox/numberBox.js";
if (!Math) {
  (_easycom_u_text + _easycom_u_divider + _easycom_u_rate + _easycom_u__text + _easycom_numberBox)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      title: "Title",
      showBackButton: true
    }),
    b: common_vendor.f(4, (item, index, i0) => {
      return {
        a: $setup.dishitem.imgSrc[index],
        b: common_vendor.n("swiper-item" + index),
        c: index
      };
    }),
    c: common_vendor.o((...args) => _ctx.change && _ctx.change(...args)),
    d: _ctx.swiperDotIndex,
    e: common_vendor.p({
      text: $setup.dishitem.dishName,
      lines: 1,
      size: "28px"
    }),
    f: common_vendor.p({
      text: ""
    }),
    g: common_vendor.o(($event) => $setup.value = $event),
    h: common_vendor.p({
      count: $setup.count,
      modelValue: $setup.value
    }),
    i: common_vendor.p({
      text: "$ " + $setup.dishitem.dishPrice,
      lines: 1,
      size: "28px"
    }),
    j: common_vendor.p({
      text: ""
    }),
    k: common_vendor.s($setup.selectedIndex === 0 ? {
      transform: "translateX(-100%)"
    } : {
      transform: "translateX(100%)"
    }),
    l: common_vendor.f($setup.menuItems, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index,
        c: $setup.selectedIndex === index ? 1 : "",
        d: common_vendor.o(($event) => $setup.selectMenu(index), index)
      };
    }),
    m: common_vendor.p({
      text: ""
    }),
    n: $setup.selectedIndex === 0
  }, $setup.selectedIndex === 0 ? {
    o: common_vendor.p({
      lines: $setup.showLineNum,
      text: $setup.dishitem.description
    }),
    p: common_vendor.o($setup.clickMoreBtn),
    q: common_vendor.p({
      text: $setup.clickMoreText,
      color: "#A289F8"
    })
  } : $setup.selectedIndex === 1 ? {} : {}, {
    r: $setup.selectedIndex === 1,
    s: $setup.selectedIndex === 0
  }, $setup.selectedIndex === 0 ? {
    t: common_vendor.p({
      text: "Quantity",
      color: "#090F24",
      size: "26px"
    }),
    v: common_vendor.o(_ctx.handleValueUpdate),
    w: common_vendor.p({
      initialValue: 0
    })
  } : {}, {
    x: common_vendor.t($setup.totlePrice),
    y: common_assets._imports_0
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
