"use strict";
const common_vendor = require("./common/vendor.js");
const _sfc_main = {
  name: "mine",
  setup() {
    return {};
  }
};
if (!Array) {
  const _easycom_u_avatar2 = common_vendor.resolveComponent("u-avatar");
  const _easycom_u_count_to2 = common_vendor.resolveComponent("u-count-to");
  (_easycom_u_avatar2 + _easycom_u_count_to2)();
}
const _easycom_u_avatar = () => "./node-modules/uview-plus/components/u-avatar/u-avatar.js";
const _easycom_u_count_to = () => "./node-modules/uview-plus/components/u-count-to/u-count-to.js";
if (!Math) {
  (_easycom_u_avatar + _easycom_u_count_to)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      src: "",
      shape: "circle"
    }),
    b: common_vendor.p({
      src: "",
      shape: "circle"
    }),
    c: common_vendor.p({
      startVal: 0,
      endVal: 30,
      ["font-size"]: "52px"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7c2ebfa5"]]);
exports.MiniProgramPage = MiniProgramPage;
