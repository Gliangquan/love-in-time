<template>
  <div class="container-index">
		<slideMenuVue class="slidemenu"></slideMenuVue>
	</div>
</template>

<script>
import slideMenuVue from '@/components/slideMenu/slideMenu.vue';
export default {
  components: {
    slideMenuVue,
  },
  name: "Home",
  setup() {
    return {
    };
  }
};
</script>

<style>
	.container-index {
		display: flex;
		justify-content: center; /* 水平居中 */
		align-items: center; /* 垂直居中 */
		height: 100vh;
		width: 100%;
		background-image: linear-gradient(135deg, rgb(252, 207, 232), rgb(204, 254, 255));
		/* background-image: -webkit-linear-gradient(135deg, rgb(252, 207, 232), rgb(204, 254, 255)); */
	}
	.slidemenu {
		width: 100%;
	}
</style>