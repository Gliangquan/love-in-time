"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = {
  name: "topTabBarDynamic",
  props: {
    title: {
      type: String,
      default: "Menu"
    },
    showBackButton: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBack();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.showBackButton
  }, $props.showBackButton ? {
    b: common_assets._imports_0$1,
    c: common_vendor.o((...args) => $options.goBack && $options.goBack(...args))
  } : {}, {
    d: common_vendor.t($props.title)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-33372f63"]]);
wx.createComponent(Component);
