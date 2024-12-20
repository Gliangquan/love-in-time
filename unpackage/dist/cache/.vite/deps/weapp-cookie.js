import {
  __commonJS
} from "./chunk-Y2F7D3TJ.js";

// ../../../../../../Users/liangquan/Desktop/programs/小程序/wx-lover/node_modules/weapp-cookie/dist/weapp-cookie.umd.js
var require_weapp_cookie_umd = __commonJS({
  "../../../../../../Users/liangquan/Desktop/programs/小程序/wx-lover/node_modules/weapp-cookie/dist/weapp-cookie.umd.js"(exports, module) {
    (function(d, f) {
      typeof exports == "object" && typeof module != "undefined" ? module.exports = f() : typeof define == "function" && define.amd ? define(f) : (d = typeof globalThis != "undefined" ? globalThis : d || self, d["weapp-cookie"] = f());
    })(exports, function() {
      "use strict";
      var d = { exports: {} }, f = { decodeValues: true, map: false, silent: false };
      function m(a) {
        return typeof a == "string" && !!a.trim();
      }
      function g(a, e) {
        var t = a.split(";").filter(m), r = t.shift().split("="), s = r.shift(), i = r.join("=");
        e = e ? Object.assign({}, f, e) : f;
        try {
          i = e.decodeValues ? decodeURIComponent(i) : i;
        } catch (l) {
          console.error("set-cookie-parser encountered an error while decoding a cookie with value '" + i + "'. Set options.decodeValues to false to disable this feature.", l);
        }
        var o = { name: s, value: i };
        return t.forEach(function(l) {
          var h = l.split("="), c = h.shift().trimLeft().toLowerCase(), u = h.join("=");
          c === "expires" ? o.expires = new Date(u) : c === "max-age" ? o.maxAge = parseInt(u, 10) : c === "secure" ? o.secure = true : c === "httponly" ? o.httpOnly = true : c === "samesite" ? o.sameSite = u : o[c] = u;
        }), o;
      }
      function v(a, e) {
        if (e = e ? Object.assign({}, f, e) : f, !a)
          return e.map ? {} : [];
        if (a.headers && a.headers["set-cookie"])
          a = a.headers["set-cookie"];
        else if (a.headers) {
          var t = a.headers[Object.keys(a.headers).find(function(s) {
            return s.toLowerCase() === "set-cookie";
          })];
          !t && a.headers.cookie && !e.silent && console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."), a = t;
        }
        if (Array.isArray(a) || (a = [a]), e = e ? Object.assign({}, f, e) : f, e.map) {
          var r = {};
          return a.filter(m).reduce(function(s, i) {
            var o = g(i, e);
            return s[o.name] = o, s;
          }, r);
        } else
          return a.filter(m).map(function(s) {
            return g(s, e);
          });
      }
      function C(a) {
        if (Array.isArray(a))
          return a;
        if (typeof a != "string")
          return [];
        var e = [], t = 0, r, s, i, o, l;
        function h() {
          for (; t < a.length && /\s/.test(a.charAt(t)); )
            t += 1;
          return t < a.length;
        }
        function c() {
          return s = a.charAt(t), s !== "=" && s !== ";" && s !== ",";
        }
        for (; t < a.length; ) {
          for (r = t, l = false; h(); )
            if (s = a.charAt(t), s === ",") {
              for (i = t, t += 1, h(), o = t; t < a.length && c(); )
                t += 1;
              t < a.length && a.charAt(t) === "=" ? (l = true, t = o, e.push(a.substring(r, i)), r = t) : t = i + 1;
            } else
              t += 1;
          (!l || t >= a.length) && e.push(a.substring(r, a.length));
        }
        return e;
      }
      d.exports = v, d.exports.parse = v, d.exports.parseString = g, d.exports.splitCookiesString = C;
      var y = d.exports;
      class x {
        getCookieScopeDomain(e = "") {
          if (!e)
            return [];
          e = e.replace(/^\.+/gi, "");
          let t = e.split(".").map((r) => [".", e.slice(e.indexOf(r))].join(""));
          return [e].concat(t);
        }
        normalizeDomain(e = "") {
          return e.replace(/^(\.*)?(?=\S)/gi, ".");
        }
      }
      var k = new x();
      class _ {
        constructor(e) {
          this.name = e.name || "", this.value = e.value || "", this.domain = e.domain || "", this.path = e.path || "/", this.expires = e.expires ? new Date(e.expires) : null, this.maxAge = e.maxAge !== void 0 && e.maxAge !== null ? parseInt(e.maxAge) : null, this.httpOnly = !!e.httpOnly, this.dateTime = e.dateTime ? new Date(e.dateTime) : /* @__PURE__ */ new Date();
        }
        set(e = "") {
          var t = y.parse(e, { decodeValues: false })[0];
          return t && (Object.assign(this, t), this.dateTime = /* @__PURE__ */ new Date()), this;
        }
        merge(e) {
          return Object.assign(this, e);
        }
        isExpired() {
          return this.maxAge === 0 ? true : this.maxAge > 0 ? (Date.now() - this.dateTime.getTime()) / 1e3 > this.maxAge : !!(this.expires && this.expires < /* @__PURE__ */ new Date());
        }
        isPersistence() {
          return this.maxAge ? this.maxAge > 0 : true;
        }
        isInDomain(e) {
          return k.getCookieScopeDomain(e).indexOf(this.domain) >= 0;
        }
        isInPath(e) {
          return e.indexOf(this.path) === 0 || this.path.replace(/\/$/, "") === e;
        }
        toString() {
          return [this.name, this.value].join("=");
        }
      }
      function A() {
        return typeof my != "undefined" ? (my.platform = "my", my) : typeof tt != "undefined" ? (tt.platform = "tt", tt) : typeof swan != "undefined" ? (swan.platform = "swan", swan) : typeof qq != "undefined" ? (qq.platform = "qq", qq) : typeof wx != "undefined" ? (wx.platform = typeof window != "undefined" && typeof location != "undefined" ? "h5" : "wx", wx) : { platform: "none" };
      }
      var n = A();
      class S {
        getItem(e) {
          return n.platform === "my" ? n.getStorageSync({ key: e }).data : n.getStorageSync(e);
        }
        setItem(e, t) {
          return n.platform === "my" ? n.setStorageSync({ key: e, data: t }) : n.setStorageSync(e, t);
        }
      }
      var w = new S(n);
      class b {
        constructor() {
          this.__storageKey = "__cookie_store__", this.__cookiesMap = this.__readFromStorage() || /* @__PURE__ */ new Map();
        }
        has(e, t, r) {
          return this.getCookie(e, t, r) !== void 0;
        }
        get(e = "", t = "", r = "/") {
          let s = this.getCookie(e, t, r);
          return s ? s.value : void 0;
        }
        set(e = "", t = "", r = {}) {
          let s = r.domain;
          if (!s || !e)
            throw new Error("name 和 options.domain 值不正确！");
          let i = new _(Object.assign(r, { name: e, value: t })), o = this.__cookiesMap.get(s) || /* @__PURE__ */ new Map();
          return o.set(e, i), this.__cookiesMap.set(s, o), this.__saveToStorage(), i;
        }
        dir() {
          let e = {};
          for (let t of this.__cookiesMap.keys())
            e[t] = this.getCookies(t);
          return e;
        }
        remove(e = "", t = "") {
          if (t) {
            let r = this.__cookiesMap.get(t);
            r && r.delete(e), r = this.__cookiesMap.get(k.normalizeDomain(t)), r && r.delete(e);
          } else
            for (let r of this.__cookiesMap.values())
              r.delete(e);
          return this.__saveToStorage(), true;
        }
        getCookie(e = "", t = "", r = "/") {
          let s, i = k.getCookieScopeDomain(t);
          for (let [o, l] of this.__cookiesMap.entries())
            if (!(t && i.indexOf(o) < 0)) {
              if (s = l.get(e), s && s.isInPath(r) && !s.isExpired())
                break;
              s = void 0;
            }
          return s;
        }
        getCookies(e, t) {
          let r = {};
          return this.getCookiesArray(e, t).forEach((s) => {
            r[s.name] = s.value;
          }), r;
        }
        getCookiesArray(e = "", t = "/") {
          let r = [], s = k.getCookieScopeDomain(e);
          for (let [i, o] of this.__cookiesMap.entries())
            if (!(e && s.indexOf(i) < 0))
              for (let l of o.values())
                l.isInPath(t) && !l.isExpired() && r.push(l);
          return r;
        }
        setCookiesArray(e = []) {
          return this.__cookiesMap = this.__cookiesMap || /* @__PURE__ */ new Map(), e.forEach((t) => {
            let r = this.__cookiesMap.get(t.domain);
            r || (r = /* @__PURE__ */ new Map(), this.__cookiesMap.set(t.domain, r)), r.set(t.name, t);
          }), this.__saveToStorage(), this.__cookiesMap;
        }
        clearCookies(e) {
          if (e) {
            let t = this.__cookiesMap.get(e);
            t && t.clear();
          } else
            this.__cookiesMap.clear();
          return this.__saveToStorage(), true;
        }
        getRequestCookies(e, t) {
          let r = this.getCookiesArray(e, t);
          return this.stringify(r);
        }
        setResponseCookies(e, t) {
          let r = this.parse(e, t);
          return this.setCookiesArray(r);
        }
        parse(e = "", t) {
          var r = y.parse(y.splitCookiesString(e), { decodeValues: false });
          return r.map((s) => (s.domain = k.normalizeDomain(s.domain) || t, new _(s)));
        }
        stringify(e) {
          return e.map((t) => t.toString()).join("; ");
        }
        __saveToStorage() {
          try {
            let e = [];
            for (let t of this.__cookiesMap.values())
              for (let r of t.values())
                r.isExpired() ? t.delete(r.name) : r.isPersistence() && e.push(r);
            w.setItem(this.__storageKey, e);
          } catch (e) {
            console.warn("Cookie 存储异常：", e);
          }
        }
        __readFromStorage() {
          try {
            let e = w.getItem(this.__storageKey) || [];
            return e = e.map((t) => new _(t)), this.setCookiesArray(e);
          } catch (e) {
            console.warn("Cookie 读取异常：", e);
          }
        }
      }
      return function() {
        const a = new b();
        function e(i) {
          if (i.cookie = i.cookie === void 0 || !!i.cookie, i.dataType = i.dataType || "json", i.header = i.headers = i.header || i.headers || {}, i.header["X-Requested-With"] = "XMLHttpRequest", i.dataType === "json" && (i.header.Accept = "application/json, text/plain, */*"), n.platform !== "h5" && i.cookie) {
            let o = (i.url || "").split("/")[2], l = i.url.split(o).pop(), h = a.getRequestCookies(o, l);
            i.header.Cookie = h;
            let c = i.success;
            i.success = function(u) {
              u.header = u.header || u.headers;
              let p = u.header ? u.header["Set-Cookie"] || u.header["set-cookie"] : "";
              p && (p = p.replace(/\;([^\s\;]*?(?=\=))/gi, ",$1"), a.setResponseCookies(p, o)), c && c(u);
            };
          }
          return this(i);
        }
        const t = e.bind(n.request), r = e.bind(n.uploadFile), s = e.bind(n.downloadFile);
        try {
          Object.defineProperties(n, { requestWithCookie: { value: t }, uploadFileWithCookie: { value: r }, downloadFileWithCookie: { value: s } }), Object.defineProperties(n, { request: { value: t }, uploadFile: { value: r }, downloadFile: { value: s } });
        } catch (i) {
          console.error("weapp-cookie: ", i);
        }
        return a.config = function(i) {
          i = Object.assign({ requestAlias: "requestWithCookie", uploadFileAlias: "uploadFileWithCookie", downloadFileAlias: "downloadFileWithCookie" }, i), i.requestAlias && Object.defineProperty(n, i.requestAlias, { value: t }), i.uploadFileAlias && Object.defineProperty(n, i.uploadFileAlias, { value: r }), i.downloadFileAlias && Object.defineProperty(n, i.downloadFileAlias, { value: s });
        }, a;
      }();
    });
  }
});
export default require_weapp_cookie_umd();
//# sourceMappingURL=weapp-cookie.js.map
