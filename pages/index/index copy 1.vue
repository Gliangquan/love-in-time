<template>
  <view>
    <!-- 子组件 PopupWrapper -->
    <popup-wrapper
      ref="popupWrapper"
      :default-message="'默认提示消息'"
      @popupChange="onPopupChange"
      @dialogConfirm="onDialogConfirm"
      @dialogInputConfirm="onDialogInputConfirm"
    ></popup-wrapper>
    
    <!-- 操作按钮 -->
    <view class="example-body box">
      <button class="button" type="primary" @click="openPopup('top')">顶部</button>
      <button class="button" type="primary" @click="openPopup('center')">居中</button>
      <button class="button popup-success" @click="openMessage('success')">成功提示</button>
      <button class="button popup-error" @click="openMessage('error')">失败提示</button>
      <button class="button" type="primary" @click="openInputDialog">输入框</button>
      <button class="button" type="primary" @click="openShare">分享</button>
      <button class="button" type="primary" @click="openDialog">对话框弹窗</button>
    </view>
  </view>
</template>

<script>
import { ref } from 'vue'; // 引入 Vue 的 ref 函数
import PopupWrapper from '@/components/PopupManager/PopupManager.vue'; // 子组件

export default {
  components: {
    PopupWrapper,
  },
  setup() {
    const popupWrapper = ref(null);
    // 方法：打开弹窗
    const openPopup = (type) => {
      if (popupWrapper.value) {
        popupWrapper.value.openPopup(type);
      } else {
        console.error('PopupWrapper 尚未挂载');
      }
    };
    // 方法：显示消息
    const openMessage = (type) => {
      if (popupWrapper.value) {
        popupWrapper.value.openMessage(type, "");
      }
    };
    // 方法：打开输入对话框
    const openInputDialog = () => {
      if (popupWrapper.value) {
        popupWrapper.value.openInputDialog();
      }
    };
		// 方法：对话框弹窗
		const openDialog = (type, msg) => {
			if (popupWrapper.value) {
			  popupWrapper.value.openDialog(type, msg);
			}
		}
    // 方法：打开分享弹窗
    const openShare = () => {
      if (popupWrapper.value) {
        popupWrapper.value.openShare();
      }
    };
		
    // 弹窗状态变更回调
    const onPopupChange = (e) => {
      console.log('Popup 状态改变:', e);
    };
    // 对话框确认回调
    const onDialogConfirm = () => {
      console.log('对话框确认');
    };
    // 输入对话框确认回调
    const onDialogInputConfirm = (value) => {
      console.log('输入框确认值:', value);
    };
    return {
      popupWrapper,
      openPopup,
      openMessage,
      openInputDialog,
      openShare,
			openDialog,
      onPopupChange,
      onDialogConfirm,
      onDialogInputConfirm,
    };
  },
};
</script>
