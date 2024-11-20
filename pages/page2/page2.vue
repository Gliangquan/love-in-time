<template>
	<view class="container">
		
		<view style="border: 1px solid blue; margin-top: 20%;" class="search-view-page2">
			<u-search placeholder="" v-model="keyword"></u-search>
		</view>
		
		<view class="dish-list-page2">
			<scroll-view class="menu-page2" scroll-y>
			  <view 
			    v-for="(item, index) in categories" 
			    :key="index"
			    :class="['menu-page2-item', currentCategoryIndex === index ? 'active' : '']"
			    @click="switchCategory(index)">
			    {{ item.name }}
			  </view>
			</scroll-view>
			
			<scroll-view class="content" scroll-y>
				<view v-for="(product, index) in currentProducts" :key="index" class="product-item">
					<!-- 商品图片 -->
					<image :src="product.imgSrc" class="product-image" />
					
					<!-- 商品信息 -->
					<view class="product-info">
						<text class="product-name">{{ product.name }}</text>
						<text class="product-spec">规格：{{ product.spec }}</text>
						<view class="product-footer">
							<text class="product-price">￥{{ product.price }}</text>
							<u-button text="选规格" class="select-btn" shape="circle" size="mini" style="width: auto; margin-right: initial;" @click="selectProduct(product)" />
						</view>
					</view>
				</view>
			</scroll-view>
				
		</view>
     
  </view>
	 
</template>

<script>
	export default {
		data() {
			return {
				// 左侧分类
				categories: [
					{ name: '新品上市' },
					{ name: '招牌柠檬茶' },
					{ name: '鲜果柠檬茶' },
					{ name: '清爽柠檬茶' },
					{ name: '生椰系列' },
					{ name: '醇香奶茶' },
					{ name: '冰沙系列' },
					{ name: '热饮系列' },
					{ name: '新品上市' },
					{ name: '招牌柠檬茶' },
					{ name: '鲜果柠檬茶' },
					{ name: '清爽柠檬茶' },
					{ name: '生椰系列' },
					{ name: '醇香奶茶' },
					{ name: '冰沙系列' },
					{ name: '热饮系列' },
				],
				// 商品数据（可从后台拉取）
				products: [
					{ category: '招牌柠檬茶', name: '招牌暴打渣男柠檬茶', spec: '600ml', price: 18, imgSrc: 'https://picsum.photos/seed/picsum/200/300?a=1' },
					{ category: '招牌柠檬茶', name: '暴打凤梨鸭屎香柠檬茶', spec: '600ml', price: 18, imgSrc: 'https://picsum.photos/seed/picsum/200/300?b=2' },
					{ category: '招牌柠檬茶', name: '暴打凤梨冰柠茶', spec: '600ml', price: 16, imgSrc: 'https://picsum.photos/seed/picsum/200/300?c=3' },
					{ category: '鲜果柠檬茶', name: '橙多芬冰柠茶', spec: '600ml', price: 16, imgSrc: 'https://picsum.photos/seed/picsum/200/300?d=4' },
					{ category: '鲜果柠檬茶', name: '芒果柠檬茶', spec: '600ml', price: 15, imgSrc: 'https://picsum.photos/seed/picsum/200/300?e=5' },
				],
				// 当前选中的分类索引
				currentCategoryIndex: 0,
				// 搜索key
				keyword: '遥看瀑布挂前川'
			};
		},
		computed: {
			// 根据当前分类筛选商品
			currentProducts() {
				const currentCategory = this.categories[this.currentCategoryIndex].name;
				return this.products.filter(product => product.category === currentCategory);
			},
		},
		methods: {
			// 切换分类
			switchCategory(index) {
				this.currentCategoryIndex = index;
			},
			// 商品选择操作
			selectProduct(product) {
				console.log('选择商品：', product);
				// 跳转到详情页或处理逻辑
				uni.navigateTo({
					url: `/pages/productDetail/productDetail?name=${product.name}`,
				});
			},
		},
	};	
</script>

<style>
	.container {
	  display: flex;
	  height: 100vh;
	  flex-direction: column;
	  background-image: -webkit-linear-gradient(135deg, rgb(252, 207, 232), rgb(204, 254, 255));
	}
	
	.dish-list-page2 {
	  display: flex;
	  width: 100%;
	  height: 70%;
	  justify-content: center;
	  align-items: flex-start;
	  padding: 10rpx;
	}
	
	.menu-page2 {
	  width: 25%;
	  background-color: #f8fafb;
	  text-align: center;
	  border-radius: 15px;
	  overflow-y: auto; /* 当内容超出时滚动 */
	  max-height: 100%; /* 保持滚动区域内的内容完整 */
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
	  background-color: #ffffff;
	  border-radius: 15px;
	  overflow-y: auto; /* 当内容超出时滚动 */
	  padding: 20rpx;
	  max-height: 100%; /* 保持滚动区域内的内容完整 */
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
	  background-color: #7ed321;
	  color: #fff;
	  font-size: 26rpx;
	  padding: 10rpx 20rpx;
	  border-radius: 20rpx;
	}
	
	/* 优化滚动区域样式 */
	.menu-page2,
	.content {
	  max-height: calc(100% - 20rpx); /* 避免内容溢出区域 */
	  overflow-y: auto; /* 超出时滚动 */
	}

</style>
