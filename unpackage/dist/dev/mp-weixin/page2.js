"use strict";
const common_vendor = require("./common/vendor.js");
const _sfc_main = {
  components: {
    // numberBox
  },
  methods: {
    handleValueUpdate(newValue) {
      console.log("更新后的数字为:", newValue);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
exports.MiniProgramPage = MiniProgramPage;
