<template>
  <div class="container">
		page2
	</div>
</template>

<script>
	import { ref } from 'vue';
	
	export default {
		name: "page2",
		components: {
		},
		setup() {
			return {
			};
		}
	}
</script>

<style>
	.container {
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		height: 100vh;
		background-image: -webkit-linear-gradient(135deg, rgb(252, 207, 232), rgb(204, 254, 255));
	}

</style>
