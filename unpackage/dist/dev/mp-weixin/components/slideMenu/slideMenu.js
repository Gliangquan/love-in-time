"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "SimpleCarousel",
  data() {
    return {
      items: ["框1", "框2", "框3", "框4", "框5"],
      currentIndex: 2,
      startX: 0,
      offsetX: 0,
      maxOffset: 50
      // 最大滑动距离
    };
  },
  methods: {
    onTouchStart(event) {
      this.startX = event.touches[0].pageX;
      this.offsetX = 0;
    },
    onTouchMove(event) {
      const moveX = event.touches[0].pageX;
      let deltaX = moveX - this.startX;
      if (deltaX > this.maxOffset) {
        deltaX = this.maxOffset;
      } else if (deltaX < -this.maxOffset) {
        deltaX = -this.maxOffset;
      }
      this.offsetX = deltaX;
    },
    onTouchEnd(event) {
      const endX = event.changedTouches[0].pageX;
      const distance = endX - this.startX;
      if (distance > 50) {
        this.slideRight();
      } else if (distance < -50) {
        this.slideLeft();
      }
      this.offsetX = 0;
    },
    slideLeft() {
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
    },
    slideRight() {
      this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    },
    itemStyle(index) {
      const position = (index - this.currentIndex + this.items.length) % this.items.length;
      let scale = 1;
      let translateX = (position - 2) * 50;
      const slideRatio = Math.min(Math.abs(this.offsetX) / this.maxOffset, 1);
      const direction = this.offsetX > 0 ? -1 : 1;
      if (position === 2) {
        scale = 1.2 - slideRatio * 0.4;
        translateX += this.offsetX / 2;
      } else if (position === 1 && direction === -1) {
        scale = 0.7 + slideRatio * 0.2;
        translateX = translateX * 1.1 + this.offsetX / 2;
      } else if (position === 3 && direction === -1) {
        scale = 0.7 - slideRatio * 0.2;
        translateX = translateX * 1.1 + this.offsetX / 2;
      } else if (position === 1 && direction === 1) {
        scale = 0.7 - slideRatio * 0.2;
        translateX = translateX * 1.1 + this.offsetX / 2;
      } else if (position === 3 && direction === 1) {
        scale = 0.7 + slideRatio * 0.2;
        translateX = translateX * 1.1 + this.offsetX / 2;
      } else {
        scale = 0.7 - slideRatio * 0.5;
        translateX = translateX * 1.2 + this.offsetX / 2;
      }
      const opacity = position === 2 ? 1 - slideRatio * 0.1 : 0.4 + slideRatio * 0.4;
      return {
        transform: `translateX(${translateX}%) scale(${scale})`,
        opacity,
        zIndex: 5 - Math.abs(2 - position),
        transition: "transform 0.3s ease, opacity 0.3s ease"
      };
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.items, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index,
        c: common_vendor.n({
          active: $data.currentIndex === index
        }),
        d: common_vendor.s($options.itemStyle(index))
      };
    }),
    b: common_vendor.o((...args) => $options.onTouchStart && $options.onTouchStart(...args)),
    c: common_vendor.o((...args) => $options.onTouchMove && $options.onTouchMove(...args)),
    d: common_vendor.o((...args) => $options.onTouchEnd && $options.onTouchEnd(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5b0766ab"]]);
wx.createComponent(Component);
