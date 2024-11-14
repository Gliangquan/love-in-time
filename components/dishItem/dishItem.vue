<template>
    <view class="loverDishItem">
        <u-image :src="imgSrc" shape="square" width="152px" height="152px" radius="10px"
					style=" align-self: center">
            <view slot="error">图片加载失败</view>
        </u-image>
        <view class="dish-info">
            <u-text :text="dishName" :lines="1" size="18px"></u-text>
            <u-text :text="dishHub" :lines="1" size="12px"></u-text>
        </view>
        <view class="price-container">
            <u-text mode="price" :text="price" class="current-price" color="#ff4c4c"></u-text>
        </view>
    </view>
</template>

<script>
    export default {
        name: "dishItem",
        props: {
            imgSrc: {
                type: String,
                required: true
            },
            dishName: {
                type: String,
                required: true
            },
            dishHub: {
                type: String,
                required: true
            },
            price: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>
   .loverDishItem {
        max-width: 180px;
				max-height: 100%;
        background-color: #f5f5f5;
        border-radius: 10px;
        box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
				margin-bottom: 10px;
				padding: 5upx;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

   .price-container {
        margin-top: 8px;
    }
</style>