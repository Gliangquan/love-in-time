"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "dishItem",
  props: {
    imgSrc: {
      type: String,
      required: true
    },
    dishName: {
      type: String,
      required: true
    },
    dishHub: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    }
  }
};
if (!Array) {
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  const _easycom_u_text2 = common_vendor.resolveComponent("u-text");
  (_easycom_u_image2 + _easycom_u_text2)();
}
const _easycom_u_image = () => "../../node-modules/uview-plus/components/u-image/u-image.js";
const _easycom_u_text = () => "../../node-modules/uview-plus/components/u-text/u-text.js";
if (!Math) {
  (_easycom_u_image + _easycom_u_text)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      src: $props.imgSrc,
      shape: "square",
      width: "152px",
      height: "152px",
      radius: "10px"
    }),
    b: common_vendor.p({
      text: $props.dishName,
      lines: 1,
      size: "18px"
    }),
    c: common_vendor.p({
      text: $props.dishHub,
      lines: 1,
      size: "12px"
    }),
    d: common_vendor.p({
      mode: "price",
      text: $props.price,
      color: "#ff4c4c"
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-36c9ee7c"]]);
wx.createComponent(Component);
