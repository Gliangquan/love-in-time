"use strict";
const common_vendor = require("./common/vendor.js");
const slideMenuVue = () => "./components/slideMenu/slideMenu.js";
const _sfc_main = {
  components: {
    slideMenuVue
  },
  name: "Home",
  setup() {
    return {};
  }
};
if (!Array) {
  const _component_slideMenuVue = common_vendor.resolveComponent("slideMenuVue");
  _component_slideMenuVue();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
exports.MiniProgramPage = MiniProgramPage;
