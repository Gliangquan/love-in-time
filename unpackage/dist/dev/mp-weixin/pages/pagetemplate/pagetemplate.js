"use strict";
const common_vendor = require("../../common/vendor.js");
const btnTabBarDynamicVue = () => "../../components/btnTabBarDynamic.js";
const topTabBarDynamicVue = () => "../../components/topTabBarDynamic.js";
const indeVue = () => "../index/index2.js";
const page2Vue = () => "../page2/page22.js";
const page3Vue = () => "../page3/page32.js";
const mineVue = () => "../mine/mine2.js";
const pages = [
  "/pages/index/index",
  "/pages/page2/page2",
  "/pages/page3/page3",
  "/pages/mine/mine"
];
const _sfc_main = {
  components: {
    btnTabBarDynamicVue,
    topTabBarDynamicVue,
    indeVue,
    page2Vue,
    page3Vue,
    mineVue
  },
  data() {
    return {
      selectedIndex: 2,
      // 初始化选中项
      PageCur: "/pages/page3/page3"
      // 默认页面
    };
  },
  methods: {
    handleMenuSelect(index) {
      this.PageCur = pages[index];
      this.selectedIndex = index;
    }
  }
};
if (!Array) {
  const _component_topTabBarDynamicVue = common_vendor.resolveComponent("topTabBarDynamicVue");
  const _component_indeVue = common_vendor.resolveComponent("indeVue");
  const _component_page2Vue = common_vendor.resolveComponent("page2Vue");
  const _component_page3Vue = common_vendor.resolveComponent("page3Vue");
  const _component_mineVue = common_vendor.resolveComponent("mineVue");
  const _component_btnTabBarDynamicVue = common_vendor.resolveComponent("btnTabBarDynamicVue");
  (_component_topTabBarDynamicVue + _component_indeVue + _component_page2Vue + _component_page3Vue + _component_mineVue + _component_btnTabBarDynamicVue)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      title: "Title",
      showBackButton: true
    }),
    b: $data.PageCur === "/pages/index/index"
  }, $data.PageCur === "/pages/index/index" ? {} : {}, {
    c: $data.PageCur === "/pages/page2/page2"
  }, $data.PageCur === "/pages/page2/page2" ? {} : {}, {
    d: $data.PageCur === "/pages/page3/page3"
  }, $data.PageCur === "/pages/page3/page3" ? {} : {}, {
    e: $data.PageCur === "/pages/mine/mine"
  }, $data.PageCur === "/pages/mine/mine" ? {} : {}, {
    f: common_vendor.o($options.handleMenuSelect),
    g: common_vendor.p({
      selectedIndex: $data.selectedIndex
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
