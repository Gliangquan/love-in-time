<template>
	<view class="nav_main">
		<view v-for="(item,index) in data" :class="{'tool-box':true,'item':true,'item_act':current==index}"
			@click="change(index)">
			{{item.meal_name}}
		</view>
	</view>
</template>
 
<script setup>
	const emit = defineEmits(['change'])
	const props = defineProps({
		data: {
			type: Array,
			default: () => ([])
		},
		current: {
			type: Number,
			default: () => (0)
		},
	});
 
	function change(index) {
		emit('change', index) // 当前值 + 进步值
	}
</script>
 
<style scoped lang="scss">
	.nav_main {
		position: fixed;
	}
 
	.item {
		width: 164rpx;
		text-align: center;
		padding: 30rpx 0;
		font-size: 26rpx;
		color: #000000;
		font-weight: 400;
		position: relative;
 
 
	}
 
	.item_act {
		background-color: #fff;
		font-size: 26rpx;
		font-weight: 700;
 
		&::before {
			content: "";
			display: inline-block;
			width: 12rpx;
			height: 34rpx;
			background: #FC4E3E;
			border-radius: 0rpx 30rpx 30rpx 0rpx;
			position: absolute;
			left: 0;
		}
	}
</style>