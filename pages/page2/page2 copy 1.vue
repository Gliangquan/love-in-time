<template>
  <view class="container-page2">
		<scroll-view class="scroll-view-page2" scroll-y="true">
			<swiper class="swiper-box" @change="change" :current="swiperDotIndex">
				<swiper-item v-for="(item, index) in 3" :key="index">
					<view class="swiper-item" :class="'swiper-item' + index">
						<image 
							class="image" 
							src="https://img.js.design/assets/img/66b48af16f38077bbb6fc891.png#9fe61a693049c3aa850128b76044780c" 
							mode="aspectFill"
						/>
					</view>
				</swiper-item>
			</swiper>
			
			<!-- 图片下方的文字和评分 -->
			<view class="text-container">
				<u-text text="干锅虾" :lines="1" size="28px"></u-text>
				<u-divider text="" style="width: 100%; margin: 10px 0;"></u-divider>
				<u-rate :count="count" v-model="value"></u-rate>
			</view>
			
			<u-divider text="" style="width: 100%; margin: 10px 0;"></u-divider>
			
			<!-- 菜单栏 -->
			<view class="dish-info-page2">
				<view class="tagbar">
					<ul class="dish-menu-list">
						<!-- 指示滑块 -->
					 <li
							 class="indicator-page2"
							 style="z-index: 1"
							 :style="selectedIndex === 0 ? { transform: 'translateX(-100%)' } : { transform: 'translateX(100%)' }"
					 ></li>
						<!-- 菜单项  这里的z-index比indicator-page2的高就行-->
						<li style="z-index: 2" v-for="(item, index) in menuItems" :key="index" :class="{ active: selectedIndex === index }" @click="selectMenu(index)">
							<div class="menu-content">
								<span class="menu-text">{{ item }}</span>
							</div>
						</li>
					</ul>
				</view>
				
				<u-divider text="" style="width: 100%; margin: 10px 0;"></u-divider>

				<!-- 显示不同内容 -->
				<view class="page-content">
					<view v-if="selectedIndex === 0">
						<u--text :lines="showLineNum" text="关于uView的取名来由，
						首字母u来自于uni-app首字母，uni-app是基Vuejs，Vue和View(延伸为UI、视图之意)
						同音，同时view组件uni-app中最础最重要的组件，故取名uView，表达源于uni-app和Vue之意，同时在此也对它示感谢。"></u--text>
						<u--text :text="clickMoreText" color="#A289F8" @click="clickMoreBtn"></u--text>
					</view>
					<view v-else-if="selectedIndex === 1">
						<p>菜单项2内容</p>
					</view>
				</view>

			
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
  data() {
    return {
      count: 5,
      value: 4,
      selectedIndex: 0, // 用于跟踪当前选中的菜单索引
			clickMoreText: "More...",
			showLineNum: 1,
      menuItems: ['详情', '评论'],
			numBoxValue: 1
    };
  },
  methods: {
    change(e) {
      this.swiperDotIndex = e.detail.current;
    },
    selectMenu(index) {
      this.selectedIndex = index;
    },
		clickMoreBtn(){
			this.showLineNum = this.showLineNum === 1 ? 100 : 1 ;
			this.clickMoreText = this.clickMoreText === "More..." ? "Less..." : "More..." 
		}
  }
};
</script>

<style lang="scss">
.container-page2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
	
  background-image: linear-gradient(135deg, rgb(252, 207, 232), rgb(204, 254, 255));
}

.scroll-view-page2{
	width: 100%;
	height: 100vh;
	
	// background-color: #c4c4c4;
}

.swiper-box {
  width: 100%;
  height: 30%;
  margin-top: 20%;
	
  // background-color: #c4c4c4;
}

.swiper-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-container {
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-top: 10rpx;
  padding-left: 52rpx;
  text-align: center;
  flex-direction: column;
	
  // background-color: #c4c4c4;
}

.dish-info-page2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
	
  // background-color: #c4c4c4;
}

.tagbar {
  width: 80%;
  border-radius: 15px;
  padding: 10px 20px;
  position: relative;
	
	// background: #ffffff;
}

.dish-menu-list {
	list-style: none;
	padding-left: 0px;
  display: flex;
  justify-content: space-around;
  position: relative;
}

.menu-content {
  padding: 10px;
}

.menu-text {
  font-size: 16px;
  color: #c4c4c4;
}

.indicator-page2 {
	list-style: none;
  position: absolute;
  bottom: 0;
	width: 25%;
	height: 100%;  
	border-radius: 20px;
	background-color: rgba(137, 106, 245, 1);
  transition: transform 0.3s ease;
}

.page-content {
	width: 95%;
  margin-top: 20px;
  font-size: 16px;
	padding-left: 52rpx;
	padding-right: 52rpx;
	
  color: #c4c4c4;
}

/* 选中状态样式 */
.active .menu-text {
  font-weight: bold;
  color: #ffffff;
}
</style>