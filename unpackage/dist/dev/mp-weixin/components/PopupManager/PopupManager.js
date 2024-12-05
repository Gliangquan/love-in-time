"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: {
    defaultMessage: {
      type: String,
      default: "这是一条消息提示"
    }
  },
  data() {
    return {
      type: "center",
      msgType: "success",
      messageText: this.defaultMessage,
      inputValue: ""
    };
  },
  methods: {
    openPopup(type, msg = null) {
      this.type = type;
      this.messageText = msg ? `${msg}` : `这是一个默认的 ${type} 消息提示`;
      this.$refs.popup.open(type);
    },
    openMessage(type, msg = null) {
      this.msgType = type;
      this.messageText = msg ? `${msg}` : `这是一个默认的 ${type} 消息提示`;
      this.$refs.message.open();
    },
    openDialog(type, msg = null) {
      this.msgType = type;
      this.messageText = msg ? `${msg}` : `这是一个默认的 ${type} 消息提示`;
      this.$refs.alertDialog.open();
    },
    // 打开弹窗并设置默认输入值
    openInputDialog(msg = null) {
      this.inputValue = msg;
      this.$refs.inputDialog.open();
    },
    openShare() {
      this.$refs.share.open();
    },
    onPopupChange(e) {
      this.$emit("popupChange", e);
    },
    onDialogConfirm() {
      this.$emit("dialogConfirm");
    },
    onDialogClose() {
      this.$emit("dialogClose");
    },
    onDialogInputConfirm(value) {
      this.inputValue = value;
      this.$emit("dialogInputConfirm", value);
      this.$refs.inputDialog.close();
    }
  }
};
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup_share2 = common_vendor.resolveComponent("uni-popup-share");
  (_easycom_uni_popup2 + _easycom_uni_popup_message2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup_share2)();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup_share = () => "../../uni_modules/uni-popup/components/uni-popup-share/uni-popup-share.js";
if (!Math) {
  (_easycom_uni_popup + _easycom_uni_popup_message + _easycom_uni_popup_dialog + _easycom_uni_popup_share)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.messageText),
    b: $data.type === "left" || $data.type === "right" ? 1 : "",
    c: common_vendor.sr("popup", "67b27621-0"),
    d: common_vendor.o($options.onPopupChange),
    e: common_vendor.p({
      ["background-color"]: "#fff"
    }),
    f: common_vendor.p({
      type: $data.msgType,
      message: $data.messageText,
      duration: 1e4
    }),
    g: common_vendor.sr("message", "67b27621-1"),
    h: common_vendor.p({
      type: "message"
    }),
    i: common_vendor.o($options.onDialogConfirm),
    j: common_vendor.o($options.onDialogClose),
    k: common_vendor.p({
      type: $data.msgType,
      cancelText: "关闭",
      confirmText: "同意",
      title: "通知",
      content: $data.messageText
    }),
    l: common_vendor.sr("alertDialog", "67b27621-3"),
    m: common_vendor.p({
      type: "dialog"
    }),
    n: common_vendor.sr("inputClose", "67b27621-6,67b27621-5"),
    o: common_vendor.o($options.onDialogInputConfirm),
    p: common_vendor.o(($event) => $data.inputValue = $event),
    q: common_vendor.p({
      mode: "input",
      title: "输入内容",
      placeholder: "请输入内容",
      modelValue: $data.inputValue
    }),
    r: common_vendor.sr("inputDialog", "67b27621-5"),
    s: common_vendor.p({
      type: "dialog"
    }),
    t: common_vendor.sr("share", "67b27621-7"),
    v: common_vendor.p({
      type: "share",
      safeArea: true,
      backgroundColor: "#fff"
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
