"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-count-to",
  data() {
    return {
      localStartVal: this.startVal,
      displayValue: this.formatNumber(this.startVal),
      printVal: null,
      paused: false,
      // 是否暂停
      localDuration: Number(this.duration),
      startTime: null,
      // 开始的时间
      timestamp: null,
      // 时间戳
      remaining: null,
      // 停留的时间
      rAF: null,
      lastTime: 0
      // 上一次的时间
    };
  },
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$3],
  computed: {
    countDown() {
      return this.startVal > this.endVal;
    }
  },
  watch: {
    startVal() {
      this.autoplay && this.start();
    },
    endVal() {
      this.autoplay && this.start();
    }
  },
  mounted() {
    this.autoplay && this.start();
  },
  emits: ["end"],
  methods: {
    addUnit: common_vendor.addUnit,
    easingFn(t, b, c, d) {
      return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
    },
    requestAnimationFrame(callback) {
      const currTime = (/* @__PURE__ */ new Date()).getTime();
      const timeToCall = Math.max(0, 16 - (currTime - this.lastTime));
      const id = setTimeout(() => {
        callback(currTime + timeToCall);
      }, timeToCall);
      this.lastTime = currTime + timeToCall;
      return id;
    },
    cancelAnimationFrame(id) {
      clearTimeout(id);
    },
    // 开始滚动数字
    start() {
      this.localStartVal = this.startVal;
      this.startTime = null;
      this.localDuration = this.duration;
      this.paused = false;
      this.rAF = this.requestAnimationFrame(this.count);
    },
    // 暂定状态，重新再开始滚动；或者滚动状态下，暂停
    reStart() {
      if (this.paused) {
        this.resume();
        this.paused = false;
      } else {
        this.stop();
        this.paused = true;
      }
    },
    // 暂停
    stop() {
      this.cancelAnimationFrame(this.rAF);
    },
    // 重新开始(暂停的情况下)
    resume() {
      if (!this.remaining)
        return;
      this.startTime = 0;
      this.localDuration = this.remaining;
      this.localStartVal = this.printVal;
      this.requestAnimationFrame(this.count);
    },
    // 重置
    reset() {
      this.startTime = null;
      this.cancelAnimationFrame(this.rAF);
      this.displayValue = this.formatNumber(this.startVal);
    },
    count(timestamp) {
      if (!this.startTime)
        this.startTime = timestamp;
      this.timestamp = timestamp;
      const progress = timestamp - this.startTime;
      this.remaining = this.localDuration - progress;
      if (this.useEasing) {
        if (this.countDown) {
          this.printVal = this.localStartVal - this.easingFn(progress, 0, this.localStartVal - this.endVal, this.localDuration);
        } else {
          this.printVal = this.easingFn(progress, this.localStartVal, this.endVal - this.localStartVal, this.localDuration);
        }
      } else {
        if (this.countDown) {
          this.printVal = this.localStartVal - (this.localStartVal - this.endVal) * (progress / this.localDuration);
        } else {
          this.printVal = this.localStartVal + (this.endVal - this.localStartVal) * (progress / this.localDuration);
        }
      }
      if (this.countDown) {
        this.printVal = this.printVal < this.endVal ? this.endVal : this.printVal;
      } else {
        this.printVal = this.printVal > this.endVal ? this.endVal : this.printVal;
      }
      this.displayValue = this.formatNumber(this.printVal) || 0;
      if (progress < this.localDuration) {
        this.rAF = this.requestAnimationFrame(this.count);
      } else {
        this.$emit("end");
      }
    },
    // 判断是否数字
    isNumber(val) {
      return !isNaN(parseFloat(val));
    },
    formatNumber(num) {
      num = Number(num);
      num = num.toFixed(Number(this.decimals));
      num += "";
      const x = num.split(".");
      let x1 = x[0];
      const x2 = x.length > 1 ? this.decimal + x[1] : "";
      const rgx = /(\d+)(\d{3})/;
      if (this.separator && !this.isNumber(this.separator)) {
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, "$1" + this.separator + "$2");
        }
      }
      return x1 + x2;
    },
    destroyed() {
      this.cancelAnimationFrame(this.rAF);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.displayValue),
    b: $options.addUnit(_ctx.fontSize),
    c: _ctx.bold ? "bold" : "normal",
    d: _ctx.color
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d2213393"]]);
wx.createComponent(Component);
