"use strict";
const common_vendor = require("../common/vendor.js");
const store = common_vendor.createStore({
  state: {
    selectedDish: null
  },
  mutations: {
    setSelectedDish(state, dish) {
      state.selectedDish = dish;
    }
  }
});
exports.store = store;
