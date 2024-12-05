"use strict";
const common_vendor = require("../../common/vendor.js");
const common_request = require("../../common/request.js");
const topTabBarDynamicVue = () => "../../components/topTabBarDynamic.js";
const _sfc_main = {
  name: "login",
  components: {
    topTabBarDynamicVue
  },
  data() {
    return {
      loverAccount: "",
      // 可以是手机号或账号
      loverPassword: ""
      // 密码
    };
  },
  methods: {
    async handleLogin() {
      if (!this.loverAccount || !this.loverPassword) {
        common_vendor.index.showToast({
          title: "请输入账号或密码",
          duration: 1e3
        });
        return;
      }
      try {
        const response = await common_request.request.post("/lover/login", {
          loverAccount: this.loverAccount,
          loverPassword: this.loverPassword
        });
        if (response.code === 0) {
          common_vendor.index.showToast({
            title: "登录成功",
            duration: 1e3
          });
        } else {
          common_vendor.index.showToast({
            title: "登录失败",
            duration: 1e3
          });
        }
      } catch (error) {
        common_vendor.index.showToast({
          title: "请求失败，请稍后重试",
          duration: 1e3
        });
      }
    }
  }
};
if (!Array) {
  const _component_topTabBarDynamicVue = common_vendor.resolveComponent("topTabBarDynamicVue");
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_component_topTabBarDynamicVue + _easycom_u_input2 + _easycom_u_button2)();
}
const _easycom_u_input = () => "../../node-modules/uview-plus/components/u-input/u-input.js";
const _easycom_u_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_input + _easycom_u_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "登录",
      showBackButton: true
    }),
    b: common_vendor.o(($event) => $data.loverAccount = $event),
    c: common_vendor.p({
      placeholder: "请输入账号或手机号",
      clearable: true,
      modelValue: $data.loverAccount
    }),
    d: common_vendor.o(($event) => $data.loverPassword = $event),
    e: common_vendor.p({
      placeholder: "请输入密码",
      type: "password",
      clearable: true,
      modelValue: $data.loverPassword
    }),
    f: common_vendor.o($options.handleLogin),
    g: common_vendor.p({
      type: "primary"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7110b05c"]]);
wx.createPage(MiniProgramPage);
