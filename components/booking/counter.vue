<template>
 
	<view class="counter">
		<u-icon v-if="number>0" :name="reduceIcon" size="60" color="#8E8E8E" @click="reduceClick"></u-icon>
		<input v-if="number>0" type="number" :value="number" @blur="inputBlurEvent" @input="inputChangeEvent"
			:disabled="disabled">
		<view v-if="id" class="plus" :id="id" @click="addClick">
			<u-icon :name="plusIcon" size="32" color="#ffffff" :customStyle="iconStyle"></u-icon>
		</view>
	</view>
</template>
 
<script setup>
	import {
		ref,
		reactive,
		computed,
		nextTick
	} from "vue";
	const props = defineProps({
		id: {
			type: String,
			default: ""
		},
		disabled: {
			type: Number,
			default: false
		},
		number: {
			type: Number,
			default: 0
		},
		maxNumber: {
			type: Number,
			default: 99999
		},
		minNumber: {
			type: Number,
			default: 0
		},
		progressValue: {
			type: Number,
			default: 1
		},
		reduceIcon: {
			type: String,
			default: "minus-circle"
		},
		plusIcon: {
			type: String,
			default: "plus"
		}
	})
	const temp = computed(() => {
		return props.number
	})
	const iconStyle = reactive({
		fontWeight: 'blod'
	})
	const emit = defineEmits(['change-click'])
	// 加
	function addClick(ev) {
		emit('change-click', props.number + props.progressValue) // 当前值 + 进步值
	}
	// 减
	function reduceClick() {
		if (props.number <= props.minNumber) {
			console.log("不能继续减少啦 ~");
			return;
		}
		if ((props.number - props.progressValue) < props.minNumber) {
			console.log("不能继续减少");
			return;
		}
		// 3、执行 减操作
		emit('change-click', props.number - props.progressValue)
	}
 
	function inputBlurEvent(e) {
		let number = parseInt(e.detail.value)
		if (isNaN(number) || number === 0) {
			emit('change-click', 0)
			return;
		}
 
 
		// 条件：输入数不为进步值的倍数，则往前取成倍数值
		let multipie = Math.ceil(number / props.progressValue) // 获取倍数
		number = multipie * props.progressValue // 向上获取最近的倍数
		if (number > props.maxNumber) {
			number = props.maxNumber
			emit('change-click', number)
		} else if (number <= props.minNumber) {
			emit('change-click', props.minNumber)
		} else {
			emit('change-click', number)
		}
	}
 
	function inputChangeEvent(e) {
		// 限制输入在最大与最小值之间
		// 注意：因为都是赋值最大或最小值，所以会出现值复用无法重新渲染页面的情况（第一次能重新渲染，之后的都不渲染）：已解决
		let number = parseInt(e.detail.value)
		if (isNaN(number) || number === 0) {
			// 为空为0
			return
		}
		if (number > props.maxNumber) {
			emit('change-click', props.maxNumber)
		} else if (number <= props.minNumber) {
			emit('change-click', props.minNumber)
		} else {
			emit('change-click', number)
		}
	}
</script>
 
<style lang="scss" scoped>
	.counter {
		display: flex;
		align-items: center;
 
		&>input {
			width: 2em;
			font-size: 28rpx;
			font-family: Source Han Sans CN-Bold, Source Han Sans CN;
			font-weight: bold;
			color: #000000;
			flex: 1;
			text-align: center;
		}
 
		.plus {
			margin: 8rpx;
			width: 48rpx;
			height: 48rpx;
			border-radius: 50%;
			background: #FF3232;
 
			display: flex;
			justify-content: center;
			align-items: center;
 
			&>image {
				width: 32rpx;
				height: 30rpx;
				margin-right: 5rpx;
			}
		}
	}
</style>