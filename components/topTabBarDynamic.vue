<template>
  <div class="menu-bar">
    <div v-if="showBackButton" class="back-button" @click="goBack">
      <img class="backicon" src="../static/topTabBarIcon/backicon.png" alt="icon" />
    </div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: "topTabBarDynamic",
	props: {
		title: {
			type: String,
			default: "Menu"
		},
		showBackButton: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		goBack() {
			// 使用 uni.navigateBack() 以支持 uniapp 的页面返回
			uni.navigateBack();
		}
	}
};
</script>

<style scoped>
.menu-bar {
  width: 90%;
  position: fixed;
  top: 50rpx;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 15px;
  padding: 10px 15px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
	
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); */
  /* background: #ffffff; */
}

.back-button {
  width: 30px;
  height: 30px;
	background-color: rgba(213, 150, 223, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  left: 10px; /* 将返回按钮固定在左侧 */
	-webkit-tap-highlight-color: transparent;
	
	box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.2);
}
.backicon{
	width: 100%;
	height: 100%;
}
.title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}
</style>