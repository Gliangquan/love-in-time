<template>
  <view class="container-page2">
    <topTabBarDynamicVue :title="dishitem.dishName" :showBackButton="true" />

    <scroll-view class="scroll-view-page2" scroll-y="true">
      <swiper class="swiper-box" @change="change" :current="swiperDotIndex">
        <swiper-item v-for="(item, index) in 4" :key="index">
          <view class="swiper-item" :class="'swiper-item' + index">
            <image 
              class="image" 
              :src="dishitem.imgSrc[index]"
              mode="aspectFill"
            />
          </view>
        </swiper-item>
      </swiper>

      <!-- 图片下方的文字和评分 -->
      <view class="text-container">
        <u-text :text="dishitem.dishName" :lines="1" size="28px"></u-text>
        <u-divider text="" style="width: 100%; margin: 10px 0;"></u-divider>
      </view>
			<view class="text-container-2">
				<u-rate :count="count" v-model="value"></u-rate>
				<u-text :text="'$ ' + dishitem.dishPrice" :lines="1" size="28px" style="justify-content: flex-end; padding-right: 52rpx;"></u-text>
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
            <!-- 菜单项 -->
            <li 
              style="z-index: 2" 
              v-for="(item, index) in menuItems" 
              :key="index" 
              :class="{ active: selectedIndex === index }" 
              @click="selectMenu(index)">
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
            <u--text :lines="showLineNum" :text="dishitem.description"></u--text>
            <u--text :text="clickMoreText" color="#A289F8" @click="clickMoreBtn"></u--text>
          </view>
          <view v-else-if="selectedIndex === 1">
            <p>菜单项2内容</p>
          </view>
        </view>

        <!-- 选择数量和价格展示 -->
        <view v-if="selectedIndex === 0" style="width: 100%; display: flex; justify-content: space-between;">
          <view style="padding-left: 52rpx;">
            <u--text text="Quantity" color="#090F24" size="26px"></u--text>
          </view>
          <view style="padding-right: 52rpx;">
            <numberBox @update:value="handleValueUpdate" />
          </view>
        </view>

        <view class="btn-price-view">
          <view style="flex: 1; color: #A3A3A3; font-size: 14px;">
            <p style="margin: 0;">Price</p>
            <p style="margin: 0; font-size: 24px; font-weight: bold; color: #090F24;">${{ totlePrice}}</p>
          </view>
          <view style="display: flex; gap: 10px;">
            <button class="btn-shopping">
              <img class="shopping-backicon" src="../../static/vector.png" alt="icon" />
            </button>
            <button class="btn-buy">
              Buy Now
            </button>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { reactive, ref, computed, onMounted } from 'vue'; // 引入 reactive, ref, computed, onMounted
import numberBox from '@/components/numberBox/numberBox.vue';
import topTabBarDynamicVue from '../../components/topTabBarDynamic.vue';
import store from '../../utils/store.js';
import request from '@/common/request.js';

export default {
  components: {
    numberBox,
    topTabBarDynamicVue,
  },
  setup() {
    const dishitem = ref({
      imgSrc: [
        "https://img.js.design/assets/img/66b48af16f38077bbb6fc891.png#9fe61a693049c3aa850128b76044780c",
        "https://img.js.design/assets/img/66b48af16f38077bbb6fc891.png#9fe61a693049c3aa850128b76044780c",
        "https://img.js.design/assets/img/66b48af16f38077bbb6fc891.png#9fe61a693049c3aa850128b76044780c",
      ]
    });

    const showLineNum = ref(1);
    const clickMoreText = ref("More...");

    const clickMoreBtn = () => {
      showLineNum.value = showLineNum.value === 1 ? 100 : 1;
      clickMoreText.value = clickMoreText.value === "More..." ? "Less..." : "More...";
    };

    const menuItems = ['详情', '评价']; // 菜单项

    const selectedIndex = ref(0);

    const count = ref(10);
    const value = ref(6);
		
		const dish_count = ref(0)
		
    const selectMenu = (index) => {
      selectedIndex.value = index;
    };
		
		const totlePrice = ref(0);
		
		const handleValueUpdate = (num)=>{
			totlePrice.value = num * dishitem.value.dishPrice;
		}

		onMounted(async () => {
			const dish = store.state.selectedDish;
			console.log(dish);
			if (dish) {
				dishitem.value.dishName = dish.dishName || "菜品名称";
				dishitem.value.dishPrice = dish.dishPrice || 0;
				dishitem.value.description = dish.dishDescription || "暂无描述";
			}
		});
		


    return {
      dishitem,
      count,
      value,
			dish_count,
      totlePrice,
      showLineNum,
      clickMoreText,
      clickMoreBtn,
      menuItems,
      selectedIndex,
      selectMenu,
			handleValueUpdate
    };
  },
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
.text-container-2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: 52rpx;
  box-sizing: border-box; /* 确保padding不会超出容器 */
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

/* 底部价格框 */
.btn-price-view{
	display: flex;
	align-items: center; 
	padding: 10px; 
  border-radius: 15px;
	width: 320px;
	position: fixed;
	bottom: 50rpx;
	background: #ffffff;
	/* 毛玻璃 高斯模糊 */
	backdrop-filter: blur(10px) !important;
	background-color: rgb(255, 255, 255, 0.2) !important;
}
.btn-shopping{
	 background-color: #7F67F8; 
	 border: none; 
	 padding: 10px 20px; 
	 border-radius: 12px; 
	 color: #FFFFFF; 
	 font-size: 16px; 
	 cursor: pointer;
	 
	 display: flex;
	 flex-wrap: wrap;
	 justify-content: center;
	 align-content: center;
}
.shopping-backicon{
	width: 50rpx;
	height: 50rpx;
}
.btn-buy{
	// background-color: #E0E0E0; 
	background-color: #7F67F8; 
	border: none; 
	padding: 10px 20px; 
	border-radius: 12px; 
	color: #f4f6f9; 
	font-size: 16px; 
	cursor: not-allowed;
}
</style>