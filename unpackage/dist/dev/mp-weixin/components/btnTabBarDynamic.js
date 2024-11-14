"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  name: "btnTabBarDynamic",
  props: {
    selectedIndex: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    const menuItems = [
      { icon: "../static/btnTabBarIcon/home_fill.png", icon_on: "../static/btnTabBarIcon/home_fill_on.png", text: "Home" },
      { icon: "../static/btnTabBarIcon/home_fill.png", icon_on: "../static/btnTabBarIcon/home_fill_on.png", text: "Other" },
      { icon: "../static/btnTabBarIcon/home_fill.png", icon_on: "../static/btnTabBarIcon/home_fill_on.png", text: "Menu" },
      { icon: "../static/btnTabBarIcon/person_fill.png", icon_on: "../static/btnTabBarIcon/person_fill_on.png", text: "Mine" }
    ];
    const isActive = (index) => props.selectedIndex === index;
    const selectMenu = (index) => {
      emit("menuSelect", index);
    };
    return {
      menuItems,
      isActive,
      selectMenu
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: `translateX(${$props.selectedIndex * 100}%)`,
    b: common_vendor.f($setup.menuItems, (item, index, i0) => {
      return common_vendor.e({
        a: $setup.isActive(index) ? item.icon_on : item.icon,
        b: $setup.isActive(index)
      }, $setup.isActive(index) ? {
        c: common_vendor.t(item.text)
      } : {}, {
        d: index,
        e: $setup.isActive(index) ? 1 : "",
        f: common_vendor.o(($event) => $setup.selectMenu(index), index)
      });
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-89c28a0e"]]);
wx.createComponent(Component);
