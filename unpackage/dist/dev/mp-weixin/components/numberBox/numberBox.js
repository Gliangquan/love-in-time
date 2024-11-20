"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = common_vendor.defineComponent({
  name: "numberBox",
  props: {
    initialValue: {
      type: Number,
      default: 0
    }
  },
  setup(props, context) {
    const numIcon = [
      { icon: "../../static/numBoxIcon/minus.png", icon_on: "../../static/numBoxIcon/minus-on.png" },
      { icon: "../../static/numBoxIcon/plus.png", icon_on: "../../static/numBoxIcon/plus-on.png" }
    ];
    const currentValue = common_vendor.ref(props.initialValue);
    const increase = () => {
      currentValue.value++;
    };
    const decrease = () => {
      if (currentValue.value > 0) {
        currentValue.value--;
      }
    };
    common_vendor.watch(currentValue, (newValue) => {
      context.emit("update:value", newValue);
    });
    const isMinusPressed = common_vendor.ref(false);
    const isPlusPressed = common_vendor.ref(false);
    const handleMouseDown = (type) => {
      if (type === "minus") {
        isMinusPressed.value = true;
      } else if (type === "plus") {
        isPlusPressed.value = true;
      }
    };
    const handleMouseUp = (type) => {
      if (type === "minus") {
        isMinusPressed.value = false;
      } else if (type === "plus") {
        isPlusPressed.value = false;
      }
    };
    return {
      currentValue,
      increase,
      decrease,
      numIcon,
      isMinusPressed,
      isPlusPressed,
      handleMouseDown,
      handleMouseUp
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: _ctx.isMinusPressed ? _ctx.numIcon[0].icon_on : _ctx.numIcon[0].icon,
    b: common_vendor.o(($event) => _ctx.handleMouseDown("minus")),
    c: common_vendor.o(($event) => _ctx.handleMouseUp("minus")),
    d: common_vendor.o((...args) => _ctx.decrease && _ctx.decrease(...args)),
    e: common_vendor.t(_ctx.currentValue),
    f: _ctx.isPlusPressed ? _ctx.numIcon[1].icon_on : _ctx.numIcon[1].icon,
    g: common_vendor.o(($event) => _ctx.handleMouseDown("plus")),
    h: common_vendor.o(($event) => _ctx.handleMouseUp("plus")),
    i: common_vendor.o((...args) => _ctx.increase && _ctx.increase(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
