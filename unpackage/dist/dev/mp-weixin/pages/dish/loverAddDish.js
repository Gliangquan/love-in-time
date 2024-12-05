"use strict";
const common_vendor = require("../../common/vendor.js");
const common_request = require("../../common/request.js");
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_file_picker2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_select2 + _easycom_uni_forms2)();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (topTabBarDynamicVue + _easycom_uni_file_picker + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_select + _easycom_uni_forms)();
}
const topTabBarDynamicVue = () => "../../components/topTabBarDynamic.js";
const _sfc_main = {
  __name: "loverAddDish",
  setup(__props) {
    const recipeFormData = common_vendor.ref({
      name: "",
      category: "",
      description: "",
      price: 0,
      specifications: [{ name: "", options: [] }],
      ingredients: []
    });
    const recipeRules = {
      name: {
        rules: [{ required: true, errorMessage: "名称不能为空" }]
      },
      category: {
        rules: [{ required: true, errorMessage: "分类不能为空" }]
      },
      price: {
        rules: [{ format: "number", errorMessage: "价格必须是数字" }]
      }
    };
    const range = common_vendor.ref([]);
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
        const response = await common_request.request.post("/lover-dish/add", {
          dishName: recipeFormData.value.name,
          description: recipeFormData.value.description,
          price: recipeFormData.value.price,
          categoryId: recipeFormData.value.category,
          dishUse: recipeFormData.value.ingredients.map((item) => ({
            [item.name]: item.amount
          })),
          dishSpecifications: recipeFormData.value.specifications.map((spec) => ({
            flavor: spec.name,
            options: spec.options.reduce((acc, option) => {
              acc[option.name] = option.price;
              return acc;
            }, {})
          })),
          imageUrl: recipeFormData.value.imageUrl || ""
        });
        if (response.code === 0) {
          common_vendor.index.showToast({
            title: "提交成功！",
            icon: "success"
          });
        } else {
          common_vendor.index.showToast({
            title: response.message || "提交失败",
            icon: "error"
          });
        }
      } catch (error) {
        console.error("提交失败：", error);
        common_vendor.index.showToast({
          title: "网络错误，请稍后重试",
          icon: "error"
        });
      }
    };
    common_vendor.onMounted(async () => {
      const categoriesList = common_vendor.index.getStorageSync("categoriesList");
      let copiedCategoriesList = JSON.parse(JSON.stringify(categoriesList));
      range.value = copiedCategoriesList.map((category) => ({
        value: category.id,
        text: category.categoryName
      }));
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "添加菜品",
          showBackButton: "true"
        }),
        b: common_vendor.p({
          limit: "1",
          ["del-icon"]: "true",
          ["disable-preview"]: true,
          ["file-mediatype"]: "image"
        }),
        c: common_vendor.o(($event) => recipeFormData.value.name = $event),
        d: common_vendor.p({
          placeholder: "请输入名称",
          modelValue: recipeFormData.value.name
        }),
        e: common_vendor.p({
          label: "名称",
          required: true,
          name: "name"
        }),
        f: common_vendor.o(($event) => recipeFormData.value.category = $event),
        g: common_vendor.p({
          localdata: range.value,
          label: "应用选择",
          modelValue: recipeFormData.value.category
        }),
        h: common_vendor.p({
          label: "分类",
          required: true,
          name: "category"
        }),
        i: common_vendor.o(($event) => recipeFormData.value.description = $event),
        j: common_vendor.p({
          type: "textarea",
          placeholder: "描述",
          modelValue: recipeFormData.value.description
        }),
        k: common_vendor.p({
          label: "描述"
        }),
        l: common_vendor.o(($event) => recipeFormData.value.price = $event),
        m: common_vendor.p({
          type: "number",
          placeholder: "0",
          modelValue: recipeFormData.value.price
        }),
        n: common_vendor.p({
          label: "价格"
        }),
        o: common_vendor.f(recipeFormData.value.specifications, (spec, specIndex, i0) => {
          return {
            a: "125c7f8a-11-" + i0 + ",125c7f8a-1",
            b: common_vendor.o(($event) => spec.name = $event, specIndex),
            c: common_vendor.p({
              placeholder: "规格名称（例如：口味）",
              modelValue: spec.name
            }),
            d: common_vendor.o(($event) => addOption(specIndex), specIndex),
            e: common_vendor.o(($event) => delSpec(specIndex), specIndex),
            f: common_vendor.f(spec.options, (option, optIndex, i1) => {
              return {
                a: "125c7f8a-12-" + i0 + "-" + i1 + ",125c7f8a-1",
                b: common_vendor.o(($event) => option.name = $event, optIndex),
                c: common_vendor.p({
                  placeholder: "选项名称（例如：微辣）",
                  modelValue: option.name
                }),
                d: "125c7f8a-13-" + i0 + "-" + i1 + ",125c7f8a-1",
                e: common_vendor.o(($event) => option.price = $event, optIndex),
                f: common_vendor.p({
                  type: "number",
                  placeholder: "规格单价(默认0)",
                  modelValue: option.price
                }),
                g: common_vendor.o(($event) => delOption(specIndex, optIndex), optIndex),
                h: optIndex
              };
            }),
            g: specIndex
          };
        }),
        p: common_vendor.o(addSpec),
        q: common_vendor.f(recipeFormData.value.ingredients, (ingredient, index, i0) => {
          return {
            a: "125c7f8a-14-" + i0 + ",125c7f8a-1",
            b: common_vendor.o(($event) => ingredient.name = $event, index),
            c: common_vendor.p({
              placeholder: "用料名称（例如：土豆）",
              modelValue: ingredient.name
            }),
            d: "125c7f8a-15-" + i0 + ",125c7f8a-1",
            e: common_vendor.o(($event) => ingredient.amount = $event, index),
            f: common_vendor.p({
              placeholder: "用量（例如：2个）",
              modelValue: ingredient.amount
            }),
            g: common_vendor.o(($event) => delIngredient(index), index),
            h: index
          };
        }),
        r: common_vendor.o(addIngredient),
        s: common_vendor.sr("recipeForm", "125c7f8a-1"),
        t: common_vendor.p({
          modelValue: recipeFormData.value,
          rules: recipeRules
        }),
        v: common_vendor.o(($event) => submit())
      };
    };
  }
};
wx.createPage(_sfc_main);
