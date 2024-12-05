"use strict";
const common_vendor = require("./vendor.js");
const BASE_URL = "http://localhost:8081/api";
const request = (url, method, data, options = {}) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: `${BASE_URL}${url}`,
      // 拼接基础路径和具体接口地址
      method: method || "GET",
      // 请求方法，默认为 GET
      data: data || {},
      // 请求数据
      header: options.header || {
        "Content-Type": "application/json"
      },
      timeout: options.timeout || 1e4,
      // 默认超时时间
      // 添加withCredentials属性并设置为true
      withCredentials: true,
      success: (response) => {
        const { statusCode, data: data2 } = response;
        if (statusCode >= 200 && statusCode < 300) {
          resolve(data2);
        } else {
          reject({
            message: `HTTP错误：${statusCode}`,
            data: data2
          });
        }
      },
      fail: (error) => {
        reject({
          message: "网络请求失败，请检查网络连接",
          error
        });
      }
    });
  });
};
const request$1 = {
  get(url, data, options) {
    return request(url, "GET", data, options);
  },
  post(url, data, options) {
    return request(url, "POST", data, options);
  },
  put(url, data, options) {
    return request(url, "PUT", data, options);
  },
  delete(url, data, options) {
    return request(url, "DELETE", data, options);
  }
};
exports.request = request$1;
