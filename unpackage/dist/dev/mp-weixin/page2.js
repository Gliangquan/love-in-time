"use strict";
const common_vendor = require("./common/vendor.js");
const _sfc_main = {
  data() {
    return {
      // 左侧分类
      categories: [
        { name: "新品上市" },
        { name: "招牌柠檬茶" },
        { name: "鲜果柠檬茶" },
        { name: "清爽柠檬茶" },
        { name: "生椰系列" },
        { name: "醇香奶茶" },
        { name: "冰沙系列" },
        { name: "热饮系列" },
        { name: "新品上市" },
        { name: "招牌柠檬茶" },
        { name: "鲜果柠檬茶" },
        { name: "清爽柠檬茶" },
        { name: "生椰系列" },
        { name: "醇香奶茶" },
        { name: "冰沙系列" },
        { name: "热饮系列" }
      ],
      // 商品数据（可从后台拉取）
      products: [
        { category: "招牌柠檬茶", name: "招牌暴打渣男柠檬茶", spec: "600ml", price: 18, imgSrc: "https://picsum.photos/seed/picsum/200/300?a=1" },
        { category: "招牌柠檬茶", name: "暴打凤梨鸭屎香柠檬茶", spec: "600ml", price: 18, imgSrc: "https://picsum.photos/seed/picsum/200/300?b=2" },
        { category: "招牌柠檬茶", name: "暴打凤梨冰柠茶", spec: "600ml", price: 16, imgSrc: "https://picsum.photos/seed/picsum/200/300?c=3" },
        { category: "鲜果柠檬茶", name: "橙多芬冰柠茶", spec: "600ml", price: 16, imgSrc: "https://picsum.photos/seed/picsum/200/300?d=4" },
        { category: "鲜果柠檬茶", name: "芒果柠檬茶", spec: "600ml", price: 15, imgSrc: "https://picsum.photos/seed/picsum/200/300?e=5" }
      ],
      // 当前选中的分类索引
      currentCategoryIndex: 0,
      // 搜索key
      keyword: "遥看瀑布挂前川"
    };
  },
  computed: {
    // 根据当前分类筛选商品
    currentProducts() {
      const currentCategory = this.categories[this.currentCategoryIndex].name;
      return this.products.filter((product) => product.category === currentCategory);
    }
  },
  methods: {
    // 切换分类
    switchCategory(index) {
      this.currentCategoryIndex = index;
    },
    // 商品选择操作
    selectProduct(product) {
      console.log("选择商品：", product);
      common_vendor.index.navigateTo({
        url: `/pages/productDetail/productDetail?name=${product.name}`
      });
    }
  }
};
if (!Array) {
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u_search2 + _easycom_u_button2)();
}
const _easycom_u_search = () => "./node-modules/uview-plus/components/u-search/u-search.js";
const _easycom_u_button = () => "./node-modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u_search + _easycom_u_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.keyword = $event),
    b: common_vendor.p({
      placeholder: "",
      modelValue: $data.keyword
    }),
    c: common_vendor.f($data.categories, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: index,
        c: common_vendor.n($data.currentCategoryIndex === index ? "active" : ""),
        d: common_vendor.o(($event) => $options.switchCategory(index), index)
      };
    }),
    d: common_vendor.f($options.currentProducts, (product, index, i0) => {
      return {
        a: product.imgSrc,
        b: common_vendor.t(product.name),
        c: common_vendor.t(product.spec),
        d: common_vendor.t(product.price),
        e: common_vendor.o(($event) => $options.selectProduct(product), index),
        f: "1a0b1a9e-1-" + i0,
        g: index
      };
    }),
    e: common_vendor.p({
      text: "选规格",
      shape: "circle",
      size: "mini"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
exports.MiniProgramPage = MiniProgramPage;
