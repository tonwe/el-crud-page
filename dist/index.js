'use strict';



function ___$insertStylesToHeader(css) {
  if (!css) {
    return
  }
  if (typeof window === 'undefined') {
    return
  }

  const style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css
}

var Vue = require('vue');

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  var e,
    t,
    r = "function" == typeof Symbol ? Symbol : {},
    n = r.iterator || "@@iterator",
    o = r.toStringTag || "@@toStringTag";
  function i(r, n, o, i) {
    var c = n && n.prototype instanceof Generator ? n : Generator,
      u = Object.create(c.prototype);
    return _regeneratorDefine(u, "_invoke", function (r, n, o) {
      var i,
        c,
        u,
        f = 0,
        p = o || [],
        y = !1,
        G = {
          p: 0,
          n: 0,
          v: e,
          a: d,
          f: d.bind(e, 4),
          d: function (t, r) {
            return i = t, c = 0, u = e, G.n = r, a;
          }
        };
      function d(r, n) {
        for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
          var o,
            i = p[t],
            d = G.p,
            l = i[2];
          r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
        }
        if (o || r > 1) return a;
        throw y = !0, n;
      }
      return function (o, p, l) {
        if (f > 1) throw TypeError("Generator is already running");
        for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
          i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
          try {
            if (f = 2, i) {
              if (c || (o = "next"), t = i[o]) {
                if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                if (!t.done) return t;
                u = t.value, c < 2 && (c = 0);
              } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
              i = e;
            } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
          } catch (t) {
            i = e, c = 1, u = t;
          } finally {
            f = 1;
          }
        }
        return {
          value: t,
          done: y
        };
      };
    }(r, o, i), !0), u;
  }
  var a = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  t = Object.getPrototypeOf;
  var c = [][n] ? t(t([][n]())) : (_regeneratorDefine(t = {}, n, function () {
      return this;
    }), t),
    u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
  function f(e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine(u), _regeneratorDefine(u, o, "Generator"), _regeneratorDefine(u, n, function () {
    return this;
  }), _regeneratorDefine(u, "toString", function () {
    return "[object Generator]";
  }), (_regenerator = function () {
    return {
      w: i,
      m: f
    };
  })();
}
function _regeneratorDefine(e, r, n, t) {
  var i = Object.defineProperty;
  try {
    i({}, "", {});
  } catch (e) {
    i = 0;
  }
  _regeneratorDefine = function (e, r, n, t) {
    function o(r, n) {
      _regeneratorDefine(e, r, function (e) {
        return this._invoke(r, n, e);
      });
    }
    r ? i ? i(e, r, {
      value: n,
      enumerable: !t,
      configurable: !t,
      writable: !t
    }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
  }, _regeneratorDefine(e, r, n, t);
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

var toString = Object.prototype.toString;
function kindOf(val) {
  if (val === void 0) return 'undefined';
  if (val === null) return 'null';
  var type = _typeof(val);
  if (type === 'boolean') return 'boolean';
  if (type === 'string') return 'string';
  if (type === 'number') return 'number';
  if (type === 'symbol') return 'symbol';
  if (type === 'function') {
    return isGeneratorFn(val) ? 'generatorfunction' : 'function';
  }
  if (isArray$1(val)) return 'array';
  if (isBuffer(val)) return 'buffer';
  if (isArguments(val)) return 'arguments';
  if (isDate(val)) return 'date';
  if (isError(val)) return 'error';
  if (isRegexp(val)) return 'regexp';
  switch (ctorName(val)) {
    case 'Symbol':
      return 'symbol';
    case 'Promise':
      return 'promise';

    // Set, Map, WeakSet, WeakMap
    case 'WeakMap':
      return 'weakmap';
    case 'WeakSet':
      return 'weakset';
    case 'Map':
      return 'map';
    case 'Set':
      return 'set';

    // 8-bit typed arrays
    case 'Int8Array':
      return 'int8array';
    case 'Uint8Array':
      return 'uint8array';
    case 'Uint8ClampedArray':
      return 'uint8clampedarray';

    // 16-bit typed arrays
    case 'Int16Array':
      return 'int16array';
    case 'Uint16Array':
      return 'uint16array';

    // 32-bit typed arrays
    case 'Int32Array':
      return 'int32array';
    case 'Uint32Array':
      return 'uint32array';
    case 'Float32Array':
      return 'float32array';
    case 'Float64Array':
      return 'float64array';
  }
  if (isGeneratorObj(val)) {
    return 'generator';
  }

  // Non-plain objects
  type = toString.call(val);
  switch (type) {
    case '[object Object]':
      return 'object';
    // iterators
    case '[object Map Iterator]':
      return 'mapiterator';
    case '[object Set Iterator]':
      return 'setiterator';
    case '[object String Iterator]':
      return 'stringiterator';
    case '[object Array Iterator]':
      return 'arrayiterator';
  }

  // other
  return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
}
function ctorName(val) {
  return typeof val.constructor === 'function' ? val.constructor.name : null;
}
function isArray$1(val) {
  if (Array.isArray) return Array.isArray(val);
  return val instanceof Array;
}
function isError(val) {
  return val instanceof Error || typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number';
}
function isDate(val) {
  if (val instanceof Date) return true;
  return typeof val.toDateString === 'function' && typeof val.getDate === 'function' && typeof val.setDate === 'function';
}
function isRegexp(val) {
  if (val instanceof RegExp) return true;
  return typeof val.flags === 'string' && typeof val.ignoreCase === 'boolean' && typeof val.multiline === 'boolean' && typeof val.global === 'boolean';
}
function isGeneratorFn(name, val) {
  return ctorName(name) === 'GeneratorFunction';
}
function isGeneratorObj(val) {
  return typeof val["throw"] === 'function' && typeof val["return"] === 'function' && typeof val.next === 'function';
}
function isArguments(val) {
  try {
    if (typeof val.length === 'number' && typeof val.callee === 'function') {
      return true;
    }
  } catch (err) {
    if (err.message.indexOf('callee') !== -1) {
      return true;
    }
  }
  return false;
}

/**
 * If you need to support Safari 5-7 (8-10 yr-old browser),
 * take a look at https://github.com/feross/is-buffer
 */

function isBuffer(val) {
  if (val.constructor && typeof val.constructor.isBuffer === 'function') {
    return val.constructor.isBuffer(val);
  }
  return false;
}

/*!
 * shallow-clone <https://github.com/jonschlinkert/shallow-clone>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */

var valueOf = Symbol.prototype.valueOf;
function clone(val, deep) {
  switch (kindOf(val)) {
    case 'array':
      return val.slice();
    case 'object':
      return Object.assign({}, val);
    case 'date':
      return new val.constructor(Number(val));
    case 'map':
      return new Map(val);
    case 'set':
      return new Set(val);
    case 'buffer':
      return cloneBuffer(val);
    case 'symbol':
      return cloneSymbol(val);
    case 'arraybuffer':
      return cloneArrayBuffer(val);
    case 'float32array':
    case 'float64array':
    case 'int16array':
    case 'int32array':
    case 'int8array':
    case 'uint16array':
    case 'uint32array':
    case 'uint8clampedarray':
    case 'uint8array':
      return cloneTypedArray(val);
    case 'regexp':
      return cloneRegExp(val);
    case 'error':
      return Object.create(val);
    default:
      {
        return val;
      }
  }
}
function cloneRegExp(val) {
  var flags = val.flags !== void 0 ? val.flags : /\w+$/.exec(val) || void 0;
  var re = new val.constructor(val.source, flags);
  re.lastIndex = val.lastIndex;
  return re;
}
function cloneArrayBuffer(val) {
  var res = new val.constructor(val.byteLength);
  new Uint8Array(res).set(new Uint8Array(val));
  return res;
}
function cloneTypedArray(val, deep) {
  return new val.constructor(val.buffer, val.byteOffset, val.length);
}
function cloneBuffer(val) {
  var len = val.length;
  var buf = Buffer.allocUnsafe ? Buffer.allocUnsafe(len) : Buffer.from(len);
  val.copy(buf);
  return buf;
}
function cloneSymbol(val) {
  return valueOf ? Object(valueOf.call(val)) : {};
}

/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObject$1(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}
function isPlainObject(o) {
  var ctor, prot;
  if (isObject$1(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (ctor === undefined) return true;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObject$1(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
}

function cloneDeep(val, instanceClone) {
  switch (kindOf(val)) {
    case 'object':
      return cloneObjectDeep(val, instanceClone);
    case 'array':
      return cloneArrayDeep(val, instanceClone);
    default:
      {
        return clone(val);
      }
  }
}
function cloneObjectDeep(val, instanceClone) {
  if (typeof instanceClone === 'function') {
    return instanceClone(val);
  }
  if (instanceClone || isPlainObject(val)) {
    var res = val.constructor !== undefined ? new val.constructor() : Object.create(null);
    for (var key in val) {
      res[key] = cloneDeep(val[key], instanceClone);
    }
    return res;
  }
  return val;
}
function cloneArrayDeep(val, instanceClone) {
  var res = new val.constructor(val.length);
  for (var i = 0; i < val.length; i++) {
    res[i] = cloneDeep(val[i], instanceClone);
  }
  return res;
}

Math.easeInOutQuad = function (t, b, c, d) {
  t /= d / 2;
  if (t < 1) {
    return c / 2 * t * t + b;
  }
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
var requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
}();

/**
 * Because it's so fucking difficult to detect the scrolling element, just move them all
 * @param {number} amount
 */
function move(amount) {
  document.documentElement.scrollTop = amount;
  document.body.parentNode.scrollTop = amount;
  document.body.scrollTop = amount;
}
function position() {
  return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
}

/**
 * @param {number} to
 * @param {number} duration
 * @param {Function} callback
 */
function scrollTo(to, duration, callback) {
  var start = position();
  var change = to - start;
  var increment = 20;
  var currentTime = 0;
  duration = typeof duration === 'undefined' ? 500 : duration;
  var _animateScroll = function animateScroll() {
    // increment the time
    currentTime += increment;
    // find the value with the quadratic in-out easing function
    var val = Math.easeInOutQuad(currentTime, start, change, duration);
    // move the document.body
    move(val);
    // do the animation unless its over
    if (currentTime < duration) {
      requestAnimFrame(_animateScroll);
    } else {
      if (callback && typeof callback === 'function') {
        // the animation is done so lets callback
        callback();
      }
    }
  };
  _animateScroll();
}

function isArray(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}
function isObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}
function isFunction(value) {
  return typeof value === "function";
}
function isString(value) {
  return typeof value === "string";
}
function isPromise(value) {
  return value && _typeof(value) === 'object' && typeof value.then === 'function' && typeof value["catch"] === 'function';
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
function debounce(func, wait, immediate) {
  var timeout, args, context, timestamp, result;
  var _later = function later() {
    // 据上一次触发时间间隔
    var last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(_later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    context = this;
    timestamp = +new Date();
    var callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(_later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
}
function toLine(name) {
  return name.replace(/([A-Z])/g, "_$1").toLowerCase();
}

// ...删除固定创建的 __inst ...
var __vue = Vue; // Vue

/**
 * Parse JSX, filter params
 * options 增加 inst 参数，代表外部传入的 Vue 实例
 * @param {*} vnode
 * @param {{inst, scope, prop, children, $scopedSlots}} options
 */
var parse_jsx = function parse_jsx(vnode) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var inst = options.inst,
    scope = options.scope,
    prop = options.prop,
    $scopedSlots = options.$scopedSlots,
    _options$children = options.children,
    children = _options$children === void 0 ? [] : _options$children;
  var h = inst.$createElement;
  if (vnode.name.indexOf("slot-") == 0) {
    var rn = $scopedSlots[vnode.name];
    if (rn) {
      return rn({
        scope: scope
      });
    } else {
      return "错误";
    }
  }
  if (vnode.render) {
    if (!inst.$root.$options.components[vnode.name]) {
      __vue.component(vnode.name, cloneDeep(vnode));
    }

    // Avoid props prompts { type:null }
    delete vnode.props;
  }
  var keys = ["class", "style", "props", "attrs", "domProps", "on", "nativeOn", "directives", "scopedSlots", "slot", "key", "ref", "refInFor"];

  // Avoid loop update
  var data = cloneDeep(vnode);
  for (var i in data) {
    if (!keys.includes(i)) {
      delete data[i];
    }
  }
  if (scope) {
    if (!data.attrs) {
      data.attrs = {};
    }
    if (!data.on) {
      data.on = {};
    }
    if (!data.props) {
      data.props = {};
    }

    // 添加作用域
    data.props.scope = scope;

    // 输入事件
    var onInput = data.on.input;

    // 设置默认值
    data.attrs.value = scope[prop];

    // 监听输入事件
    data.on.input = function (val) {
      inst.$set(scope, prop, val);
      if (onInput) {
        onInput(val);
      }
    };
  }
  return h(vnode.name, cloneDeep(data), children);
};

/**
 * Render vNode
 * options 允许 inst 为空，通过调用者的 this 获取 Vue 实例
 * @param {*} vnode
 * @param {{inst?, prop, scope, $scopedSlots}} options
 */
function renderNode(vnode, options) {
  // 如果 options.inst 为空，则尝试用调用者上下文的 this
  var prop = options.prop,
    scope = options.scope,
    $scopedSlots = options.$scopedSlots;
  var inst = options.inst || this;
  var h = inst.$createElement;
  if (!vnode) {
    return null;
  }

  // When slot or tagName
  if (isString(vnode)) {
    return parse_jsx({
      name: vnode
    }, {
      inst: inst,
      prop: prop,
      scope: scope,
      $scopedSlots: $scopedSlots
    });
  }

  // When customeize render function
  if (isFunction(vnode)) {
    return vnode({
      scope: scope,
      h: h
    });
  }
  // When jsx
  if (isObject(vnode)) {
    if (isObject(vnode.name)) {
      var component = vnode.name;
      var curComponent = Object.values(inst.$options.components).find(function (item) {
        return item == vnode;
      });
      if (curComponent) {
        vnode.name = curComponent.name;
      } else {
        var componentName = component.name || "component_" + Math.random().toString(36).substr(2, 9);
        inst.$options.components[componentName] = component;
        vnode.name = componentName;
        console.log(componentName);
      }
    }
    if (vnode.context) {
      return vnode;
    }
    if (vnode.name) {
      // Handle general component
      var keys = ["el-select", "el-radio-group", "el-checkbox-group"];
      if (keys.includes(vnode.name)) {
        var _options = vnode.options;
        if (isFunction(_options)) {
          _options = _options(scope);
        }

        // Append component children
        var children = (_options || []).map(function (e, i) {
          if (vnode.name === "el-select") {
            var label, value;
            if (isString(e)) {
              label = value = e;
            } else if (isObject(e)) {
              label = e.label;
              value = e.value;
            } else {
              return "错误";
            }
            return h("el-option", {
              "props": _objectSpread2({}, _objectSpread2({
                key: i,
                label: label,
                value: value
              }, e.props))
            });
          } else if (vnode.name === "el-radio-group") {
            return h("el-radio", {
              "props": _objectSpread2({}, _objectSpread2({
                key: i,
                label: e.value
              }, e.props))
            }, [e.label]);
          } else if (vnode.name === "el-checkbox-group") {
            if (typeof scope[prop] === 'undefined') {
              inst.$set(scope, prop, []);
            }
            return h("el-checkbox", {
              "props": _objectSpread2({}, _objectSpread2({
                key: i,
                label: e.value
              }, e.props))
            }, [e.label]);
          } else {
            return null;
          }
        });
        return parse_jsx(vnode, {
          inst: inst,
          prop: prop,
          scope: scope,
          children: children
        });
      } else {
        return parse_jsx(vnode, {
          inst: inst,
          prop: prop,
          scope: scope,
          $scopedSlots: $scopedSlots
        });
      }
    } else {
      return "错误";
    }
  }
}

// 组件说明：TableColumn 用于在 CRUD 表格中动态渲染列，支持嵌套子列，处理字典与格式化展示。
var TableColumn = {
  // 组件名称
  name: "TableColumn",
  data: function data() {
    return {
      // emit:{},
      actionMap: {
        info: {
          label: "详情",
          type: "text",
          action: "info",
          icon: "el-icon-document"
        },
        update: {
          label: "编辑",
          type: "text",
          action: "update",
          icon: "el-icon-edit"
        },
        "delete": {
          label: "删除",
          type: "text",
          action: "delete",
          icon: "el-icon-delete"
        }
      }
    };
  },
  props: {
    // 列配置对象，包含列属性、子列、格式化函数等
    column: {
      type: Object,
      required: true
    },
    // 行索引生成方法，用于动态生成行号
    indexMethod: {
      type: Function,
      required: false
    }
  },
  computed: {
    // 判断当前列是否包含子列
    hasChildren: function hasChildren() {
      return this.column.children && this.column.children.length > 0;
    },
    // 生成并返回列的属性集合，默认居中对齐
    columnProps: function columnProps() {
      return Object.assign({}, this.column, {
        align: this.column.align || "center"
      });
    },
    // 生成唯一的列 key，用于 Vue 渲染优化
    columnKey: function columnKey() {
      return "crud-table-column-" + (this.column.prop || Math.random());
    }
  },
  mounted: function mounted() {},
  methods: {
    // 根据传入值查找并返回字典中对应的对象
    getDict: function getDict(value) {
      var _this = this;
      if (isPromise(this.column.dict)) {
        this.column.dict.then(function (dict) {
          _this.column.dict = dict;
        });
        return null;
      }
      // this.column.dict 如果 this.column.dict 是个 function
      // 则调用 this.column.dict(value) 返回字典对象
      if (typeof this.column.dict === "function") {
        return this.column.dict(value).find(function (d) {
          return d.value == value;
        });
      }
      if (this.column.dict) {
        var _this$column$dict;
        return (_this$column$dict = this.column.dict) === null || _this$column$dict === void 0 ? void 0 : _this$column$dict.find(function (d) {
          return d.value == value;
        });
      }
      return null;
    },
    // 检查传入的值是否严格为 null
    isNull: function isNull(val) {
      return val === null;
    },
    renderNode: function renderNode$1(vnode, options) {
      return renderNode.call(this, vnode, options);
    },
    renderSelection: function renderSelection(h) {
      return h("el-table-column", {
        key: this.columnKey,
        props: Object.assign({}, this.columnProps, {
          index: this.indexMethod
        })
      }, []);
    },
    // 渲染操作列
    renderActions: function renderActions(h) {
      var _this2 = this;
      return h("el-table-column", {
        key: this.columnKey,
        props: Object.assign({}, this.columnProps, {
          index: this.indexMethod
        }),
        scopedSlots: {
          "default": function _default(scope) {
            var _actions;
            var actions = _this2.column.actions;
            if (isFunction(_this2.column.actions)) {
              actions = _this2.column.actions({
                scope: scope,
                h: h
              });
            }
            return (_actions = actions) === null || _actions === void 0 ? void 0 : _actions.map(function (action) {
              // 自定义渲染函数
              if (isFunction(action)) {
                return action({
                  scope: scope,
                  h: h
                });
              }
              // 预设的操作映射
              if (isString(action)) {
                action = _this2.actionMap[action];
                if (!action) {
                  return null;
                }
              }
              // action 如果是数组 创建 更多 按钮列表
              if (isArray(action)) {
                return h("el-dropdown", {
                  props: {
                    trigger: "hover"
                    // size: "mini"
                  },
                  on: {
                    command: function command(e) {
                      _this2.$emit("action", e, scope);
                    }
                  },
                  style: {
                    right: "auto",
                    "margin-left": "10px"
                  }
                }, [h("span", {
                  "class": "el-dropdown-link",
                  style: "margin-left: 0"
                }, ["更多", h("i", {
                  "class": "el-icon-arrow-down el-icon--right"
                })]), h("el-dropdown-menu", {
                  slot: "dropdown"
                }, action.map(function (item) {
                  var _item = item;
                  // 预设的操作映射
                  if (isString(_item)) {
                    _item = _this2.actionMap[_item];
                    if (!_item) {
                      return null;
                    }
                  }
                  return h("el-dropdown-item", {
                    props: {
                      command: _item.action,
                      icon: _item.icon,
                      disabled: _item.disabled
                    }
                  }, _item.label);
                }))]);
              }

              // 渲染 action 按钮
              return h("el-button", {
                props: {
                  type: action.type || "text",
                  size: action.size || "mini",
                  icon: action.icon || "",
                  disabled: action.disabled || false
                },
                on: {
                  click: function click(e) {
                    _this2.$emit("action", action.action, scope);
                  }
                }
              }, action.label);
            }).filter(function (item) {
              return item;
            });
          }
        }
      }, []);
    }
  },
  // 动态渲染函数，根据列配置渲染 el-table-column
  render: function render(h) {
    var _this3 = this;
    if (this.column.hidden) {
      if (typeof this.column.hidden === "function") {
        // 如果 hidden 是函数，则调用函数判断是否隐藏
        if (this.column.hidden(this.column)) {
          return null;
        }
      }
    }
    if (this.column.visible === false) {
      return null;
    }
    if (this.column.type === "selection" || this.column.type === "index") {
      // 对于 selection 类型，直接传递 props 让 Element 内部处理选中状态
      return this.renderSelection(h);
    } else if (this.column.type === "action") {
      // 对于 action 类型，渲染操作列
      return this.renderActions(h);
    }
    return h("el-table-column", {
      key: this.columnKey,
      props: Object.assign({}, this.columnProps, {
        index: this.indexMethod
      }),
      scopedSlots: {
        // 自定义表头渲染：支持 slot 覆盖默认表头
        header: function header(scope) {
          return _this3.$scopedSlots["header-" + _this3.column.prop] ? _this3.$scopedSlots["header-" + _this3.column.prop](scope) : scope.column.label;
        },
        // 自定义单元格渲染：支持 slot、组件、格式化函数或字典
        "default": function _default(scope) {
          var content;
          // 检查是否有自定义 slot 渲染
          if (_this3.$scopedSlots["column-" + _this3.column.prop]) {
            content = _this3.$scopedSlots["column-" + _this3.column.prop]({
              scope: scope,
              column: _this3.column
            });
          } else if (_this3.column.component) {
            // 通过 renderNode 调用渲染组件，确保 this 指向当前实例
            content = _this3.renderNode(_this3.column.component, {
              prop: _this3.column.prop,
              scope: scope
            });
          } else if (_this3.column.formatter) {
            content = _this3.column.formatter(scope.row, scope.column, scope.row[_this3.column.prop], scope.$index);
          } else if (_this3.column.dict) {
            var dictItem = _this3.getDict(scope.row[_this3.column.prop]);
            if (dictItem !== null && dictItem !== void 0 && dictItem.label) {
              content = h("el-tag", {
                props: {
                  size: "mini",
                  disableTransitions: true,
                  type: dictItem.type
                  // effect: "dark"
                }
              }, dictItem.label);
            } else {
              content = scope.row[_this3.column.prop];
            }
          } else if (_this3.isNull(scope.row[_this3.column.prop])) {
            content = scope.emptyText;
          } else {
            content = scope.row[_this3.column.prop];
          }
          return content;
        }
      }
    },
    // 若有子列则递归渲染
    this.hasChildren ? this.column.children.map(function (child, idx) {
      return h(TableColumn, {
        key: idx,
        props: {
          column: child,
          indexMethod: _this3.indexMethod
        },
        on: _this3.$listeners
      });
    }) : []);
  }
};

// 支持自身递归调用（递归组件）
TableColumn.components = {
  TableColumn: TableColumn
};

//
//
//
//
//
//
//
//
//

var script$4 = {
  name: "CrudTable",
  components: {
    CrudTableColumn: TableColumn
  },
  inject: ["crud"],
  props: {
    columns: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    on: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },
    data: {
      type: Array,
      "default": function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      emit: {},
      defaultProps: {
        stripe: true,
        size: "mini"
      }
    };
  },
  computed: {
    // 将外部传入的 props 与 crud 内部样式合并
    combinedProps: function combinedProps() {
      return Object.assign({}, this.defaultProps, this.$attrs);
    },
    // 将各事件处理函数合并，包括 emit 与 on 上的回调
    combinedEvents: function combinedEvents() {
      return Object.assign({}, {
        "selection-change": this.onSelectionChange,
        "sort-change": this.onSortChange,
        "row-contextmenu": this.onRowContextMenu
      }, this.emit, this.on);
    },
    baseIndex: function baseIndex() {
      var _this$crud;
      if ((_this$crud = this.crud) !== null && _this$crud !== void 0 && _this$crud.pagination) {
        var _this$crud2, _this$crud3;
        return (((_this$crud2 = this.crud) === null || _this$crud2 === void 0 || (_this$crud2 = _this$crud2.pagination) === null || _this$crud2 === void 0 ? void 0 : _this$crud2.pageNum) - 1) * ((_this$crud3 = this.crud) === null || _this$crud3 === void 0 || (_this$crud3 = _this$crud3.pagination) === null || _this$crud3 === void 0 ? void 0 : _this$crud3.pageSize);
      } else {
        return 0;
      }
    }
  },
  mounted: function mounted() {
    this.bindEmits();
    this.bindMethods();
  },
  methods: {
    // 绑定 el-table 回调
    bindEmits: function bindEmits() {
      var _this = this;
      var emits = ["select", "select-all", "cell-mouse-enter", "cell-mouse-leave", "cell-click", "cell-dblclick", "row-click", "row-contextmenu", "row-dblclick", "header-click", "header-contextmenu", "filter-change", "current-change", "header-dragend", "expand-change"];
      emits.forEach(function (name) {
        _this.emit[name] = function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this.$emit.apply(_this, [name].concat(args));
        };
      });
    },
    // 绑定 el-table 事件
    bindMethods: function bindMethods() {
      var _this2 = this;
      var methods = ["clearSelection", "toggleRowSelection", "toggleAllSelection", "toggleRowExpansion", "setCurrentRow", "clearSort", "clearFilter", "doLayout", "sort"];
      methods.forEach(function (n) {
        _this2[n] = _this2.$refs["table"][n];
      });
    },
    onSelectionChange: function onSelectionChange(selection) {
      this.$emit("selection-change", selection);
    },
    onSortChange: function onSortChange(_ref) {
      var prop = _ref.prop,
        order = _ref.order;
      this.$emit("sort-change", {
        prop: prop,
        order: order
      });
    },
    onRowContextMenu: function onRowContextMenu(row, column, event) {
      this.$emit("row-contextmenu", row, column, event);
    },
    onRowAction: function onRowAction(action, scope) {
      this.$emit("row-action", action, scope);
      this.$emit("row-".concat(action), scope);
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
var __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("el-table", _vm._g(_vm._b({
    ref: "table",
    staticClass: "crud-table",
    attrs: {
      data: _vm.data
    }
  }, "el-table", _vm.combinedProps, false), _vm.combinedEvents), _vm._l(_vm.columns, function (column, index) {
    return !column["v-hasPermi"] || !column["v-hasPermi"].length || _vm.$auth.hasPermiOr(column["v-hasPermi"] || []) ? _c("crud-table-column", {
      key: "" + (column.key || "column_" + index),
      attrs: {
        indexMethod: function indexMethod(index) {
          return _vm.baseIndex + 1 + index;
        },
        column: column
      },
      on: {
        action: _vm.onRowAction
      }
    }) : _vm._e();
  }), 1);
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

/* style */
var __vue_inject_styles__$4 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-8bcd2094_0", {
    source: ".crud-table[data-v-8bcd2094] .el-table__body-wrapper .el-table__cell .cell:empty::after {\n  content: \"/\";\n  color: #c0c4cc;\n}\n\n/*# sourceMappingURL=table.vue.map */",
    map: {
      "version": 3,
      "sources": ["/Users/tonwe/git/el-crud-page/src/table.vue", "table.vue"],
      "names": [],
      "mappings": "AAsJA;EACA,YAAA;EACA,cAAA;ACrJA;;AAEA,oCAAoC",
      "file": "table.vue",
      "sourcesContent": ["<!-- crud table 组件 -->\n<template>\n    <el-table :data=\"data\" class=\"crud-table\" ref=\"table\" v-bind=\"combinedProps\" v-on=\"combinedEvents\">\n        <crud-table-column v-for=\"(column,index) in columns\" :key=\"`${ column.key || ('column_'+index) }`\" :indexMethod=\"(index)=>( baseIndex + 1 + index )\"\n            v-if=\"!column[`v-hasPermi`] || !column[`v-hasPermi`].length || $auth.hasPermiOr(column[`v-hasPermi`] || [])\"\n            :column=\"column\" @action=\"onRowAction\">\n        </crud-table-column>\n    </el-table>\n</template>\n<script>\n\n\n/**\n * CRUD table组件\n */\n\nimport CrudTableColumn from \"./tableColumn.js\";\n\nexport default {\n    name: \"CrudTable\",\n    components: {\n        CrudTableColumn\n    },\n    inject: [\"crud\"],\n    props: {\n        columns: {\n            type: Array,\n            default: () => []\n        },\n        on: {\n            type: Object,\n            default: () => {\n                return {};\n            }\n        },\n        data: {\n            type: Array,\n            default: () => {\n                return [];\n            }\n        }\n    },\n    data() {\n        return {\n            emit: {},\n            defaultProps: {\n                stripe: true,\n                size: \"mini\",\n            }\n        };\n    },\n    computed: {\n        // 将外部传入的 props 与 crud 内部样式合并\n        combinedProps() {\n            return Object.assign({}, this.defaultProps, this.$attrs);\n        },\n        // 将各事件处理函数合并，包括 emit 与 on 上的回调\n        combinedEvents() {\n            return Object.assign(\n                {},\n                {\n                    \"selection-change\": this.onSelectionChange,\n                    \"sort-change\": this.onSortChange,\n                    \"row-contextmenu\": this.onRowContextMenu\n                },\n                this.emit,\n                this.on\n            );\n        },\n        baseIndex(){\n            if( this.crud?.pagination ){\n                return (this.crud?.pagination?.pageNum-1) * this.crud?.pagination?.pageSize;\n            }else{\n                return 0;\n            }\n        }\n    },\n    mounted() {\n        this.bindEmits();\n        this.bindMethods();\n    },\n    methods: {\n        // 绑定 el-table 回调\n        bindEmits() {\n            const emits = [\n                \"select\",\n                \"select-all\",\n                \"cell-mouse-enter\",\n                \"cell-mouse-leave\",\n                \"cell-click\",\n                \"cell-dblclick\",\n                \"row-click\",\n                \"row-contextmenu\",\n                \"row-dblclick\",\n                \"header-click\",\n                \"header-contextmenu\",\n                \"filter-change\",\n                \"current-change\",\n                \"header-dragend\",\n                \"expand-change\"\n            ];\n\n            emits.forEach((name) => {\n                this.emit[name] = (...args) => {\n                    this.$emit(name, ...args);\n                };\n            });\n        },\n\n        // 绑定 el-table 事件\n        bindMethods() {\n            const methods = [\n                \"clearSelection\",\n                \"toggleRowSelection\",\n                \"toggleAllSelection\",\n                \"toggleRowExpansion\",\n                \"setCurrentRow\",\n                \"clearSort\",\n                \"clearFilter\",\n                \"doLayout\",\n                \"sort\"\n            ];\n\n            methods.forEach((n) => {\n                this[n] = this.$refs[\"table\"][n];\n            });\n        },\n        onSelectionChange(selection) {\n            this.$emit(\"selection-change\", selection);\n        },\n        onSortChange({ prop, order }) {\n            this.$emit(\"sort-change\", { prop, order });\n        },\n        onRowContextMenu(row, column, event) {\n            this.$emit(\"row-contextmenu\", row, column, event);\n        },\n        onRowAction(action, scope) {\n            this.$emit(\"row-action\", action, scope);\n            this.$emit(`row-${action}`, scope);\n        }\n    }\n\n}\n</script>\n\n<style scoped lang=\"scss\">\n.crud-table {\n    &::v-deep {\n        .el-table__body-wrapper {\n            .el-table__cell {\n                .cell:empty::after {\n                    content: '/';\n                    color: #c0c4cc;\n                }\n            }\n        }\n    }\n}\n</style>\n", ".crud-table::v-deep .el-table__body-wrapper .el-table__cell .cell:empty::after {\n  content: \"/\";\n  color: #c0c4cc;\n}\n\n/*# sourceMappingURL=table.vue.map */"]
    },
    media: undefined
  });
};
/* scoped */
var __vue_scope_id__$4 = "data-v-8bcd2094";
/* module identifier */
var __vue_module_identifier__$4 = undefined;
/* functional template */
var __vue_is_functional_template__$4 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$3 = {
  name: "RightToolbar",
  inject: ["crud"],
  data: function data() {
    return {
      // 显隐数据
      value: [],
      // 弹出层标题
      title: "显示/隐藏",
      // 是否显示弹出层
      open: false,
      // 本地列数据副本（用于拖拽）
      localColumns: []
    };
  },
  props: {
    /* 是否显示检索条件 */
    showSearch: {
      type: Boolean,
      "default": true
    },
    /* 显隐列信息 */
    columns: {
      type: Array
    },
    /* 是否显示检索图标 */
    search: {
      type: Boolean,
      "default": true
    },
    /* 显隐列类型（transfer穿梭框、checkbox复选框） */
    showColumnsType: {
      type: String,
      "default": "checkbox"
    },
    /* 右外边距 */
    gutter: {
      type: Number,
      "default": 10
    }
  },
  computed: {
    style: function style() {
      var ret = {};
      if (this.gutter) {
        ret.marginRight = "".concat(this.gutter / 2, "px");
      }
      return ret;
    }
  },
  watch: {
    columns: {
      handler: function handler(newVal) {
        // 当 columns prop 变化时，更新本地副本
        this.localColumns = newVal ? _toConsumableArray(newVal) : [];
      },
      immediate: true,
      deep: true
    }
  },
  created: function created() {
    if (this.showColumnsType == 'transfer') {
      // 显隐列初始默认隐藏列
      for (var item in this.columns) {
        if (this.columns[item].visible === false) {
          this.value.push(parseInt(item));
        }
      }
    }
  },
  methods: {
    // 搜索
    toggleSearch: function toggleSearch() {
      this.$emit("update:showSearch", !this.showSearch);
    },
    // 刷新
    refresh: function refresh() {
      this.$emit("queryTable");
    },
    // 右侧列表元素变化
    dataChange: function dataChange(data) {
      for (var item in this.columns) {
        var key = this.columns[item].key;
        this.columns[item].visible = !data.includes(key);
      }
    },
    // 打开显隐列dialog
    showColumn: function showColumn() {
      this.open = true;
    },
    // 勾选
    checkboxChange: function checkboxChange(event, item) {
      item.visible = event;
      // 通知父组件更新
      this.$emit('update:columns', this.localColumns);
    },
    // 拖拽结束
    onDragEnd: function onDragEnd(event) {
      // 拖拽结束后，通知父组件列顺序已改变
      this.$emit('update:columns', this.localColumns);
      this.$emit('columns-order-changed', this.localColumns);
    }
  }
};

/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    staticClass: "top-right-btn",
    style: _vm.style
  }, [_c("div", {
    staticClass: "flex flex-row items-center"
  }, [_vm.search ? _c("el-tooltip", {
    staticClass: "item",
    attrs: {
      effect: "dark",
      content: _vm.showSearch ? "隐藏搜索" : "显示搜索",
      placement: "top"
    }
  }, [_c("el-button", {
    attrs: {
      size: "mini",
      circle: "",
      icon: "el-icon-search"
    },
    on: {
      click: function click($event) {
        return _vm.toggleSearch();
      }
    }
  })], 1) : _vm._e(), _vm._v(" "), _c("el-tooltip", {
    staticClass: "item",
    attrs: {
      effect: "dark",
      content: "刷新",
      placement: "top"
    }
  }, [_c("el-button", {
    attrs: {
      size: "mini",
      circle: "",
      icon: "el-icon-refresh"
    },
    on: {
      click: function click($event) {
        return _vm.refresh();
      }
    }
  })], 1), _vm._v(" "), _vm.columns ? _c("el-tooltip", {
    staticClass: "item",
    attrs: {
      effect: "dark",
      content: "显隐列",
      placement: "top"
    }
  }, [_vm.showColumnsType == "transfer" ? _c("el-button", {
    attrs: {
      size: "mini",
      circle: "",
      icon: "el-icon-menu"
    },
    on: {
      click: function click($event) {
        return _vm.showColumn();
      }
    }
  }) : _vm._e(), _vm._v(" "), _vm.showColumnsType == "checkbox" ? _c("el-dropdown", {
    staticStyle: {
      "padding-left": "12px"
    },
    attrs: {
      trigger: "click",
      "hide-on-click": false
    }
  }, [_c("el-button", {
    attrs: {
      size: "mini",
      circle: "",
      icon: "el-icon-menu"
    }
  }), _vm._v(" "), _c("el-dropdown-menu", {
    attrs: {
      slot: "dropdown"
    },
    slot: "dropdown"
  }, [_vm._l(_vm.columns, function (item) {
    return item.type != "index" && item.type != "selection" && typeof item.visible !== "undefined" ? _c("el-dropdown-item", {
      key: item.key
    }, [_c("el-checkbox", {
      attrs: {
        checked: item.visible,
        label: item.label
      },
      on: {
        change: function change($event) {
          return _vm.checkboxChange($event, item);
        }
      }
    })], 1) : _vm._e();
  })], 2)], 1) : _vm._e()], 1) : _vm._e()], 1), _vm._v(" "), _c("el-dialog", {
    attrs: {
      title: _vm.title,
      visible: _vm.open,
      "append-to-body": ""
    },
    on: {
      "update:visible": function updateVisible($event) {
        _vm.open = $event;
      }
    }
  }, [_c("el-transfer", {
    attrs: {
      titles: ["显示", "隐藏"],
      data: _vm.columns
    },
    on: {
      change: _vm.dataChange
    },
    model: {
      value: _vm.value,
      callback: function callback($$v) {
        _vm.value = $$v;
      },
      expression: "value"
    }
  })], 1)], 1);
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

/* style */
var __vue_inject_styles__$3 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-d5778a5c_0", {
    source: "[data-v-d5778a5c] .el-transfer__button {\n  border-radius: 50%;\n  padding: 12px;\n  display: block;\n  margin-left: 0px;\n}\n[data-v-d5778a5c] .el-transfer__button:first-child {\n  margin-bottom: 10px;\n}\n.drag-item[data-v-d5778a5c] {\n  padding: 8px;\n  cursor: move;\n  border-bottom: 1px solid #ebeef5;\n  display: flex;\n  align-items: center;\n}\n.drag-item[data-v-d5778a5c]:hover {\n  background-color: #f5f7fa;\n}\n.drag-handle[data-v-d5778a5c] {\n  color: #909399;\n}\n.drag-handle[data-v-d5778a5c]:hover {\n  color: #409eff;\n}\n\n/*# sourceMappingURL=rightToolbar.vue.map */",
    map: {
      "version": 3,
      "sources": ["/Users/tonwe/git/el-crud-page/src/rightToolbar.vue", "rightToolbar.vue"],
      "names": [],
      "mappings": "AA4IA;EACA,kBAAA;EACA,aAAA;EACA,cAAA;EACA,gBAAA;AC3IA;AD6IA;EACA,mBAAA;AC1IA;AD6IA;EACA,YAAA;EACA,YAAA;EACA,gCAAA;EACA,aAAA;EACA,mBAAA;AC1IA;AD4IA;EACA,yBAAA;AC1IA;AD8IA;EACA,cAAA;AC3IA;AD6IA;EACA,cAAA;AC3IA;;AAEA,2CAA2C",
      "file": "rightToolbar.vue",
      "sourcesContent": ["<template>\n    <div class=\"top-right-btn\" :style=\"style\">\n      <div class=\"flex flex-row items-center\">\n        <el-tooltip class=\"item\" effect=\"dark\" :content=\"showSearch ? '隐藏搜索' : '显示搜索'\" placement=\"top\" v-if=\"search\">\n          <el-button size=\"mini\" circle icon=\"el-icon-search\" @click=\"toggleSearch()\" />\n        </el-tooltip>\n        <el-tooltip class=\"item\" effect=\"dark\" content=\"刷新\" placement=\"top\">\n          <el-button size=\"mini\" circle icon=\"el-icon-refresh\" @click=\"refresh()\" />\n        </el-tooltip>\n        <el-tooltip class=\"item\" effect=\"dark\" content=\"显隐列\" placement=\"top\" v-if=\"columns\">\n          <el-button size=\"mini\" circle icon=\"el-icon-menu\" @click=\"showColumn()\" v-if=\"showColumnsType == 'transfer'\"/>\n          <el-dropdown trigger=\"click\" :hide-on-click=\"false\" style=\"padding-left: 12px\" v-if=\"showColumnsType == 'checkbox'\">\n            <el-button size=\"mini\" circle icon=\"el-icon-menu\" />\n            <el-dropdown-menu slot=\"dropdown\">\n              <template >\n                <el-dropdown-item v-for=\"item in columns\" :key=\"item.key\" v-if=\"item.type!=`index` && item.type!=`selection` && (typeof item.visible) !== `undefined` \">\n                  <el-checkbox :checked=\"item.visible\" @change=\"checkboxChange($event, item)\" :label=\"item.label\" />\n                </el-dropdown-item>\n              </template>\n            </el-dropdown-menu>\n          </el-dropdown>\n        </el-tooltip>\n      </div>\n      <el-dialog :title=\"title\" :visible.sync=\"open\" append-to-body>\n        <el-transfer\n          :titles=\"['显示', '隐藏']\"\n          v-model=\"value\"\n          :data=\"columns\"\n          @change=\"dataChange\"\n        ></el-transfer>\n      </el-dialog>\n    </div>\n  </template>\n  <script>\n  export default {\n    name: \"RightToolbar\",\n    inject: [\"crud\"],\n    data() {\n      return {\n        // 显隐数据\n        value: [],\n        // 弹出层标题\n        title: \"显示/隐藏\",\n        // 是否显示弹出层\n        open: false,\n        // 本地列数据副本（用于拖拽）\n        localColumns: [],\n      };\n    },\n    props: {\n      /* 是否显示检索条件 */\n      showSearch: {\n        type: Boolean,\n        default: true,\n      },\n      /* 显隐列信息 */\n      columns: {\n        type: Array,\n      },\n      /* 是否显示检索图标 */\n      search: {\n        type: Boolean,\n        default: true,\n      },\n      /* 显隐列类型（transfer穿梭框、checkbox复选框） */\n      showColumnsType: {\n        type: String,\n        default: \"checkbox\",\n      },\n      /* 右外边距 */\n      gutter: {\n        type: Number,\n        default: 10,\n      },\n    },\n    computed: {\n      style() {\n        const ret = {};\n        if (this.gutter) {\n          ret.marginRight = `${this.gutter / 2}px`;\n        }\n        return ret;\n      }\n    },\n    watch: {\n      columns: {\n        handler(newVal) {\n          // 当 columns prop 变化时，更新本地副本\n          this.localColumns = newVal ? [...newVal] : [];\n        },\n        immediate: true,\n        deep: true\n      }\n    },\n    created() {\n      if (this.showColumnsType == 'transfer') {\n        // 显隐列初始默认隐藏列\n        for (let item in this.columns) {\n          if (this.columns[item].visible === false) {\n            this.value.push(parseInt(item));\n          }\n        }\n      }\n    },\n    methods: {\n      // 搜索\n      toggleSearch() {\n        this.$emit(\"update:showSearch\", !this.showSearch);\n      },\n      // 刷新\n      refresh() {\n        this.$emit(\"queryTable\");\n      },\n      // 右侧列表元素变化\n      dataChange(data) {\n        for (let item in this.columns) {\n          const key = this.columns[item].key;\n          this.columns[item].visible = !data.includes(key);\n        }\n      },\n      // 打开显隐列dialog\n      showColumn() {\n        this.open = true;\n      },\n      // 勾选\n      checkboxChange(event, item) {\n        item.visible = event;\n        // 通知父组件更新\n        this.$emit('update:columns', this.localColumns);\n      },\n      // 拖拽结束\n      onDragEnd(event) {\n        // 拖拽结束后，通知父组件列顺序已改变\n        this.$emit('update:columns', this.localColumns);\n        this.$emit('columns-order-changed', this.localColumns);\n      }\n    },\n  };\n  </script>\n  <style lang=\"scss\" scoped>\n  ::v-deep .el-transfer__button {\n    border-radius: 50%;\n    padding: 12px;\n    display: block;\n    margin-left: 0px;\n  }\n  ::v-deep .el-transfer__button:first-child {\n    margin-bottom: 10px;\n  }\n  \n  .drag-item {\n    padding: 8px;\n    cursor: move;\n    border-bottom: 1px solid #ebeef5;\n    display: flex;\n    align-items: center;\n    \n    &:hover {\n      background-color: #f5f7fa;\n    }\n  }\n  \n  .drag-handle {\n    color: #909399;\n    \n    &:hover {\n      color: #409eff;\n    }\n  }\n  \n  </style>\n  ", "::v-deep .el-transfer__button {\n  border-radius: 50%;\n  padding: 12px;\n  display: block;\n  margin-left: 0px;\n}\n\n::v-deep .el-transfer__button:first-child {\n  margin-bottom: 10px;\n}\n\n.drag-item {\n  padding: 8px;\n  cursor: move;\n  border-bottom: 1px solid #ebeef5;\n  display: flex;\n  align-items: center;\n}\n.drag-item:hover {\n  background-color: #f5f7fa;\n}\n\n.drag-handle {\n  color: #909399;\n}\n.drag-handle:hover {\n  color: #409eff;\n}\n\n/*# sourceMappingURL=rightToolbar.vue.map */"]
    },
    media: undefined
  });
};
/* scoped */
var __vue_scope_id__$3 = "data-v-d5778a5c";
/* module identifier */
var __vue_module_identifier__$3 = undefined;
/* functional template */
var __vue_is_functional_template__$3 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, createInjector, undefined, undefined);

var script$2 = {
  props: {
    // queryParams: {
    //     type: Object,
    //     required: true
    // },
    queryItems: {
      type: Array,
      required: true
    },
    size: {
      type: String,
      "default": 'mini'
    },
    labelWidth: {
      type: Number,
      "default": 80
    },
    inputWidth: {
      type: Number,
      "default": 200
    },
    lineClamp: {
      type: Number,
      "default": 1
    },
    inline: {
      type: Boolean,
      "default": true
    }
  },
  watch: {
    queryItems: {
      handler: function handler(val) {
        this.reset();
      },
      deep: true,
      immediate: true
    }
  },
  created: function created() {},
  data: function data() {
    return {
      queryParams: {},
      queryFormItems: [],
      formMaxHeight: 0,
      expand: false,
      needExpand: false,
      // 用于展示窗口大小变化绑定
      $_sidebarElm: null,
      $_resizeHandler: null
    };
  },
  computed: {
    labelWidthStr: function labelWidthStr() {
      if (typeof this.labelWidth === 'number') {
        return this.labelWidth + 'px';
      }
      return this.labelWidth + 'px';
    },
    inputStyle: function inputStyle() {
      return {
        width: this.inputWidth + 'px'
      };
    },
    dateRangeStyle: function dateRangeStyle() {
      return {
        width: this.inputWidth * 2 + this.labelWidth + 10 + 'px'
      };
    }
  },
  mounted: function mounted() {
    var _this = this;
    this.$nextTick(function () {
      _this.formMaxHeight = _this.measureHeight() * _this.lineClamp;
      // this.handleNeedExpand()
      _this.redraw();
      _this.bindResize();
      setTimeout(function () {
        _this.$_resizeHandler && _this.$_resizeHandler();
      }, 100);
    });
  },
  activated: function activated() {
    if (!this.$_resizeHandler) {
      this.bindResize();
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.unbindResize();
  },
  deactivated: function deactivated() {
    this.unbindResize();
  },
  methods: {
    $_sidebarResizeHandler: function $_sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.$_resizeHandler();
      }
    },
    // 展示窗口大小变化绑定
    bindResize: function bindResize() {
      var _this2 = this;
      this.$_resizeHandler = debounce(function () {
        _this2.drawTime = 0;
        _this2.queryFormItems.forEach(function (item) {
          item.hidden = false;
        });
        _this2.$nextTick(function () {
          _this2.handleNeedExpand();
          _this2.redraw();
        });
      }, 100);
      window.addEventListener('resize', this.$_resizeHandler);
      this.$_sidebarElm = document.getElementsByClassName('sidebar-container')[0];
      this.$_sidebarElm && this.$_sidebarElm.addEventListener('transitionend', this.$_sidebarResizeHandler);
    },
    // unbindResize 
    unbindResize: function unbindResize() {
      window.removeEventListener('resize', this.$_resizeHandler);
      this.$_resizeHandler = null;
      this.$_sidebarElm && this.$_sidebarElm.removeEventListener('transitionend', this.$_sidebarResizeHandler);
    },
    handelExpand: function handelExpand() {
      this.drawTime = 0;
      this.expand = !this.expand;
      this.$_resizeHandler();
    },
    handleNeedExpand: function handleNeedExpand() {
      var _this$$refs;
      var $queryForm = (_this$$refs = this.$refs) === null || _this$$refs === void 0 || (_this$$refs = _this$$refs.queryForm) === null || _this$$refs === void 0 ? void 0 : _this$$refs.$el;
      var scrollHeight = $queryForm.scrollHeight;
      if (this.formMaxHeight < scrollHeight) {
        this.needExpand = true;
      } else {
        this.needExpand = false;
      }
    },
    // 
    redraw: function redraw() {
      var _this$$refs2,
        _this3 = this;
      if (typeof this.drawTime == 'undefined') {
        this.drawTime = 0;
      }
      if (this.drawTime > 60) {
        return;
      }
      // 确保DOM完全渲染后再执行某些操作
      var $queryForm = (_this$$refs2 = this.$refs) === null || _this$$refs2 === void 0 || (_this$$refs2 = _this$$refs2.queryForm) === null || _this$$refs2 === void 0 ? void 0 : _this$$refs2.$el;
      if ($queryForm) {
        $queryForm.style.overflow = "hidden";
      }
      this.$nextTick(function () {
        var scrollHeight = $queryForm.scrollHeight;
        var clientHeight = $queryForm.clientHeight;
        if (scrollHeight > clientHeight) {
          _this3.drawTime++;
          var noHiddenItems = _this3.queryFormItems.filter(function (item) {
            return !item.hidden;
          });
          var lastItem = noHiddenItems.find(function (item, index) {
            return noHiddenItems.length - 1 == index;
          });
          if (lastItem) {
            _this3.$set(lastItem, 'hidden', true);
            _this3.redraw();
          }
        }
        // 判断是否有滚动条
      });
    },
    //测量单行高度 + margin-top + margin-bottom
    measureHeight: function measureHeight() {
      var queryFormBtn = this.$refs.queryFormBtn;
      if (queryFormBtn) {
        var queryFormBtnHeight = queryFormBtn.$el.clientHeight || 29;
        var queryFormItemsMarginTop = parseInt(window.getComputedStyle(queryFormBtn.$el).marginTop);
        var queryFormItemsMarginBottom = parseInt(window.getComputedStyle(queryFormBtn.$el).marginBottom);
        return queryFormBtnHeight + queryFormItemsMarginTop + queryFormItemsMarginBottom;
      }
    },
    reset: function reset() {
      var _this4 = this;
      this.queryItems.forEach(function (item) {
        _this4.$set(_this4.queryParams, item.prop, null);
      });
      this.queryFormItems = this.queryItems.map(function (item) {
        var placeholder = item.placeholder;
        if (!placeholder) {
          switch (item.type) {
            case 'input':
              placeholder = '请输入' + item.label;
              break;
            default:
              placeholder = '请选择' + item.label;
          }
        }
        return _objectSpread2(_objectSpread2({}, item), {}, {
          placeholder: placeholder,
          hidden: false
        });
      });
    },
    resetQuery: function resetQuery() {
      var _this$$refs$queryForm;
      (_this$$refs$queryForm = this.$refs.queryForm) === null || _this$$refs$queryForm === void 0 || _this$$refs$queryForm.resetFields();
      this.handleQuery();
    },
    handleQuery: function handleQuery() {
      this.$emit('queryTable', this.queryParams);
    }
  }
};

/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.queryItems.length ? _c("div", {
    staticClass: "container-main el-crud-query"
  }, [_c("el-form", {
    ref: "queryForm",
    staticClass: "el-crud-query-form",
    style: {
      maxHeight: _vm.expand ? "" : _vm.formMaxHeight + "px"
    },
    attrs: {
      model: _vm.queryParams,
      size: _vm.size,
      inline: _vm.inline,
      "label-width": _vm.labelWidthStr
    },
    nativeOn: {
      submit: function submit($event) {
        $event.preventDefault();
      }
    }
  }, [_vm._l(_vm.queryFormItems, function (item) {
    return _c("el-form-item", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.expand || !item.hidden,
        expression: "expand || !item.hidden"
      }],
      key: item.prop,
      attrs: {
        label: item.label,
        prop: item.prop
      }
    }, [item.type === "input" ? _c("el-input", {
      style: _vm.inputStyle,
      attrs: {
        placeholder: item.placeholder,
        clearable: ""
      },
      nativeOn: {
        keyup: function keyup($event) {
          if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) {
            return null;
          }
          return _vm.handleQuery($event);
        }
      },
      model: {
        value: _vm.queryParams[item.prop],
        callback: function callback($$v) {
          _vm.$set(_vm.queryParams, item.prop, $$v);
        },
        expression: "queryParams[item.prop]"
      }
    }) : item.type === "select" ? _c("el-select", {
      style: _vm.inputStyle,
      attrs: {
        placeholder: item.placeholder,
        clearable: "",
        filterable: ""
      },
      on: {
        "visible-change": function visibleChange($event) {
          return item.visibleChange && item.visibleChange($event, _vm.queryParams);
        }
      },
      model: {
        value: _vm.queryParams[item.prop],
        callback: function callback($$v) {
          _vm.$set(_vm.queryParams, item.prop, $$v);
        },
        expression: "queryParams[item.prop]"
      }
    }, [typeof item.options === "function" ? _vm._l(item.options(), function (option) {
      return _c("el-option", {
        key: option.value,
        attrs: {
          label: option.label,
          value: option.value
        }
      });
    }) : _vm._l(item.options, function (option) {
      return _c("el-option", {
        key: option.value,
        attrs: {
          label: option.label,
          value: option.value
        }
      });
    })], 2) : item.type === "date" ? _c("el-date-picker", {
      style: item.range ? _vm.dateRangeStyle : _vm.inputStyle,
      attrs: {
        type: item.range ? "daterange" : "date",
        placeholder: item.placeholder,
        clearable: "",
        "start-placeholder": item["startPlaceholder"] || "开始日期",
        "end-placeholder": item["endPlaceholder"] || "结束日期",
        "range-separator": item["rangeSeparator"],
        "value-format": item["valueFormat"] || "yyyy-MM-dd"
      },
      model: {
        value: _vm.queryParams[item.prop],
        callback: function callback($$v) {
          _vm.$set(_vm.queryParams, item.prop, $$v);
        },
        expression: "queryParams[item.prop]"
      }
    }) : item.type === "datetime" ? _c("el-date-picker", {
      style: item.range ? _vm.dateRangeStyle : _vm.inputStyle,
      attrs: {
        type: item.range ? "datetimerange" : "datetime",
        placeholder: item.placeholder,
        clearable: "",
        "start-placeholder": item["startPlaceholder"] || "开始时间",
        "end-placeholder": item["endPlaceholder"] || "结束时间",
        "range-separator": item["rangeSeparator"],
        "value-format": item["valueFormat"] || "yyyy-MM-dd HH:mm:ss"
      },
      model: {
        value: _vm.queryParams[item.prop],
        callback: function callback($$v) {
          _vm.$set(_vm.queryParams, item.prop, $$v);
        },
        expression: "queryParams[item.prop]"
      }
    }) : _vm._e()], 1);
  }), _vm._v(" "), _c("el-form-item", {
    ref: "queryFormBtn",
    attrs: {
      label: " "
    }
  }, [_c("el-button", {
    attrs: {
      type: "primary",
      icon: "el-icon-search"
    },
    on: {
      click: _vm.handleQuery
    }
  }, [_vm._v("搜索")]), _vm._v(" "), _c("el-button", {
    attrs: {
      icon: "el-icon-refresh"
    },
    on: {
      click: _vm.resetQuery
    }
  }, [_vm._v("重置")]), _vm._v(" "), _vm.needExpand ? _c("el-button", {
    attrs: {
      type: "text"
    },
    on: {
      click: _vm.handelExpand
    }
  }, [_c("span", [_vm._v("更多")]), _vm._v(" "), _c("i", {
    "class": _vm.expand ? "el-icon-arrow-up" : "el-icon-arrow-down"
  })]) : _vm._e()], 1)], 2)], 1) : _vm._e();
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

/* style */
var __vue_inject_styles__$2 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-ba1b80d0_0", {
    source: ".container-main[data-v-ba1b80d0] {\n  background-color: #fff;\n}\n.el-crud-query[data-v-ba1b80d0] {\n  overflow: hidden;\n  padding: 10px;\n}\n.el-crud-query .el-crud-query-form[data-v-ba1b80d0] {\n  margin-bottom: -10px;\n}\n.el-crud-query .el-crud-query-form[data-v-ba1b80d0] .el-form-item--mini.el-form-item, .el-crud-query .el-crud-query-form[data-v-ba1b80d0] .el-form-item--small.el-form-item {\n  margin-bottom: 10px;\n}\n\n/*# sourceMappingURL=queryForm.vue.map */",
    map: {
      "version": 3,
      "sources": ["/Users/tonwe/git/el-crud-page/src/queryForm.vue", "queryForm.vue"],
      "names": [],
      "mappings": "AAgUA;EACA,sBAAA;AC/TA;ADiUA;EACA,gBAAA;EACA,aAAA;AC9TA;AD+TA;EACA,oBAAA;AC7TA;ADgUA;EACA,mBAAA;AC9TA;;AAEA,wCAAwC",
      "file": "queryForm.vue",
      "sourcesContent": ["<template>\n    <!-- \n     \n    queryItems: [\n                // input string\n                {\n                    label: \"项目名称\",\n                    prop: \"name\",\n                    type: \"input\",\n                    placeholder: \"请输入项目名称\",\n                },\n                // select\n                {\n                    label: \"申办单位\",\n                    prop: \"sponsorId\",\n                    type: \"select\",\n                    placeholder: \"请选择申办单位\",\n                    options: [],\n                },\n                // date日期\n                {\n                    label: \"创建日期\",\n                    prop: [\"createDateStart\", \"createDateEnd\"],\n                    type: \"date\",\n                    range: true,\n                    placeholder: \"请选择创建日期\",\n                },\n                // datetime 时间\n                {\n                    label: \"更新时间\",\n                    prop: \"updateTime\",\n                    type: \"datetime\",\n                    placeholder: \"请选择更新时间\",\n                },\n            ],\n    \n    -->\n    <div class=\"container-main el-crud-query\" v-if=\"queryItems.length\">\n        <el-form :model=\"queryParams\" :size=\"size\" :style=\"{ maxHeight: expand ? '' : (formMaxHeight + 'px') }\"\n            ref=\"queryForm\" :inline=\"inline\" :label-width=\"labelWidthStr\" class=\"el-crud-query-form\" @submit.native.prevent>\n            <el-form-item v-for=\"item in queryFormItems\" v-show=\"expand || !item.hidden\" :label=\"item.label\"\n                :prop=\"item.prop\" :key=\"item.prop\">\n                <el-input v-if=\"item.type === 'input'\" v-model=\"queryParams[item.prop]\" :placeholder=\"item.placeholder\"\n                    clearable @keyup.enter.native=\"handleQuery\" :style=\"inputStyle\"></el-input>\n                <el-select v-else-if=\"item.type === 'select'\" v-model=\"queryParams[item.prop]\"\n                    :placeholder=\"item.placeholder\" clearable filterable\n                    @visible-change=\"($event) => item.visibleChange && item.visibleChange($event, queryParams)\"\n                    :style=\"inputStyle\">\n                    \n                    <template v-if=\"typeof item.options === 'function'\">\n                        <el-option v-for=\"option in item.options()\" :key=\"option.value\" :label=\"option.label\" :value=\"option.value\"></el-option>\n                    </template>\n                    <template v-else>\n                        <el-option v-for=\"option in item.options\" :key=\"option.value\" :label=\"option.label\" :value=\"option.value\"></el-option>\n                    </template>\n\n                </el-select>\n\n                <el-date-picker v-else-if=\"item.type === 'date'\" :type=\"item.range ? 'daterange' : 'date'\"\n                    v-model=\"queryParams[item.prop]\" :placeholder=\"item.placeholder\" clearable\n                    :start-placeholder=\"item['startPlaceholder'] || '开始日期'\"\n                    :end-placeholder=\"item['endPlaceholder'] || '结束日期'\" :range-separator=\"item['rangeSeparator']\"\n                    :value-format=\"item['valueFormat'] || 'yyyy-MM-dd'\"\n                    :style=\"item.range ? dateRangeStyle : inputStyle\"></el-date-picker>\n                <el-date-picker v-else-if=\"item.type === 'datetime'\" :type=\"item.range ? 'datetimerange' : 'datetime'\"\n                    v-model=\"queryParams[item.prop]\" :placeholder=\"item.placeholder\" clearable\n                    :start-placeholder=\"item['startPlaceholder'] || '开始时间'\"\n                    :end-placeholder=\"item['endPlaceholder'] || '结束时间'\" :range-separator=\"item['rangeSeparator']\"\n                    :value-format=\"item['valueFormat'] || 'yyyy-MM-dd HH:mm:ss'\"\n                    :style=\"item.range ? dateRangeStyle : inputStyle\"></el-date-picker>\n            </el-form-item>\n            <el-form-item label=\" \" ref=\"queryFormBtn\">\n                <el-button type=\"primary\" icon=\"el-icon-search\" @click=\"handleQuery\">搜索</el-button>\n                <el-button icon=\"el-icon-refresh\" @click=\"resetQuery\">重置</el-button>\n                <el-button type=\"text\" @click=\"handelExpand\" v-if=\"needExpand\">\n                    <span>更多</span>\n                    <i :class=\"expand ? 'el-icon-arrow-up' : 'el-icon-arrow-down'\"></i>\n                </el-button>\n            </el-form-item>\n        </el-form>\n    </div>\n\n</template>\n\n<script>\n\nimport { debounce } from './utils'\nexport default {\n    props: {\n\n        // queryParams: {\n        //     type: Object,\n        //     required: true\n        // },\n        queryItems: {\n            type: Array,\n            required: true\n        },\n        size: {\n            type: String,\n            default: 'mini'\n        },\n        labelWidth: {\n            type: Number,\n            default: 80\n        },\n        inputWidth: {\n            type: Number,\n            default: 200\n        },\n        lineClamp: {\n            type: Number,\n            default: 1\n        },\n        inline: {\n            type: Boolean,\n            default: true\n        }\n\n    },\n    watch: {\n        queryItems: {\n            handler(val) {\n                this.reset()\n            },\n            deep: true,\n            immediate: true\n        }\n    },\n    created() {\n         \n    },\n    data() {\n        return {\n            queryParams: {},\n            queryFormItems: [],\n            formMaxHeight: 0,\n            expand: false,\n            needExpand: false,\n            // 用于展示窗口大小变化绑定\n            $_sidebarElm: null,\n            $_resizeHandler: null\n        }\n    },\n    computed: {\n        labelWidthStr() {\n            if (typeof this.labelWidth === 'number') {\n                return this.labelWidth + 'px';\n            }\n            return this.labelWidth + 'px';\n        },\n        inputStyle() {\n            return {\n                width: this.inputWidth + 'px'\n            };\n        },\n        dateRangeStyle() {\n            return {\n                width: (this.inputWidth * 2 + this.labelWidth + 10) + 'px'\n            };\n        }\n    },\n    mounted() {\n        this.$nextTick(() => {\n            this.formMaxHeight = this.measureHeight() * this.lineClamp; \n            // this.handleNeedExpand()\n            this.redraw();\n            this.bindResize();\n            setTimeout(() => {\n                this.$_resizeHandler && this.$_resizeHandler();\n            }, 100);\n            \n        });\n\n    },\n    activated() {\n        if (!this.$_resizeHandler) {\n            this.bindResize();\n        }\n    },\n    beforeDestroy() {\n        this.unbindResize();\n    },\n    deactivated() {\n        this.unbindResize();\n    },\n    methods: {\n        $_sidebarResizeHandler(e) {\n            if (e.propertyName === 'width') {\n                this.$_resizeHandler()\n            }\n        },\n        // 展示窗口大小变化绑定\n        bindResize() {\n            this.$_resizeHandler = debounce(() => {\n                this.drawTime = 0;\n                this.queryFormItems.forEach(item => {\n                    item.hidden = false;\n                });\n                this.$nextTick(() => {\n                    this.handleNeedExpand()\n                    this.redraw();\n                })\n\n            }, 100)\n\n            window.addEventListener('resize', this.$_resizeHandler);\n            this.$_sidebarElm = document.getElementsByClassName('sidebar-container')[0]\n            this.$_sidebarElm && this.$_sidebarElm.addEventListener('transitionend', this.$_sidebarResizeHandler)\n\n\n        },\n        // unbindResize \n        unbindResize() {\n            window.removeEventListener('resize', this.$_resizeHandler)\n            this.$_resizeHandler = null\n            this.$_sidebarElm && this.$_sidebarElm.removeEventListener('transitionend', this.$_sidebarResizeHandler)\n        },\n        handelExpand() {\n            this.drawTime = 0;\n            this.expand = !this.expand;\n            this.$_resizeHandler();\n\n        },\n        handleNeedExpand() {\n            const $queryForm = this.$refs?.queryForm?.$el;\n            let scrollHeight = $queryForm.scrollHeight;\n            if ( this.formMaxHeight < scrollHeight) {\n                this.needExpand = true;\n            } else {\n                this.needExpand = false;\n            }\n\n        },\n        // \n        redraw() {\n            if (typeof this.drawTime == 'undefined') {\n                this.drawTime = 0;\n            }\n            if (this.drawTime > 60) {\n                return;\n            }\n            // 确保DOM完全渲染后再执行某些操作\n            const $queryForm = this.$refs?.queryForm?.$el;\n            if ($queryForm) {\n                $queryForm.style.overflow = \"hidden\";\n            }\n            this.$nextTick(() => {\n                let scrollHeight = $queryForm.scrollHeight;\n                let clientHeight = $queryForm.clientHeight;\n                if (scrollHeight > clientHeight) {\n                    this.drawTime++;\n                    let noHiddenItems = this.queryFormItems.filter(item => !item.hidden);\n                    let lastItem = noHiddenItems.find((item, index) => (noHiddenItems.length - 1 == index))\n                    if (lastItem) {\n                        this.$set(lastItem, 'hidden', true);\n                        this.redraw();\n                    }\n\n                }\n                // 判断是否有滚动条\n\n            });\n\n\n        },\n\n        //测量单行高度 + margin-top + margin-bottom\n        measureHeight() {\n            let queryFormBtn = this.$refs.queryFormBtn;\n            if(queryFormBtn){\n                let queryFormBtnHeight = queryFormBtn.$el.clientHeight || 29;\n                let queryFormItemsMarginTop = parseInt(window.getComputedStyle(queryFormBtn.$el).marginTop);\n                let queryFormItemsMarginBottom = parseInt(window.getComputedStyle(queryFormBtn.$el).marginBottom);\n                return queryFormBtnHeight + queryFormItemsMarginTop + queryFormItemsMarginBottom\n            }\n            \n        },\n\n        reset() {\n            this.queryItems.forEach(item => {\n                this.$set(this.queryParams, item.prop, null);\n            });\n            this.queryFormItems = this.queryItems.map(item => {\n                let placeholder = item.placeholder;\n                if( !placeholder){\n\n                    switch (item.type) {\n                        case 'input':\n                            placeholder = '请输入' + item.label;\n                            break;\n                        default:\n                            placeholder = '请选择' + item.label;\n                    }\n\n                }\n\n\n                return {\n                    ...item,\n                    placeholder,\n                    hidden: false\n                }\n            }); \n        },\n        resetQuery() {\n\n            this.$refs.queryForm?.resetFields();\n            this.handleQuery();\n        },\n        handleQuery() {\n            this.$emit('queryTable', this.queryParams);\n        }\n\n    }\n}\n\n</script>\n\n<style scoped lang=\"scss\">\n.container-main{\n    background-color: #fff;\n}\n.el-crud-query{\n    overflow: hidden;\n    padding: 10px;\n    .el-crud-query-form {\n        margin-bottom: -10px;\n\n        &::v-deep {\n            .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{\n                margin-bottom: 10px;\n            }\n        }\n    }\n}\n\n\n</style>\n", ".container-main {\n  background-color: #fff;\n}\n\n.el-crud-query {\n  overflow: hidden;\n  padding: 10px;\n}\n.el-crud-query .el-crud-query-form {\n  margin-bottom: -10px;\n}\n.el-crud-query .el-crud-query-form::v-deep .el-form-item--mini.el-form-item, .el-crud-query .el-crud-query-form::v-deep .el-form-item--small.el-form-item {\n  margin-bottom: 10px;\n}\n\n/*# sourceMappingURL=queryForm.vue.map */"]
    },
    media: undefined
  });
};
/* scoped */
var __vue_scope_id__$2 = "data-v-ba1b80d0";
/* module identifier */
var __vue_module_identifier__$2 = undefined;
/* functional template */
var __vue_is_functional_template__$2 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, createInjector, undefined, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$1 = {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      "default": 1
    },
    limit: {
      type: Number,
      "default": 20
    },
    pageSizes: {
      type: Array,
      "default": function _default() {
        return [10, 20, 30, 50];
      }
    },
    // 移动端页码按钮的数量端默认值5
    pagerCount: {
      type: Number,
      "default": document.body.clientWidth < 992 ? 5 : 7
    },
    layout: {
      type: String,
      "default": 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      "default": true
    },
    autoScroll: {
      type: Boolean,
      "default": true
    },
    hidden: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {};
  },
  computed: {
    currentPage: {
      get: function get() {
        return this.page;
      },
      set: function set(val) {
        this.$emit('update:page', val);
      }
    },
    pageSize: {
      get: function get() {
        return this.limit;
      },
      set: function set(val) {
        this.$emit('update:limit', val);
      }
    }
  },
  methods: {
    handleSizeChange: function handleSizeChange(val) {
      if (this.currentPage * val > this.total) {
        this.currentPage = 1;
      }
      this.$emit('pagination', {
        page: this.currentPage,
        limit: val
      });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
    handleCurrentChange: function handleCurrentChange(val) {
      this.$emit('pagination', {
        page: val,
        limit: this.pageSize
      });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    }
  }
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    staticClass: "pagination-container",
    "class": {
      hidden: _vm.hidden
    }
  }, [_c("el-pagination", _vm._b({
    attrs: {
      background: _vm.background,
      "current-page": _vm.currentPage,
      "page-size": _vm.pageSize,
      layout: _vm.layout,
      "page-sizes": _vm.pageSizes,
      "pager-count": _vm.pagerCount,
      total: _vm.total
    },
    on: {
      "update:currentPage": function updateCurrentPage($event) {
        _vm.currentPage = $event;
      },
      "update:current-page": function updateCurrentPage($event) {
        _vm.currentPage = $event;
      },
      "update:pageSize": function updatePageSize($event) {
        _vm.pageSize = $event;
      },
      "update:page-size": function updatePageSize($event) {
        _vm.pageSize = $event;
      },
      "size-change": _vm.handleSizeChange,
      "current-change": _vm.handleCurrentChange
    }
  }, "el-pagination", _vm.$attrs, false))], 1);
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

/* style */
var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-7ec7699b_0", {
    source: "\n.pagination-container[data-v-7ec7699b] {\n  background: #fff;\n  padding: 32px 16px;\n}\n.pagination-container.hidden[data-v-7ec7699b] {\n  display: none;\n}\n",
    map: {
      "version": 3,
      "sources": ["/Users/tonwe/git/el-crud-page/src/pagination.vue"],
      "names": [],
      "mappings": ";AA0GA;EACA,gBAAA;EACA,kBAAA;AACA;AACA;EACA,aAAA;AACA",
      "file": "pagination.vue",
      "sourcesContent": ["<template>\n  <div :class=\"{'hidden':hidden}\" class=\"pagination-container\">\n    <el-pagination\n      :background=\"background\"\n      :current-page.sync=\"currentPage\"\n      :page-size.sync=\"pageSize\"\n      :layout=\"layout\"\n      :page-sizes=\"pageSizes\"\n      :pager-count=\"pagerCount\"\n      :total=\"total\"\n      v-bind=\"$attrs\"\n      @size-change=\"handleSizeChange\"\n      @current-change=\"handleCurrentChange\"\n    />\n  </div>\n</template>\n\n<script>\nimport { scrollTo } from './utils/scroll-to'\n\nexport default {\n  name: 'Pagination',\n  props: {\n    total: {\n      required: true,\n      type: Number\n    },\n    page: {\n      type: Number,\n      default: 1\n    },\n    limit: {\n      type: Number,\n      default: 20\n    },\n    pageSizes: {\n      type: Array,\n      default() {\n        return [10, 20, 30, 50]\n      }\n    },\n    // 移动端页码按钮的数量端默认值5\n    pagerCount: {\n      type: Number,\n      default: document.body.clientWidth < 992 ? 5 : 7\n    },\n    layout: {\n      type: String,\n      default: 'total, sizes, prev, pager, next, jumper'\n    },\n    background: {\n      type: Boolean,\n      default: true\n    },\n    autoScroll: {\n      type: Boolean,\n      default: true\n    },\n    hidden: {\n      type: Boolean,\n      default: false\n    }\n  },\n  data() {\n    return {\n    };\n  },\n  computed: {\n    currentPage: {\n      get() {\n        return this.page\n      },\n      set(val) {\n        this.$emit('update:page', val)\n      }\n    },\n    pageSize: {\n      get() {\n        return this.limit\n      },\n      set(val) {\n        this.$emit('update:limit', val)\n      }\n    }\n  },\n  methods: {\n    handleSizeChange(val) {\n      if (this.currentPage * val > this.total) {\n        this.currentPage = 1\n      }\n      this.$emit('pagination', { page: this.currentPage, limit: val })\n      if (this.autoScroll) {\n        scrollTo(0, 800)\n      }\n    },\n    handleCurrentChange(val) {\n      this.$emit('pagination', { page: val, limit: this.pageSize })\n      if (this.autoScroll) {\n        scrollTo(0, 800)\n      }\n    }\n  }\n}\n</script>\n\n<style scoped>\n.pagination-container {\n  background: #fff;\n  padding: 32px 16px;\n}\n.pagination-container.hidden {\n  display: none;\n}\n</style>\n"]
    },
    media: undefined
  });
};
/* scoped */
var __vue_scope_id__$1 = "data-v-7ec7699b";
/* module identifier */
var __vue_module_identifier__$1 = undefined;
/* functional template */
var __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

var script = {
  components: {
    CrudTable: __vue_component__$4,
    RightToolbar: __vue_component__$3,
    QueryForm: __vue_component__$2,
    Pagination: __vue_component__$1
  },
  name: 'Crud',
  provide: function provide() {
    return {
      crud: this
    };
  },
  props: {
    queryParamsMethod: {
      type: Function
    },
    columns: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    queryItems: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    queryLineClamp: {
      type: Number,
      "default": 1
    },
    queryLabelWidth: {
      type: Number,
      "default": 80
    },
    queryInputWidth: {
      type: Number,
      "default": 210
    },
    queryInline: {
      type: Boolean,
      "default": true
    },
    buttons: {
      type: Array | Function,
      "default": function _default() {
        return [];
      }
    },
    tabPanes: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    defaultSort: {
      type: Object,
      "default": function _default() {
        return {
          prop: undefined,
          order: undefined
        };
      }
    },
    highlightCol: {
      type: Boolean,
      "default": false
    },
    resizable: {
      type: Boolean,
      "default": false
    },
    border: {
      type: Boolean,
      "default": false
    }
  },
  watch: {
    tabPanes: {
      handler: function handler(val) {
        if (val.length) {
          this.tabQuery.tabKey = val[0].name;
        }
      },
      deep: true,
      immediate: true
    },
    "tabQuery.tabKey": {
      handler: function handler(val) {
        this.$emit("tabChange", val);
      }
    }
  },
  computed: {
    actionButtons: function actionButtons() {
      var buts = this.buttons;
      if (typeof buts === 'function') {
        return buts(this.selections);
      } else if (buts !== null && buts !== void 0 && buts.length) {
        return buts;
      }
      return [];
    }
  },
  data: function data() {
    return {
      listLoading: false,
      showSearch: true,
      selections: [],
      data: [],
      service: {
        // 增删改查导出
        add: null,
        update: null,
        "delete": null,
        page: null,
        info: null,
        list: null,
        "export": null
      },
      // 服务
      queryParams: {
        // pageNum: 1,
        // pageSize: 10
      },
      // 查询参数

      tabQuery: {
        tabKey: undefined
      },
      // 参数
      filterParams: {},
      // 过滤参数
      pagination: {
        pageNum: 1,
        pageSize: 10
      },
      orderParams: {
        orderByRowName: undefined,
        orderByRule: undefined
      },
      total: 0
    };
  },
  created: function created() {},
  methods: {
    handleTabClick: function handleTabClick(tab) {
      this.tabQuery.tabKey = tab.name;
      this.refresh();
    },
    handleSelectionChange: function handleSelectionChange(e) {
      this.selections = e;
    },
    handleQuery: function handleQuery(query) {
      this.queryParams = query;
      this.refresh();
    },
    handleButtonClick: function handleButtonClick(item) {
      this.$emit("action", item.action, this.selections);
    },
    handleRowAction: function handleRowAction(action, scope) {
      this.$emit("row-action", action, scope);
      if (action === 'delete' && this.service["delete"]) {
        this["delete"](scope);
      }
    },
    handleSortChange: function handleSortChange(column) {
      this.orderParams.orderByRowName = toLine(column.prop);
      if (column.order == "descending") {
        this.orderParams.orderByRule = "desc";
      } else if (column.order == "ascending") {
        this.orderParams.orderByRule = "asc";
      } else {
        this.orderParams.orderByRule = undefined;
        this.orderParams.orderByRowName = undefined;
      }
      this.refresh();
    },
    // 服务
    setService: function setService(service) {
      this.service = Object.assign(this.service, service);
    },
    // 设置列
    setColumns: function setColumns(columns) {
      this.columns = columns;
    },
    // 设置数据
    setData: function setData(data) {
      // this.crud.data = data;
    },
    // 获得查询参数
    getParams: function getParams() {
      var _this = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _orderParams;
        var defaultSort, orderParams, orderByRowName, orderByRule, params;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              defaultSort = _this.defaultSort;
              orderParams = _this.orderParams;
              if (!((_orderParams = orderParams) !== null && _orderParams !== void 0 && _orderParams.orderByRowName) && defaultSort !== null && defaultSort !== void 0 && defaultSort.prop) {
                orderByRowName = toLine(defaultSort.prop);
                orderByRule = defaultSort.order;
                if (defaultSort.order == "descending") {
                  orderByRule = "desc";
                } else if (defaultSort.order == "ascending") {
                  orderByRule = "asc";
                }
                orderParams = {
                  orderByRowName: orderByRowName,
                  orderByRule: orderByRule
                };
              }
              params = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, _this.queryParams), _this.pagination), _this.tabQuery), orderParams);
              if (!_this.queryParamsMethod) {
                _context.n = 2;
                break;
              }
              _context.n = 1;
              return _this.queryParamsMethod(params);
            case 1:
              return _context.a(2, _context.v);
            case 2:
              return _context.a(2, params);
          }
        }, _callee);
      }))();
    },
    // 刷新列表数据
    refresh: function refresh() {
      var _this2 = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
        var queryParams, _yield$_this2$service, code, rows, total, _t;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _this2.listLoading = true;
              _context2.p = 1;
              _context2.n = 2;
              return _this2.getParams();
            case 2:
              queryParams = _context2.v;
              _context2.n = 3;
              return _this2.service.page(queryParams);
            case 3:
              _yield$_this2$service = _context2.v;
              code = _yield$_this2$service.code;
              rows = _yield$_this2$service.rows;
              total = _yield$_this2$service.total;
              if (code === 200) {
                _this2.data = rows;
                _this2.total = total;
              }
              _context2.n = 5;
              break;
            case 4:
              _context2.p = 4;
              _t = _context2.v;
              console.log(_t);
            case 5:
              _this2.listLoading = false;
            case 6:
              return _context2.a(2);
          }
        }, _callee2, null, [[1, 4]]);
      }))();
    },
    // 删除
    "delete": function _delete(_ref) {
      var _this3 = this;
      return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        var row, id, _yield$_this3$service, code, _t2;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              row = _ref.row;
              _context3.p = 1;
              id = row === null || row === void 0 ? void 0 : row.id;
              _context3.n = 2;
              return _this3.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              });
            case 2:
              _context3.n = 3;
              return _this3.service["delete"](id);
            case 3:
              _yield$_this3$service = _context3.v;
              code = _yield$_this3$service.code;
              if (code === 200) {
                _this3.refresh();
                _this3.$message({
                  type: 'success',
                  message: '操作成功!'
                });
              }
              _context3.n = 5;
              break;
            case 4:
              _context3.p = 4;
              _t2 = _context3.v;
              console.log(_t2);
            case 5:
              return _context3.a(2);
          }
        }, _callee3, null, [[1, 4]]);
      }))();
    }
  }
};

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    staticClass: "el-crud"
  }, [_vm._t("query", [_vm.queryItems && _vm.queryItems.length ? _c("query-form", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.showSearch,
      expression: "showSearch"
    }],
    attrs: {
      queryItems: _vm.queryItems,
      lineClamp: _vm.queryLineClamp,
      "label-width": _vm.queryLabelWidth,
      "input-width": _vm.queryInputWidth,
      inline: _vm.queryInline
    },
    on: {
      queryTable: _vm.handleQuery
    }
  }) : _vm._e()], {
    queryItems: _vm.queryItems,
    lineClamp: _vm.queryLineClamp,
    labelWidth: _vm.queryLabelWidth,
    inputWidth: _vm.queryInputWidth,
    inline: _vm.queryInline
  }), _vm._v(" "), _c("div", {
    staticClass: "container-main",
    "class": {
      pt5: _vm.tabPanes.length > 0
    }
  }, [_vm._t("tabQuery", [_vm.tabPanes.length > 0 ? _c("el-tabs", {
    staticClass: "top-tab-query",
    attrs: {
      value: _vm.tabQuery.tabKey
    },
    on: {
      "tab-click": _vm.handleTabClick
    }
  }, _vm._l(_vm.tabPanes, function (item) {
    return _c("el-tab-pane", {
      key: item.name,
      attrs: {
        label: item.label,
        name: item.name
      }
    });
  }), 1) : _vm._e()]), _vm._v(" "), _c("div", {
    staticClass: "flex justify-between el-crud-toolbar"
  }, [_vm._t("buttons", [_c("div", _vm._l(_vm.actionButtons, function (item, index) {
    return _c("el-button", {
      key: "" + (item.key || "action-btn-" + index),
      attrs: {
        size: item.size,
        plain: item.plain,
        disabled: item.disabled,
        type: item.type,
        icon: item.icon
      },
      on: {
        click: function click($event) {
          return _vm.handleButtonClick(item);
        }
      }
    }, [_vm._v(_vm._s(item.text))]);
  }), 1)], {
    selections: _vm.selections
  }), _vm._v(" "), _vm._t("toolbar", [_c("right-toolbar", {
    attrs: {
      showSearch: _vm.showSearch,
      columns: _vm.columns,
      search: !!(_vm.queryItems && _vm.queryItems.length)
    },
    on: {
      "update:showSearch": function updateShowSearch($event) {
        _vm.showSearch = $event;
      },
      "update:show-search": function updateShowSearch($event) {
        _vm.showSearch = $event;
      },
      queryTable: _vm.refresh
    }
  })], {
    columns: _vm.columns,
    showSearch: _vm.showSearch
  })], 2), _vm._v(" "), _vm._t("default", [_c("crud-table", {
    directives: [{
      name: "loading",
      rawName: "v-loading",
      value: _vm.listLoading,
      expression: "listLoading"
    }],
    attrs: {
      size: "mini",
      highlightCol: _vm.highlightCol,
      resizable: _vm.resizable,
      border: _vm.border,
      columns: _vm.columns,
      data: _vm.data,
      "default-sort": _vm.defaultSort
    },
    on: {
      "selection-change": _vm.handleSelectionChange,
      "row-action": _vm.handleRowAction,
      "sort-change": _vm.handleSortChange
    }
  })], {
    data: _vm.data
  }), _vm._v(" "), _vm._t("pagination", [_c("pagination", {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.total > 0,
      expression: "total > 0"
    }],
    attrs: {
      total: _vm.total,
      page: _vm.pagination.pageNum,
      limit: _vm.pagination.pageSize
    },
    on: {
      "update:page": function updatePage($event) {
        return _vm.$set(_vm.pagination, "pageNum", $event);
      },
      "update:limit": function updateLimit($event) {
        return _vm.$set(_vm.pagination, "pageSize", $event);
      },
      pagination: _vm.refresh
    }
  })], {
    total: _vm.total,
    pagination: _vm.pagination
  })], 2)], 2);
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

/* style */
var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-35906918_0", {
    source: ".top-tab-query[data-v-35906918] {\n  margin-bottom: 10px;\n}\n.top-tab-query[data-v-35906918] .el-tabs__header {\n  margin: 0;\n}\n\n/*# sourceMappingURL=index.vue.map */",
    map: {
      "version": 3,
      "sources": ["/Users/tonwe/git/el-crud-page/src/index.vue", "index.vue"],
      "names": [],
      "mappings": "AA2UA;EACA,mBAAA;AC1UA;AD6UA;EACA,SAAA;AC3UA;;AAEA,oCAAoC",
      "file": "index.vue",
      "sourcesContent": ["<!-- crud组件 主要用于子组件的上下文传递 -->\n<!-- \n    搜索组件配置 queryItems 可配置\n    搜索及重置事件 queryTable \n     \n    切换组件配置 tabPanes 可配置\n    切换参数 tabQuery \n    \n    按钮组件配置 buttons 可配置\n    右侧工具条\n    表格列配置 columns 可配置\n    表格数据\n    分页数据\n -->\n<template>\n\n    <div class=\"el-crud\">\n        <!-- 搜索过滤插槽 -->\n        <slot name=\"query\" :queryItems=\"queryItems\" :lineClamp=\"queryLineClamp\" :labelWidth=\"queryLabelWidth\"\n            :inputWidth=\"queryInputWidth\" :inline=\"queryInline\">\n            <query-form v-show=\"showSearch\" v-if=\"queryItems && queryItems.length\" :queryItems=\"queryItems\"\n                :lineClamp=\"queryLineClamp\" :label-width=\"queryLabelWidth\" :input-width=\"queryInputWidth\" :inline=\"queryInline\"\n                @queryTable=\"handleQuery\" />\n        </slot>\n        <div class=\"container-main\" :class=\"{ pt5: tabPanes.length > 0 }\">\n            <slot name=\"tabQuery\">\n                <el-tabs class=\"top-tab-query\" v-if=\"tabPanes.length > 0\" :value=\"tabQuery.tabKey\"\n                    @tab-click=\"handleTabClick\">\n                    <el-tab-pane :label=\"item.label\" :name=\"item.name\" v-for=\"item in tabPanes\"\n                        :key=\"item.name\"></el-tab-pane>\n                </el-tabs>\n            </slot>\n            <!-- 工具条插槽 -->\n            <div class=\"flex justify-between el-crud-toolbar\">\n                <slot name=\"buttons\" :selections=\"selections\">\n                    <div>\n                        <el-button :size=\"item.size\" @click=\"handleButtonClick(item)\" v-for=\"(item,index) in actionButtons\" :key=\"`${item.key || ('action-btn-'+index)}`\"\n                            :plain=\"item.plain\" :disabled=\"item.disabled\" :type=\"item.type\" :icon=\"item.icon\">{{\n                                item.text\n                            }}</el-button>\n                    </div>\n                </slot>\n                <slot name=\"toolbar\" :columns=\"columns\" :showSearch=\"showSearch\">\n                    <right-toolbar :showSearch.sync=\"showSearch\" @queryTable=\"refresh\" :columns=\"columns\"\n                        :search=\"!!(queryItems && queryItems.length)\"></right-toolbar>\n                </slot>\n            </div>\n            <!-- 默认插槽 并传 data -->\n            <slot :data=\"data\">\n                <crud-table v-loading=\"listLoading\" size=\"mini\" @selection-change=\"handleSelectionChange\"\n                    :highlightCol=\"highlightCol\" :resizable=\"resizable\" :border=\"border\" :columns=\"columns\" :data=\"data\"\n                    @row-action=\"handleRowAction\" @sort-change=\"handleSortChange\"\n                    :default-sort=\"defaultSort\"></crud-table>\n            </slot>\n            <!-- 分页插槽 并传 total queryParams -->\n            <slot name=\"pagination\" :total=\"total\" :pagination=\"pagination\">\n                <pagination v-show=\"total > 0\" :total=\"total\" :page.sync=\"pagination.pageNum\"\n                    :limit.sync=\"pagination.pageSize\" @pagination=\"refresh\" />\n            </slot>\n        </div>\n\n    </div>\n\n</template>\n\n\n<script>\nimport CrudTable from \"./table.vue\";\nimport RightToolbar from \"./rightToolbar.vue\";\nimport QueryForm from \"./queryForm.vue\";\nimport Pagination from \"./pagination.vue\"\nimport { toLine } from \"./utils\";\n\nexport default {\n    components: {\n        CrudTable, RightToolbar, QueryForm, Pagination\n    },\n    name: 'Crud',\n    provide() {\n        return {\n            crud: this\n        };\n    },\n    props: {\n        queryParamsMethod: {\n            type: Function\n        },\n        columns: {\n            type: Array,\n            default: () => []\n        },\n        queryItems: {\n            type: Array,\n            default: () => []\n        },\n        queryLineClamp: {\n            type: Number,\n            default: 1\n        },\n        queryLabelWidth: {\n            type: Number,\n            default: 80\n        },\n        queryInputWidth: {\n            type: Number,\n            default: 210\n        },\n        queryInline: {\n            type: Boolean,\n            default: true\n        },\n        buttons: {\n            type: Array | Function,\n            default: () => []\n        },\n        tabPanes: {\n            type: Array,\n            default: () => []\n        },\n        defaultSort: {\n            type: Object,\n            default: () => {\n                return {\n                    prop: undefined,\n                    order: undefined\n                }\n            }\n        },\n        highlightCol: {\n            type: Boolean,\n            default: false\n        },\n        resizable: {\n            type: Boolean,\n            default: false\n        },\n        border: {\n            type: Boolean,\n            default: false\n        }\n    },\n    watch: {\n        tabPanes: {\n            handler(val) {\n                if (val.length) {\n\n                    this.tabQuery.tabKey = val[0].name\n                }\n            },\n            deep: true,\n            immediate: true\n        },\n        \"tabQuery.tabKey\": {\n            handler(val) {\n                this.$emit(\"tabChange\", val);\n            },\n\n        }\n    },\n    computed: {\n        actionButtons() {\n            let buts = this.buttons;\n            if (typeof buts === 'function') {\n                return buts(this.selections);\n            } else if (buts?.length) {\n                return buts\n            }\n            return []\n        }\n    },\n    data() {\n        return {\n            listLoading: false,\n            showSearch: true,\n            selections: [],\n            data: [],\n            service: { // 增删改查导出\n                add: null,\n                update: null,\n                delete: null,\n                page: null,\n                info: null,\n                list: null,\n                export: null,\n            }, // 服务\n            queryParams: {\n                // pageNum: 1,\n                // pageSize: 10\n            }, // 查询参数\n\n            tabQuery: {\n                tabKey: undefined\n            }, // 参数\n            filterParams: {}, // 过滤参数\n            pagination: {\n                pageNum: 1,\n                pageSize: 10\n            },\n            orderParams: {\n                orderByRowName: undefined,\n                orderByRule: undefined\n            },\n            total: 0,\n\n        }\n    },\n    created() {\n    },\n    methods: {\n        handleTabClick(tab) {\n            this.tabQuery.tabKey = tab.name\n            this.refresh()\n        },\n        handleSelectionChange(e) {\n            this.selections = e\n        },\n        handleQuery(query) {\n            this.queryParams = query;\n            this.refresh()\n        },\n        handleButtonClick(item) {\n            this.$emit(\"action\", item.action, this.selections);\n        },\n        handleRowAction(action, scope) {\n            this.$emit(\"row-action\", action, scope);\n            if (action === 'delete' && this.service.delete) {\n                this.delete(scope)\n            }\n        },\n        handleSortChange(column) {\n            this.orderParams.orderByRowName = toLine(column.prop);\n            if (column.order == \"descending\") {\n                this.orderParams.orderByRule = \"desc\";\n            } else if (column.order == \"ascending\") {\n                this.orderParams.orderByRule = \"asc\";\n            } else {\n                this.orderParams.orderByRule = undefined;\n                this.orderParams.orderByRowName = undefined;\n            }\n            this.refresh();\n        },\n        // 服务\n        setService(service) {\n            this.service = Object.assign(this.service, service);\n        },\n        // 设置列\n        setColumns(columns) {\n            this.columns = columns;\n        },\n        // 设置数据\n        setData(data) {\n            // this.crud.data = data;\n        },\n        // 获得查询参数\n        async getParams() {\n            const defaultSort = this.defaultSort;\n            let orderParams = this.orderParams;\n\n            if (!orderParams?.orderByRowName && defaultSort?.prop) {\n                const orderByRowName = toLine(defaultSort.prop);\n                let orderByRule = defaultSort.order;\n\n                if (defaultSort.order == \"descending\") {\n                    orderByRule = \"desc\";\n                } else if (defaultSort.order == \"ascending\") {\n                    orderByRule = \"asc\";\n                }\n\n                orderParams = {\n                    orderByRowName,\n                    orderByRule\n                }\n            }\n\n            let params = { ...this.queryParams, ...this.pagination, ...this.tabQuery, ...orderParams }\n\n\n\n            if (this.queryParamsMethod) {\n                return await this.queryParamsMethod(params);\n            }\n            return params;\n        },\n        // 刷新列表数据\n        async refresh() {\n            this.listLoading = true;\n            try {\n                const queryParams = await this.getParams();\n                const { code, rows, total } = await this.service.page(queryParams);\n                if (code === 200) {\n                    this.data = rows;\n                    this.total = total;\n                }\n\n            } catch (error) {\n                console.log(error);\n            }\n            this.listLoading = false;\n        },\n        // 删除\n        async delete({ row }) {\n            try {\n                let id = row?.id;\n                await this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {\n                    confirmButtonText: '确定',\n                    cancelButtonText: '取消',\n                    type: 'warning'\n                })\n                const { code } = await this.service.delete(id);\n                if (code === 200) {\n                    this.refresh();\n                    this.$message({\n                        type: 'success',\n                        message: '操作成功!'\n                    });\n                }\n            } catch (error) {\n                console.log(error);\n\n            }\n\n\n        }\n\n    }\n\n}\n\n</script>\n\n<style scoped lang=\"scss\">\n.top-tab-query {\n    margin-bottom: 10px;\n\n    &::v-deep {\n        .el-tabs__header {\n            margin: 0;\n        }\n    }\n}\n</style>", ".top-tab-query {\n  margin-bottom: 10px;\n}\n.top-tab-query::v-deep .el-tabs__header {\n  margin: 0;\n}\n\n/*# sourceMappingURL=index.vue.map */"]
    },
    media: undefined
  });
};
/* scoped */
var __vue_scope_id__ = "data-v-35906918";
/* module identifier */
var __vue_module_identifier__ = undefined;
/* functional template */
var __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

___$insertStylesToHeader(".el-crud .flex {\n  display: flex;\n}\n.el-crud .inline-flex {\n  display: inline-flex;\n}\n.el-crud .hidden {\n  display: none;\n}\n.el-crud .block {\n  display: block;\n}\n.el-crud .inline-block {\n  display: inline-block;\n}\n.el-crud .flex-row {\n  flex-direction: row;\n}\n.el-crud .flex-row-reverse {\n  flex-direction: row-reverse;\n}\n.el-crud .flex-col {\n  flex-direction: column;\n}\n.el-crud .flex-col-reverse {\n  flex-direction: column-reverse;\n}\n.el-crud .flex-wrap {\n  flex-wrap: wrap;\n}\n.el-crud .flex-nowrap {\n  flex-wrap: nowrap;\n}\n.el-crud .flex-wrap-reverse {\n  flex-wrap: wrap-reverse;\n}\n.el-crud .justify-start {\n  justify-content: flex-start;\n}\n.el-crud .justify-end {\n  justify-content: flex-end;\n}\n.el-crud .justify-center {\n  justify-content: center;\n}\n.el-crud .justify-between {\n  justify-content: space-between;\n}\n.el-crud .justify-around {\n  justify-content: space-around;\n}\n.el-crud .justify-evenly {\n  justify-content: space-evenly;\n}\n.el-crud .items-start {\n  align-items: flex-start;\n}\n.el-crud .items-end {\n  align-items: flex-end;\n}\n.el-crud .items-center {\n  align-items: center;\n}\n.el-crud .items-baseline {\n  align-items: baseline;\n}\n.el-crud .items-stretch {\n  align-items: stretch;\n}\n.el-crud .content-start {\n  align-content: flex-start;\n}\n.el-crud .content-end {\n  align-content: flex-end;\n}\n.el-crud .content-center {\n  align-content: center;\n}\n.el-crud .content-between {\n  align-content: space-between;\n}\n.el-crud .content-around {\n  align-content: space-around;\n}\n.el-crud .content-evenly {\n  align-content: space-evenly;\n}\n.el-crud .self-auto {\n  align-self: auto;\n}\n.el-crud .self-start {\n  align-self: flex-start;\n}\n.el-crud .self-end {\n  align-self: flex-end;\n}\n.el-crud .self-center {\n  align-self: center;\n}\n.el-crud .self-stretch {\n  align-self: stretch;\n}\n.el-crud .flex-1 {\n  flex: 1 1 0%;\n}\n.el-crud .flex-auto {\n  flex: 1 1 auto;\n}\n.el-crud .flex-initial {\n  flex: 0 1 auto;\n}\n.el-crud .flex-none {\n  flex: none;\n}\n.el-crud .grow {\n  flex-grow: 1;\n}\n.el-crud .grow-0 {\n  flex-grow: 0;\n}\n.el-crud .shrink {\n  flex-shrink: 1;\n}\n.el-crud .shrink-0 {\n  flex-shrink: 0;\n}\n.el-crud .w-full {\n  width: 100%;\n}\n.el-crud .w-auto {\n  width: auto;\n}\n.el-crud .h-full {\n  height: 100%;\n}\n.el-crud .h-auto {\n  height: auto;\n}\n.el-crud .h-screen {\n  height: 100vh;\n}\n.el-crud .m-0 {\n  margin: 0;\n}\n.el-crud .m-auto {\n  margin: auto;\n}\n.el-crud .mx-auto {\n  margin-left: auto;\n  margin-right: auto;\n}\n.el-crud .my-auto {\n  margin-top: auto;\n  margin-bottom: auto;\n}\n.el-crud .text-left {\n  text-align: left;\n}\n.el-crud .text-center {\n  text-align: center;\n}\n.el-crud .text-right {\n  text-align: right;\n}\n.el-crud .text-justify {\n  text-align: justify;\n}\n.el-crud .font-normal {\n  font-weight: 400;\n}\n.el-crud .font-medium {\n  font-weight: 500;\n}\n.el-crud .font-semibold {\n  font-weight: 600;\n}\n.el-crud .font-bold {\n  font-weight: 700;\n}\n.el-crud .overflow-hidden {\n  overflow: hidden;\n}\n.el-crud .overflow-auto {\n  overflow: auto;\n}\n.el-crud .overflow-scroll {\n  overflow: scroll;\n}\n.el-crud .overflow-x-auto {\n  overflow-x: auto;\n}\n.el-crud .overflow-y-auto {\n  overflow-y: auto;\n}\n.el-crud .relative {\n  position: relative;\n}\n.el-crud .absolute {\n  position: absolute;\n}\n.el-crud .fixed {\n  position: fixed;\n}\n.el-crud .sticky {\n  position: sticky;\n}\n.el-crud .cursor-pointer {\n  cursor: pointer;\n}\n.el-crud .cursor-not-allowed {\n  cursor: not-allowed;\n}\n.el-crud .crud-table {\n  margin-top: 10px;\n}\n\n/*# sourceMappingURL=output.css.map */");

exports.Crud = __vue_component__;
exports.CrudTable = __vue_component__$4;
exports.QueryForm = __vue_component__$2;
//# sourceMappingURL=index.js.map
