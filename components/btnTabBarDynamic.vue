<template>
  <div class="menu-bar">
    <ul class="menu-list">
      <!-- 动态背景指示器 selectedIndex * 100 -->
      <li class="indicator" :style="{ transform: `translateX(${selectedIndex * 100}%)` }"></li>

      <!-- 菜单项 -->
      <li
        v-for="(item, index) in menuItems"
        :key="index"
        :class="{ active: isActive(index) }"
        class="menu-item"
        @click="selectMenu(index)"
      >
        <div class="menu-content">
          <img :src="isActive(index) ? item.icon_on : item.icon" alt="icon" class="menu-icon" />
          <span v-if="isActive(index)" class="menu-text">{{ item.text }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, watch } from 'vue';

export default {
  name: "btnTabBarDynamic",
  props: {
    selectedIndex: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    const menuItems = [
      { icon: "../static/btnTabBarIcon/home_fill.png", icon_on: "../static/btnTabBarIcon/home_fill_on.png", text: "Home" },
      { icon: "../static/btnTabBarIcon/home_fill.png", icon_on: "../static/btnTabBarIcon/home_fill_on.png", text: "Other" },
      { icon: "../static/btnTabBarIcon/home_fill.png", icon_on: "../static/btnTabBarIcon/home_fill_on.png", text: "Menu" },
      { icon: "../static/btnTabBarIcon/person_fill.png", icon_on: "../static/btnTabBarIcon/person_fill_on.png", text: "Mine" }
    ];
    const isActive = (index) => props.selectedIndex === index;
    const selectMenu = (index) => {
      emit('menuSelect', index); 
    };
    return {
      menuItems,
      isActive,
      selectMenu
    };
  }
};
</script>

<style scoped>
.menu-bar {
  width: 80%;
  position: fixed;
  bottom: 50rpx;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 15px;
  padding: 10px 20px;
  box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.4);
  z-index: 1000;
  -webkit-tap-highlight-color: transparent;
  background: #ffffff;
	/* 毛玻璃 高斯模糊 */
	backdrop-filter: blur(10px) !important;
	background-color: rgb(255, 255, 255, 0.2) !important;
}

.menu-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  width: 100%;
}

.menu-item {
  cursor: pointer;
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.menu-content {
  display: flex;
  align-items: center;
  width: 80%;
  padding: 5px;
  border-radius: 20px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.menu-content.active-bg {
  background-color: rgba(213, 150, 223, 0.3);
}

.menu-icon {
  width: 50rpx;
  height: 50rpx;
  margin-right: 5rpx;
}

.menu-text {
  font-size: 10px;
  color: #4285f4;
}

/* 动态背景指示器 */
.indicator {
  position: absolute;
  left: 0;
  width: 25%;
  height: 100%;
  background-color: rgba(213, 150, 223, 0.3);
  border-radius: 20px;
	transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}
</style>