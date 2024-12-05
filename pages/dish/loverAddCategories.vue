<template>
  <view class="container-addShop">
    <!-- PopupWrapper -->
    <popup-wrapper
      ref="popupWrapper"
      :default-message="'默认提示消息'"
      @popupChange="onPopupChange"
      @dialogConfirm="onDialogConfirm"
      @dialogInputConfirm="onDialogInputConfirm"
    ></popup-wrapper>

    <topTabBarDynamicVue title="添加类别" showBackButton="true" />

    <view class="category-list">
      <!-- 分类项 -->
      <view class="category-item" v-for="(item, index) in categories" :key="item.id">
        <view class="item-content">
          <view class="item-title">{{ item.categoryName }}</view>
          <view class="item-actions">
            <!-- 左 -->
            <view class="item-left">
              <text class="icon">✎</text>
              <text class="edit" @click="openDialog(index)">编辑</text>
            </view>
            <!-- 中 -->
            <view class="item-center">
              <text class="move-up" @click="moveUp(index)">⬆ 上移</text>
              <text class="move-down" @click="moveDown(index)">⬇ 下移</text>
            </view>
            <!-- 右 -->
            <view class="item-right">
              <!-- 删除按钮，点击时会判断是否是第二次点击 -->
              <text
                :class="{'delete': true, 'delete-red': item.isDeleting}"
                @click="deleteCategory(index, item)"
              >
                🗑 删除
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 新增按钮 -->
    <view class="add-category" @click="openDialog(null)">
      <text>＋ 新增</text>
    </view>

    <!-- 确定按钮 -->
    <view class="confirm-button" @click="onConfirm">
      <text>确定</text>
    </view>
  </view>
</template>

<script>
import { ref, onMounted } from 'vue';
import PopupWrapper from '@/components/PopupManager/PopupManager.vue';
import topTabBarDynamicVue from "../../components/topTabBarDynamic.vue";
import request from '@/common/request.js';

export default {
  components: {
    topTabBarDynamicVue,
    PopupWrapper
  },
  setup() {
    // 初始化 categories 为和 categoriesList 一样的结构
    const categories = ref([]);

    const dialogValue = ref('');
    const currentIndex = ref(null);

    // 引用 popupWrapper 组件
    const popupWrapper = ref(null);
    // 打开弹窗
    const openDialog = (index) => {
      currentIndex.value = index;
      dialogValue.value = index !== null ? categories.value[index].categoryName : ''; 
      popupWrapper.value.openInputDialog(dialogValue.value); // 调用 PopupWrapper 的 openInputDialog 方法
    };
    // 输入对话框确认回调
    const onDialogInputConfirm = (value) => {
      if (currentIndex.value !== null) {
        categories.value[currentIndex.value].categoryName = value;
      } else {
        categories.value.push({
          categoryName: value,
          id: -1,
          isDeleting: false
        });
      }
    };
    // 删除分类，第一次点击变红，第二次点击才删除
    const deleteCategory = async (index, item) => {
      if (item.isDeleting) {
        categories.value.splice(index, 1);
				const response = await request.post('/lover-categories/delete',{
					id: item.id
				});
				if (response.code === 0) {
					popupWrapper.value?.openMessage('success',response.message);
					list.value = response.data;			
				}else{
					popupWrapper.value?.openMessage('error',response.message);
				}
				
      } else {
        item.isDeleting = true;
      }
    };
		
    // 上移分类
    const moveUp = (index) => {
      if (index > 0) {
        const temp = categories.value[index];
        categories.value[index] = categories.value[index - 1];
        categories.value[index - 1] = temp;
      }
    };
    // 下移分类
    const moveDown = (index) => {
      if (index < categories.value.length - 1) {
        const temp = categories.value[index];
        categories.value[index] = categories.value[index + 1];
        categories.value[index + 1] = temp;
      }
    };

    // 确定按钮点击事件
    const onConfirm = async() => {
			// console.log(categories.value);
			const response = await request.post('/lover-categories/add-list',
					categories.value
			);
			if (response.code === 0) {
				popupWrapper.value?.openMessage('success',response.message);
				
				try{
					uni.navigateBack();
				}catch(e){
					uni.redirectTo({
					    url: `/pages/pagetemplate/pagetemplate?id=${1}`,
					});
				}
				
			}else{
				popupWrapper.value?.openMessage('error',response.message);
			}
    };

    onMounted(async () => {
      const categoriesList = uni.getStorageSync('categoriesList');
      console.log(categoriesList);
      // 将 categoriesList 赋值给 categories，使用深拷贝确保不直接引用
      categories.value = JSON.parse(JSON.stringify(categoriesList)); // 深拷贝操作
    });

    return {
      categories,
      dialogValue,
      currentIndex,
      popupWrapper,
      openDialog,
      onDialogInputConfirm,
      deleteCategory,
      moveUp,
      moveDown,
      onConfirm
    };
  }
};
</script>

<style scoped>
.container-addShop {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx;
  padding-bottom: 152rpx;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 152rpx;
  width: 100%;
}

.category-item {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.item-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item-title {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.item-actions {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.item-left,
.item-center,
.item-right {
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-category {
  position: fixed;
  bottom: 120rpx; /* 调整为让“确定”按钮有足够空间 */
  left: 50%;
  transform: translateX(-50%);
  padding: 20rpx;
  border: 1px solid #f36;
  border-radius: 50rpx;
  text-align: center;
  color: #f36;
  font-size: 32rpx;
  width: 90%;
  background-color: #fff;
  box-shadow: 2rpx 2rpx 10rpx rgba(0, 0, 0, 0.2);
  z-index: 999;
}

.confirm-button {
  position: fixed;
  bottom: 20rpx;
  left: 50%;
  transform: translateX(-50%);
  padding: 20rpx;
  border: 1px solid #4caf50;
  border-radius: 50rpx;
  text-align: center;
  color: #4caf50;
  font-size: 32rpx;
  width: 90%;
  background-color: #fff;
	box-shadow: 2rpx 2rpx 10rpx rgba(0, 0, 0, 0.2);
  z-index: 999;
}

/* 红色删除按钮 */
.delete-red {
  color: red;
}
</style>