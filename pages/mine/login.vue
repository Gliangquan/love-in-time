<template>
	<div class="container-login">
		<topTabBarDynamicVue title="登录" :showBackButton="true" />
		<div class="login-box">
			<h1>登录</h1>
			<u-input v-model="loverAccount" placeholder="请输入账号或手机号" clearable></u-input>
			<u-input v-model="loverPassword" placeholder="请输入密码" type="password" clearable></u-input>
			<u-button type="primary" @click="handleLogin">登录</u-button>
		</div>
	</div>
</template>

<script>
import request from '@/common/request.js';
import topTabBarDynamicVue from '../../components/topTabBarDynamic.vue';
export default {
	name: "login",
	components: {
		topTabBarDynamicVue,
	},
	data() {
		return {
			loverAccount: "", // 可以是手机号或账号
			loverPassword: "", // 密码
		};
	},
	methods: {
		async handleLogin() {
			if (!this.loverAccount || !this.loverPassword) {
				uni.showToast({
					title: '请输入账号或密码',
					duration: 1000
				});
				return;
			}
			try {
				const response = await request.post('/lover/login', {
					loverAccount: this.loverAccount,
					loverPassword: this.loverPassword,
				});
				if (response.code === 0) {
					uni.showToast({
						title: '登录成功',
						duration: 1000,
					});
					// switchTab: tabBar页面
					// redirectTo: 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
					
					// const pageId = 3;
					// uni.redirectTo({
					// 	url: `/pages/pagetemplate/pagetemplate?id=${pageId}`,
					// });
				} else {
					uni.showToast({
						title: '登录失败',
						duration: 1000
					});
				}
			} catch (error) {
				uni.showToast({
					title: '请求失败，请稍后重试',
					duration: 1000
				});
			}
		},
	},
};
</script>

<style scoped>
.container-login {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background: linear-gradient(135deg, rgb(204, 254, 255), rgb(252, 207, 232));
}
.login-box {
	width: 320px;
	padding: 25px;
	border-radius: 15px;
	background-color: #ffffff;
	box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
	text-align: center;
}
h1 {
	color: #333;
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 25px;
}
u-input {
	margin-bottom: 20px;
	width: 100%;
}
u-button {
	width: 100%;
}
</style>