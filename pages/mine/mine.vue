<template>  
	<div class="container-mine">
		<view class="loverBox">
			<u-button @click="tologin()">点击登录</u-button>
			<u-button @click="getlogin()">当前登录用户信息</u-button>
			<view class="loverImg">
				<view class="loverOne">
					<u-avatar src="" shape="circle" class="avatar"></u-avatar>
					<view class="loverName">
						<text>{{ loverInfo.name_lover_a }}</text>
					</view>
				</view>
				<div class="heart">❤️</div>
				<view class="loverOne">
					<u-avatar src="" shape="circle" class="avatar"></u-avatar>
					<view class="loverName">
						<text>{{ loverInfo.name_lover_b }}</text>
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
	import request from '../../common/request';
	import { ref } from 'vue';
	
	export default {
		name: "mine",
		setup() {
			const loverInfo = ref({
					name_lover_a: 'BOY',
					name_lover_b: 'GIRL'
			});
			const tologin = () => {
					uni.navigateTo({
							url: '/pages/mine/login'
					});
			};
			const getlogin = async () =>{
				try{
					const response = await request.get('/lover/get/login');
					if (response.code === 0) {
						loverInfo.value.name_lover_a = response.data.loverName;
					}else{
						console.log("未登录！！");
					}
				}catch(e){
					uni.showToast({
						title: '请求失败，请稍后重试',
						duration: 1000
					});
				}
			}
			return {
					tologin,
					getlogin,
					loverInfo
			};
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