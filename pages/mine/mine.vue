<template>  
	<div class="container-mine">
		<view class="loverBox">
			<view class="loverImg">
				<view class="loverOne">
					<u-avatar src="" shape="circle" class="avatar"></u-avatar>
					<view class="loverName">
						<text>Name1</text>
					</view>
				</view>
				<div class="heart">❤️</div>
				<view class="loverOne">
					<u-avatar src="" shape="circle" class="avatar"></u-avatar>
					<view class="loverName">
						<text>Name2</text>
					</view>
				</view>			
			</view>
			
			<view class="loverInfo">
				<text>We've been eating together for:</text>
				<view class="countBox">
					<u-count-to :startVal="0" :endVal="30" font-size="52px"></u-count-to>
					<text class="days">days</text>
				</view>
			</view>
		</view>
	</div>
</template>

<script>
	export default {
		name: "mine",
		setup() {
			return {};
		}
	}
</script>

<style scoped>
	.container-mine {
		display: flex;
		justify-content: center;
		align-items: start;
		height: 100vh;
		background-image: -webkit-linear-gradient(135deg, rgb(252, 207, 232), rgb(204, 254, 255));
	}
	.loverBox {
		width: 100%;
		height: 300px;
		margin-top: 20%;
		border-radius: 15px;
		
		/* background-color: #c4c4c4; */
	}
	.loverImg {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 10px;
		margin-top: 5%;
		
		/* background-color: antiquewhite; */
	}
	.loverOne {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.avatar {
		width: 80px;
		height: 80px;
	}
	.heart {
		font-size: 24px;
		margin: 0 10px;
	}
	.loverName {
		margin-top: 5px;
		background-color: rgba(233, 110, 219, 1.0);
		border-radius: 10px;
		padding: 5px 10px;
		width: 100%;
		text-align: center; /* 文字居中 */
		color: white;
		font-size: 12px;
	}
	.loverInfo {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		margin-top: 5%;
		
		/* background-color: antiquewhite; */
	}

</style>