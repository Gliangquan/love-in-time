"use strict";
const common_vendor = require("./common/vendor.js");
const common_request = require("./common/request.js");
const _sfc_main = {
  name: "mine",
  setup() {
    const loverInfo = common_vendor.ref({
      name_lover_a: "BOY",
      name_lover_b: "GIRL"
    });
    const tologin = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/login"
      });
    };
    const getlogin = async () => {
      try {
        const response = await common_request.request.get("/lover/get/login");
        if (response.code === 0) {
          loverInfo.value.name_lover_a = response.data.loverName;
        } else {
          console.log("未登录！！");
        }
      } catch (e) {
        common_vendor.index.showToast({
          title: "请求失败，请稍后重试",
          duration: 1e3
        });
      }
    };
    return {
      tologin,
      getlogin,
      loverInfo
    };
  }
};
if (!Array) {
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_avatar2 = common_vendor.resolveComponent("u-avatar");
  const _easycom_u_count_to2 = common_vendor.resolveComponent("u-count-to");
  (_easycom_u_button2 + _easycom_u_avatar2 + _easycom_u_count_to2)();
}
const _easycom_u_button = () => "./node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_avatar = () => "./node-modules/uview-plus/components/u-avatar/u-avatar.js";
const _easycom_u_count_to = () => "./node-modules/uview-plus/components/u-count-to/u-count-to.js";
if (!Math) {
  (_easycom_u_button + _easycom_u_avatar + _easycom_u_count_to)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $setup.tologin()),
    b: common_vendor.o(($event) => $setup.getlogin()),
    c: common_vendor.p({
      src: "",
      shape: "circle"
    }),
    d: common_vendor.t($setup.loverInfo.name_lover_a),
    e: common_vendor.p({
      src: "",
      shape: "circle"
    }),
    f: common_vendor.t($setup.loverInfo.name_lover_b),
    g: common_vendor.p({
      startVal: 0,
      endVal: 30,
      ["font-size"]: "52px"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7c2ebfa5"]]);
exports.MiniProgramPage = MiniProgramPage;
