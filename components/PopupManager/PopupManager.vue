<template>
  <view class="container">
    <slot name="triggers"></slot>

    <!-- 普通弹窗 -->
    <uni-popup ref="popup" background-color="#fff" @change="onPopupChange">
      <view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
        <text class="text">{{messageText}}</text>
      </view>
    </uni-popup>

    <!-- 提示信息弹窗 -->
    <uni-popup style="" ref="message" type="message">
     <uni-popup-message :type="msgType" :message="messageText" :duration="10000">
			</uni-popup-message>
    </uni-popup>

    <!-- 对话框弹窗 -->
    <uni-popup ref="alertDialog" type="dialog">
      <uni-popup-dialog
        :type="msgType"
        cancelText="关闭"
        confirmText="同意"
        title="通知"
        :content="messageText"
        @confirm="onDialogConfirm"
        @close="onDialogClose"
      ></uni-popup-dialog>
    </uni-popup>

    <!-- 输入框弹窗 -->
    <uni-popup ref="inputDialog" type="dialog">
      <uni-popup-dialog
        ref="inputClose"
        mode="input"
				v-model="inputValue"
        title="输入内容"
        placeholder="请输入内容"
        @confirm="onDialogInputConfirm"
      ></uni-popup-dialog>
    </uni-popup>

    <!-- 分享示例 -->
    <uni-popup ref="share" type="share" safeArea backgroundColor="#fff">
      <uni-popup-share></uni-popup-share>
    </uni-popup>
  </view>
</template>

<script>
export default {
  props: {
    defaultMessage: {
      type: String,
      default: '这是一条消息提示',
    },
  },
  data() {
    return {
      type: 'center',
      msgType: 'success',
      messageText: this.defaultMessage,
      inputValue: '',
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
			this.inputValue = msg
			this.$refs.inputDialog.open(); 
    },
    openShare() {
      this.$refs.share.open();
    },
    onPopupChange(e) {
      this.$emit('popupChange', e);
    },
    onDialogConfirm() {
      this.$emit('dialogConfirm');
    },
    onDialogClose() {
      this.$emit('dialogClose');
    },
    onDialogInputConfirm(value) {
      this.inputValue = value;
      this.$emit('dialogInputConfirm', value);
      this.$refs.inputDialog.close();
    },
  },
};
</script>

<style lang="scss">
/* 样式与之前类似 */
</style>