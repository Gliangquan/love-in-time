<template>
  <view>
		<!-- <topTabBarDynamicVue title="Title" :showBackButton='true' /> -->
		
    <indeVue v-if=" PageCur === '/pages/index/index' " />
    <page2Vue v-if=" PageCur === '/pages/page2/page2' " />
    <page3Vue v-if=" PageCur === '/pages/page3/page3' " />
    <mineVue v-if=" PageCur === '/pages/mine/mine' " />
		
    <btnTabBarDynamicVue :selectedIndex="selectedIndex" @menuSelect="handleMenuSelect" />
  </view>
</template>

<script>
import btnTabBarDynamicVue from '@/components/btnTabBarDynamic.vue';
import topTabBarDynamicVue from '../../components/topTabBarDynamic.vue';
import indeVue from '../index/index.vue';
import page2Vue from '../page2/page2.vue';
import page3Vue from '../page3/page3.vue';
import mineVue from '../mine/mine.vue';

const pages = [
	'/pages/index/index',
	'/pages/page2/page2',
	'/pages/page3/page3',
	'/pages/mine/mine',
];
			
export default {
  components: {
    btnTabBarDynamicVue,
		topTabBarDynamicVue,
		indeVue,
		page2Vue,
		page3Vue,
		mineVue,
  },
  data() {
    return {
      selectedIndex: 0, // 初始化选中项
      PageCur: '/pages/index/index', // 默认页面
    };
  },
	onLoad(options) {
		const id = Number(options.id); // 确保 id 是一个数字
		if (!isNaN(id) && id >= 0 && id < pages.length) {
			this.selectedIndex = id;
			this.PageCur = pages[id];
		} else {
			// 设置默认页面或其他处理逻辑
			this.selectedIndex = 0;
			this.PageCur = pages[0];
		}
	},
  methods: {
    handleMenuSelect(index) {
      this.PageCur = pages[index]
      this.selectedIndex = index
    },
  },
};
</script>

<style scoped lang="scss">
</style>