<template>
	<view class="card_body">
		<view class="image">
 
		</view>
		<view class="foods_info">
			<view>{{data.name}}</view>
			<view></view>
			<view>
				<view class="">
					￥{{data.price}}
				</view>
				<counter v-if="isAdd" :id="'id_' + data.id" :number="data.number ?? 0" @change-click="change"></counter>
			</view>
		</view>
	</view>
</template>
 
<script setup>
	import counter from "@/components/booking/counter.vue"
	const emit = defineEmits(['change'])
 
	const props = defineProps({
		data: {
			type: Object,
			default: () => ({})
		},
		isAdd: {
			type: Boolean,
			default: () => true
		}
	});
 
	function change(e) {
		let obj = props.data
		obj.number = e
		console.log(obj);
		emit('change', obj)
	}
</script>
 
<style scoped lang="scss">
	.card_body {
		display: flex;
		margin: 30rpx 20rpx;
 
		.image {
			width: 180rpx;
			height: 180rpx;
			background-color: #a1a1a1;
			border-radius: 10rpx;
			margin-right: 20rpx;
		}
 
		.foods_info {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			flex: 1;
 
			&>view:nth-child(1) {
				font-weight: 700;
				font-size: 28rpx;
				color: #000000;
			}
 
			&>view:nth-child(3) {
				display: flex;
				align-items: center;
				font-weight: 400;
				font-size: 32rpx;
				color: #000000;
				justify-content: space-between;
			}
		}
	}
</style>