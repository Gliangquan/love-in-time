<template>
	<div class="carousel" 
         @touchstart="onTouchStart" 
         @touchmove="onTouchMove" 
         @touchend="onTouchEnd">
		<div v-for="(item, index) in items" 
			:key="index" 
			:class="['carousel-item', { active: currentIndex === index }]" 
			:style="itemStyle(index)">
			
			<div class="content">{{ item }}</div>
			
			<button class="carousel-button">按钮</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SimpleCarousel',
	data() {
		return {
			items: ['框1', '框2', '框3', '框4', '框5'],
			currentIndex: 2,
			startX: 0,
			offsetX: 0,
			maxOffset: 50, // 最大滑动距离
		};
	},
	methods: {
		onTouchStart(event) {
			this.startX = event.touches[0].pageX;
			this.offsetX = 0;
		},
		onTouchMove(event) {
			const moveX = event.touches[0].pageX;
			let deltaX = moveX - this.startX;

			// 限制滑动距离，避免滑动超出最大范围
			if (deltaX > this.maxOffset) {
				deltaX = this.maxOffset;
			} else if (deltaX < -this.maxOffset) {
				deltaX = -this.maxOffset;
			}

			this.offsetX = deltaX;
		},
		onTouchEnd(event) {
			const endX = event.changedTouches[0].pageX;
			const distance = endX - this.startX;

			// 判断滑动方向
			if (distance > 50) {
				this.slideRight();
			} else if (distance < -50) {
				this.slideLeft();
			}

			this.offsetX = 0;
		},
		slideLeft() {
			this.currentIndex = (this.currentIndex + 1) % this.items.length;
		},
		slideRight() {
			this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
		},
		itemStyle(index) {
			const position = (index - this.currentIndex + this.items.length) % this.items.length;
			let scale = 1; // 缩放
			let translateX = (position - 2) * 50; // 位移
			

			// 动态滑动比率
			const slideRatio = Math.min(Math.abs(this.offsetX) / this.maxOffset, 1);
			const direction = this.offsetX > 0 ? -1 : 1; // -1向右， +1向左

			if (position === 2) {
				scale = 1.2 - slideRatio * 0.4; // 中间框缩放比例
				translateX += this.offsetX / 2;  // 中间框的水平偏移
			} 
			else if ((position === 1 && direction === -1)) { // 向右 左边
				scale = 0.7 + slideRatio * 0.2;
				translateX = translateX * 1.1 + this.offsetX / 2;
			} 
			else if ((position === 3 && direction === -1)) { // 右边 向右
				scale = 0.7 - slideRatio * 0.2;
				translateX = translateX * 1.1 + this.offsetX / 2;
			} 
			else if (position === 1 && direction === 1) { // 向左 左边
				scale = 0.7 - slideRatio * 0.2;
				translateX = translateX * 1.1 + this.offsetX / 2;
			} 
			else if (position === 3 && direction === 1) { // 向左 右边
				scale = 0.7 + slideRatio * 0.2;
				translateX = translateX * 1.1 + this.offsetX / 2;
			}
			else {
				// scale = 0.8;
				// translateX = translateX * 1.2;
				scale = 0.7 - slideRatio * 0.5;
				translateX = translateX * 1.2 + this.offsetX / 2;
			}

			const opacity = position === 2 ? 1 - slideRatio * 0.1 : 0.4 + slideRatio * 0.4	; // 透明度

			return {
				transform: `translateX(${translateX}%) scale(${scale})`,
				opacity: opacity,
				zIndex: 5 - Math.abs(2 - position),
				transition: 'transform 0.3s ease, opacity 0.3s ease',
			};
		},
	},
};
</script>

<style scoped>
.carousel {
	width: 100%;
	height: 400px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	overflow: hidden;
}
.carousel-item {
	position: absolute;
	width: 65%;
	height: 70%;
	display: flex;
	top: 10%;
	justify-content: center;
	align-items: center;
	border-radius: 15px;
	background-color: #e0e0e0;
	box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.2);
	transition: transform 0.3s ease, opacity 0.3s ease;
}
.carousel-item.active .content {
	font-size: 1.5em;
	color: #333;
}
.content {
	font-size: 1em;
	color: #888;
}
.carousel-button {
	position: absolute;
	top: 100%;
	left: 50%;
	width: 65%;
	transform: translate(-50%, -50%);
	padding: 5px 10px;
	font-size: 0.9em;
	border: none;
	background-color: #f0d1fa;
	color: white;
	border-radius: 15px;
	box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.2);
	cursor: pointer;
}
</style>