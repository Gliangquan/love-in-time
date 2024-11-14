<template>
  <div class="menu-bar">
    <ul class="menu-list">
      <li
        class="menu-item"
        v-for="(item, index) in menuItems"
        :key="index"
        :class="{ active: item.selected }"
        @click="selectMenu(index)"
      >
        <img :src="item.selected ? item.icon_on : item.icon" alt="icon" class="menu-icon" />
        <span v-if="item.selected" class="menu-text">{{ item.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { reactive, watch } from 'vue';

export default {
  name: "btnTabBar",
  props: {
    selectedIndex: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const router = useRouter();

    // 使用 reactive 来创建响应式的 menuItems
    const menuItems = reactive([
      { icon: "../static/btnTabBarIcon/home_fill.png", icon_on: "../static/btnTabBarIcon/home_fill_on.png", text: "Home", selected: false, route: '/pages/index/index' },
      { icon: "../static/btnTabBarIcon/home_fill.png", icon_on: "../static/btnTabBarIcon/home_fill_on.png", text: "Home", selected: false, route: '/pages/page2/page2' },
      { icon: "../static/btnTabBarIcon/home_fill.png", icon_on: "../static/btnTabBarIcon/home_fill_on.png", text: "Home", selected: false, route: '/pages/page3/page3' },
      { icon: "../static/btnTabBarIcon/person_fill.png", icon_on: "../static/btnTabBarIcon/person_fill_on.png", text: "Me", selected: false, route: '/pages/mine/mine' }
    ]);

    // Watch props.selectedIndex to update the selected menu item
    watch(() => props.selectedIndex, (newIndex) => {
      menuItems.forEach((item, index) => {
        item.selected = index === newIndex;
      });
    }, { immediate: true });

    const selectMenu = (index) => {
			uni.redirectTo({ url: menuItems[index].route });
    };

    return {
      menuItems,
      selectMenu
    };
  }
};
</script>

<style>
.menu-bar {
  width: 600rpx;
  position: fixed;
  bottom: 50rpx;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ffffff;
  border-radius: 15px;
  padding: 10px 20px;
  box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.4);
  z-index: 1000;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0); 
}

.menu-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
}

.menu-item {
  cursor: pointer;
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.menu-item.active {
  background-color: transparent;
}

.menu-icon {
  width: 50rpx;
  height: 50rpx;
  margin-bottom: -5rpx;
}

.menu-text {
  font-size: 10px;
  color: #c4c4c4;
  text-decoration: none;
}

.menu-item.active .menu-text {
  color: #c4c4c4;
  text-decoration: none;
}

.menu-item:hover .menu-text {
  text-decoration: none;
}
</style>
