<template>
  <view class="container-page2">
    <!-- 搜索区域 -->
    <view class="search-area">
      <view style="padding-top: 52rpx;" class="search-view-page2">
        <u-search placeholder="" v-model="keyword"></u-search>
      </view>
    </view>
		<view class="main-content-area">
			<scroll-view class="menu-page2" scroll-y>
				<view
					v-for="(item, index) in list.value"
					:key="index"
					:class="['menu-page2-item', currentCategoryIndex === index? 'active' : '']"
					@click="switchCategory(index)"
					>
					{{ item.categoryName }}
				</view>
			</scroll-view>
			
			<scroll-view :scroll-into-view="toView" scroll-with-animation="true" class="content" @scroll="scroll" scroll-y>
				<view v-for="(category, index) in list.value" :key="index">
					<view :id="'title' + index">
						{{category.categoryName}}
					</view>
					
					<view v-for="(item, seq) in category.dishes" :key="seq" class="product-item" @click="to_dish_info(item.id)">
						<image :src="item.imageUrl" class="product-image" />
						<view class="product-info">	
							<text class="product-name">{{ item.dishName }}</text>
							<text class="product-spec">规格：{{ item.spec }}</text>
							<view class="product-footer">
								<text class="product-price">￥{{ item.dishPrice }}</text>
								<u-button text="选规格" class="select-btn" shape="circle" size="mini" style="width: auto; margin-right: initial;" @click="selectProduct(product)" />
							</view>
						</view>
					</view>
					
				</view>
			</scroll-view> 
			
		</view>

    <!-- 按钮区域 -->
    <view class="button-area">
      <view style="padding-bottom: 152rpx;">
        <view class="button-container">
          <u-button style="background-color: #ffffff3b;" @click="toAddCategories()" color="red" type="primary" plain="true" text="分类管理" class="category-button" shape="circle"></u-button>
          <u-button @click="toAddDish()" color="rgba(213, 51, 186, 0.4)" type="primary" text="添加菜谱" class="recipe-button" shape="circle"></u-button>
        </view>
      </view>
    </view>
		
		<view>
		  <popup-wrapper
		    ref="popupWrapper"
		  ></popup-wrapper>
		</view>
		
  </view>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import request from '@/common/request.js';
import PopupWrapper from '@/components/PopupManager/PopupManager.vue';
import store from '../../utils/store.js';

export default {
	components: {
		PopupWrapper
	},
  setup() {
		// 定义引用 PopupWrapper 实例
		const popupWrapper = ref(null);
		
		const list = reactive([]);
		const toView = ref();
		const titlePositions = ref([]);
    // 当前选中的分类索引
    const currentCategoryIndex = ref(0);
    // 搜索key
    const keyword = ref('搜索');

    // 根据当前分类筛选商品
    const currentProducts = computed(() => {
      const currentCategory = list[currentCategoryIndex.value].categoryName;
      return list.filter(item => item.categoryName === currentCategory);
    });
    // 切换分类
    const switchCategory = (index) => {
			toView.value = "title" + index;
      currentCategoryIndex.value = index;
    };
    const selectProduct = (product) => {
      console.log('选择商品：', product);
      // 跳转到详情页或处理逻辑
      uni.navigateTo({
        url: `/pages/productDetail/productDetail?name=${product.name}`,
      });
    };
		const toAddDish = () => {
			if (!list.value){
				uni.navigateTo({
						url: '/pages/mine/login'
				});
				return;
			};
			// 通过解构直接删除 `dishes`  `categoryOrder` 属性
			const toList = list.value.map(({ dishes,categoryOrder, ...rest }) => rest); 
			uni.setStorageSync('categoriesList', toList);
			uni.navigateTo({
				url: '/pages/dish/loverAddDish'
			});
		};
		const toAddCategories = () => {
			if (!list.value){
				uni.navigateTo({
						url: '/pages/mine/login'
				});
				return;
			};
			// 通过解构直接删除 `dishes`  `categoryOrder` 属性
			const toList = list.value.map(({ dishes,categoryOrder, ...rest }) => rest); 
			uni.setStorageSync('categoriesList', toList);
			uni.navigateTo({
					url: '/pages/dish/loverAddCategories'
			});
		};
		const scroll = (e) => {
			const scrollTop = e.detail.scrollTop+152; // 获取当前滚动位置
			for (let i = 0; i < titlePositions.value.length; i++) {
				if (
					scrollTop >= titlePositions.value[i] &&
					(i === titlePositions.value.length - 1 || scrollTop < titlePositions.value[i + 1])
				) {
					if (currentCategoryIndex.value !== i) {
						currentCategoryIndex.value = i;
					}
					break;
				}
			}
		};
		
    onMounted(async () => {
			try {
				const response = await request.get('/lover-categories/list-dish/vo');
				if (response.code === 0) {
					response.data.sort((a, b) => {
							return a.categoryOrder - b.categoryOrder;
					});
					list.value = response.data;
				}else{
					popupWrapper.value?.openMessage('error',response.message);
				}
			} catch (error) {
				console.log('数据请求失败', error);
				popupWrapper.value?.openMessage('error','数据请求失败');
			};
			
			setTimeout(() => {
			  const query = uni.createSelectorQuery().in(this);
			  list.value?.forEach((item, index) => {
					console.log(item);
			    query.select(`#title${index}`).boundingClientRect();
			  });
			  query.exec(res => {
			    console.log("节点信息：", res); // 打印节点信息调试
			    titlePositions.value = res.map(item => (item ? item.top : 0)); 
			  });
			}, 100);
    });
		
		
		const to_dish_info = async (dishid) => {
			console.log(dishid);
			
			try {
				const response = await request.post('/lover-dish/get',{
					"id": dishid
				});
				if (response.code === 0) {
					store.commit('setSelectedDish', response.data);
					uni.navigateTo({
							url: '/pages/dish/dishdetails'
					});
				}else{
					popupWrapper.value?.openMessage('error',response.message);
				}
			} catch (error) {
				console.log('数据请求失败', error);
				popupWrapper.value?.openMessage('error','数据请求失败');
			};
			
		};
		
    return {
      currentCategoryIndex,
      keyword,
      currentProducts,
      switchCategory,
      selectProduct,
			toAddDish,
			toAddCategories,
			list,
			toView,
			scroll,
			popupWrapper,
			to_dish_info
    };
  }
};
</script>

<style>
	/* 整体容器样式 */
.container-page2 {
  display: flex;
  height: 100vh;
  flex-direction: column;
  background-image: -webkit-linear-gradient(135deg, rgb(252, 207, 232), rgb(204, 254, 255));
}

.search-area {
  flex: 0 0 auto;
}

/* 主要内容区域样式 */
.main-content-area {
  flex: 1; /* 自适应填充剩余空间 */
  display: flex;
  flex-direction: column;
	flex-direction: row;
  overflow: hidden; /* 防止内部元素溢出容器 */
	padding: 15rpx;
	padding-bottom: 25rpx;
}

.dish-list-page2 {
  display: flex;
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  padding: 10rpx;
}

.menu-page2 {
  width: 25%;
  /* background-color: #f8fafb; */
  text-align: center;
  border-radius: 15px;
  overflow-y: auto; /* 当内容超出时滚动 */
  /* max-height: 100%; */
}

.menu-page2-item {
  padding: 20rpx;
  font-size: 28rpx;
  color: #666;
}

.menu-page2-item.active {
  font-weight: bold;
  color: #27a4b0; /* 激活状态的颜色 */
}

.content {
  flex: 1;
  margin-left: 5rpx;
  background-color: #ffffff75;
  border-radius: 15px;
  overflow-y: auto;
  padding: 20rpx;
}

.product-item {
  display: flex;
  padding: 20rpx;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
}

.product-image {
  width: 150rpx;
  height: 150rpx;
  border-radius: 8rpx;
  margin-right: 20rpx;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 28rpx;
  color: #333;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.product-spec {
  font-size: 24rpx;
  color: #888;
  margin-bottom: 12rpx;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: 30rpx;
  color: #27a4b0;
  font-weight: bold;
}

.select-btn {
  /* background-color: #7ed321; */
  color: #fff;
  font-size: 26rpx;
  padding: 10rpx 20rpx;
  border-radius: 20rpx;
}

/* 一左一右 */
.menu-page2,
.content {
  overflow-y: auto;
	background-color: #ffffff75;
	box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.2);
}

.button-area {
  flex: 0 0 auto; 
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15rpx;
}

.category-button {
  margin-right: 10px;
	box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.2);
}

.recipe-button {
  margin-left: 10px;
	box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.2);
}

</style>
