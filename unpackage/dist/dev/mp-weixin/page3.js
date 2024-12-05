"use strict";
const common_vendor = require("./common/vendor.js");
const utils_store = require("./utils/store.js");
const dishItemVue = () => "./components/dishItem/dishItem.js";
const _sfc_main = {
  name: "page3",
  components: {
    dishItemVue
  },
  data() {
    return {
      column: 2,
      // 可随意更改列数
      list: []
      // 初始化数据列表
    };
  },
  mounted() {
    this.getColumnList();
    this.getList();
  },
  methods: {
    // 初始化列数组
    getColumnList() {
      this.list = Array.from({ length: this.column }, () => []);
    },
    // 获取数据并均匀分配到每列
    getList() {
      const data = [
        {
          imgSrc: "https://img.js.design/assets/img/66b48b6d0cc5e5436588b055.png#793a4402015a47fb074f9293314d333f",
          dishName: "宫保鸡丁",
          dishHub: "11",
          price: "9.99"
        },
        {
          imgSrc: "https://img.js.design/assets/img/66b48b6d0cc5e5436588b055.png#793a4402015a47fb074f9293314d333f",
          dishName: "辣子鸡",
          dishHub: "22",
          price: "12.99"
        },
        {
          imgSrc: "https://img.js.design/assets/img/66b48b6d0cc5e5436588b055.png#793a4402015a47fb074f9293314d333f",
          dishName: "干锅虾",
          dishHub: "33",
          price: "8.99"
        },
        {
          imgSrc: "https://img.js.design/assets/img/66b48b6d0cc5e5436588b055.png#793a4402015a47fb074f9293314d333f",
          dishName: "鱼",
          dishHub: "44",
          price: "8.99"
        },
        {
          imgSrc: "https://img.js.design/assets/img/66b48b6d0cc5e5436588b055.png#793a4402015a47fb074f9293314d333f",
          dishName: "新菜品名新菜品名新菜菜5",
          dishHub: "55",
          price: "8.99"
        },
        {
          imgSrc: "https://img.js.design/assets/img/66b48b6d0cc5e5436588b055.png#793a4402015a47fb074f9293314d333f",
          dishName: "新菜品名新菜品名新菜菜5",
          dishHub: "55",
          price: "8.99"
        },
        {
          imgSrc: "https://img.js.design/assets/img/66b48b6d0cc5e5436588b055.png#793a4402015a47fb074f9293314d333f",
          dishName: "新菜品名新菜品名新菜菜5",
          dishHub: "55",
          price: "8.99"
        }
      ];
      data.forEach((item, index) => {
        this.list[index % this.column].push(item);
      });
    },
    todish(dish) {
      utils_store.store.commit("setSelectedDish", dish);
      common_vendor.index.navigateTo({
        url: "/pages/dish/dishdetails"
      });
    }
  }
};
if (!Array) {
  const _component_dishItemVue = common_vendor.resolveComponent("dishItemVue");
  _component_dishItemVue();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: common_vendor.f(item, (dish, dishIndex, i1) => {
          return {
            a: dishIndex,
            b: common_vendor.o(($event) => $options.todish(dish), dishIndex),
            c: common_vendor.o(($event) => $options.todish(dish), dishIndex),
            d: "c9edc2b4-0-" + i0 + "-" + i1,
            e: common_vendor.p({
              imgSrc: dish.imgSrc,
              dishName: dish.dishName,
              dishHub: dish.dishHub,
              price: dish.price
            })
          };
        }),
        b: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c9edc2b4"]]);
exports.MiniProgramPage = MiniProgramPage;
