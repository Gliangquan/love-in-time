<template>
  <view class="container">
    <topTabBarDynamicVue title="添加菜品" showBackButton="true" />
    <view style="margin-top: 152rpx;">
      <uni-forms ref="recipeForm" :modelValue="recipeFormData" :rules="recipeRules">
        <view class="example-body custom-image-box spec-item">
          <uni-file-picker
            limit="1"
            del-icon="true"
            disable-preview
            file-mediatype="image"
          >
            图片，必填项
          </uni-file-picker>
        </view>

        <!-- 菜品基础信息 -->
        <uni-forms-item label="名称" required name="name">
          <uni-easyinput v-model="recipeFormData.name" placeholder="请输入名称" />
        </uni-forms-item>
        <uni-forms-item label="分类" required name="category">
          <uni-data-select
            v-model="recipeFormData.category"
            :localdata="range"
            label="应用选择"
          ></uni-data-select>
        </uni-forms-item>
        <uni-forms-item label="描述">
          <uni-easyinput
            type="textarea"
            v-model="recipeFormData.description"
            placeholder="描述"
          />
        </uni-forms-item>
        <uni-forms-item label="价格">
          <uni-easyinput v-model="recipeFormData.price" type="number" placeholder="0" />
        </uni-forms-item>

        <!-- 规格 -->
        <view class="spec-container">
          <view
            v-for="(spec, specIndex) in recipeFormData.specifications"
            :key="specIndex"
            class="spec-item"
          >
            <view class="spec-header">
              <uni-easyinput
                v-model="spec.name"
                placeholder="规格名称（例如：口味）"
                class="spec-input"
              />
              <view class="actions">
                <text @click="addOption(specIndex)" class="add-option">+ 添加</text>
                <text @click="delSpec(specIndex)" class="delete-spec">删除</text>
              </view>
            </view>
            <view v-for="(option, optIndex) in spec.options" :key="optIndex" class="spec-option">
              <uni-easyinput
                v-model="option.name"
                placeholder="选项名称（例如：微辣）"
                class="option-input"
              />
              <uni-easyinput
                v-model="option.price"
                type="number"
                placeholder="规格单价(默认0)"
                class="option-input"
              />
              <text @click="delOption(specIndex, optIndex)" class="delete-option">删除</text>
            </view>
          </view>
          <view class="add-spec" @click="addSpec">+ 添加规格</view>
        </view>

        <!-- 用料 -->
        <view class="ingredients-container spec-item">
          <view
            v-for="(ingredient, index) in recipeFormData.ingredients"
            :key="index"
            class="ingredient-item"
          >
            <uni-easyinput
              v-model="ingredient.name"
              placeholder="用料名称（例如：土豆）"
              class="ingredient-input"
            />
            <uni-easyinput
              v-model="ingredient.amount"
              placeholder="用量（例如：2个）"
              class="ingredient-input"
            />
            <text class="delete-button" @click="delIngredient(index)">删除</text>
          </view>
          <view class="add-ingredient" @click="addIngredient">+ 添加用料</view>
        </view>
      </uni-forms>
      <button type="primary" @click="submit('recipeForm')">添加菜谱</button>
    </view>
  </view>
</template>

<script setup>
	import { ref, onMounted } from "vue";
	import topTabBarDynamicVue from "../../components/topTabBarDynamic.vue";
	import request from "@/common/request.js";

	const recipeFormData = ref({
		name: "",
		category: "",
		description: "",
		price: 0,
		specifications: [{ name: "", options: [] }],
		ingredients: [],
	});

	const recipeRules = {
		name: {
			rules: [{ required: true, errorMessage: "名称不能为空" }],
		},
		category: {
			rules: [{ required: true, errorMessage: "分类不能为空" }],
		},
		price: {
			rules: [{ format: "number", errorMessage: "价格必须是数字" }],
		},
	};

	const range = ref([])

	const addSpec = () => {
		recipeFormData.value.specifications.push({ name: "", options: [] });
	};

	const delSpec = (index) => {
		recipeFormData.value.specifications.splice(index, 1);
	};

	const addOption = (specIndex) => {
		recipeFormData.value.specifications[specIndex].options.push({ name: "", price: 0 });
	};

	const delOption = (specIndex, optIndex) => {
		recipeFormData.value.specifications[specIndex].options.splice(optIndex, 1);
	};

	const addIngredient = () => {
		recipeFormData.value.ingredients.push({ name: "", amount: "" });
	};

	const delIngredient = (index) => {
		recipeFormData.value.ingredients.splice(index, 1);
	};

	const submit = async () => {
		console.log("提交的数据:", recipeFormData.value);
		try {
			const response = await request.post("/lover-dish/add", {
				dishName: recipeFormData.value.name,
				description: recipeFormData.value.description,
				price: recipeFormData.value.price,
				categoryId: recipeFormData.value.category,
				dishUse: recipeFormData.value.ingredients.map((item) => ({
					[item.name]: item.amount,
				})),
				dishSpecifications: recipeFormData.value.specifications.map((spec) => ({
					flavor: spec.name,
					options: spec.options.reduce((acc, option) => {
						acc[option.name] = option.price;
						return acc;
					}, {}),
				})),
				imageUrl: recipeFormData.value.imageUrl || "",
			});
			if (response.code === 0) {
				uni.showToast({
					title: "提交成功！",
					icon: "success",
				});
			} else {
				uni.showToast({
					title: response.message || "提交失败",
					icon: "error",
				});
			}
		} catch (error) {
			console.error("提交失败：", error);
			uni.showToast({
				title: "网络错误，请稍后重试",
				icon: "error",
			});
		}
	};
	
	onMounted(async () => {
	  const categoriesList = uni.getStorageSync('categoriesList');
		// 进行深拷贝操作（这里其实可以使用更合适的深拷贝方法，比如lodash的cloneDeep等，JSON.parse(JSON.stringify())有一些局限性）
		let copiedCategoriesList = JSON.parse(JSON.stringify(categoriesList)); 

		// 转换为range的格式
		range.value = copiedCategoriesList.map(category => ({
				value: category.id,
				text: category.categoryName
		}));
	});

</script>

<style lang="scss">
/* 样式保持不变 */
.container {
  padding: 15px;
  background-color: #fff;
}
.spec-container,
.ingredients-container {
  margin-top: 20px;
}
.spec-item,
.ingredient-item {
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.spec-header,
.ingredient-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.actions {
  display: flex;
  gap: 10px;
}
.spec-option {
  display: flex;
  align-items: center;
}
.add-option,
.delete-spec,
.delete-option,
.add-ingredient,
.delete-button {
  color: #f56c6c;
  cursor: pointer;
}
.add-spec,
.add-ingredient {
  color: #409eff;
  margin-top: 10px;
  cursor: pointer;
}
.option-input,
.spec-input,
.ingredient-input {
  margin-right: 10px;
  flex: 1;
}
</style>