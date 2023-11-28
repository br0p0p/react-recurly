"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RecurlyContext = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _package = require("../package.json");
var _jsxRuntime = require("react/jsx-runtime");
var _excluded = ["children"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var RecurlyContext = exports.RecurlyContext = /*#__PURE__*/_react["default"].createContext({
  recurly: null
});
var Provider = RecurlyContext.Provider;

/**
 * This is the top-level component for `react-recurly`, and must wrap any other
 * `react-recurly` component you will use. It is responsible for creating a `Recurly.js`
 * instance for any descendant components to interact with.
 *
 * This component accepts your `publicKey` and other configuration options for Recurly.js as props.
 */
var RecurlyProvider = exports["default"] = /*#__PURE__*/function (_React$Component) {
  _inherits(RecurlyProvider, _React$Component);
  var _super = _createSuper(RecurlyProvider);
  function RecurlyProvider(props) {
    var _this;
    _classCallCheck(this, RecurlyProvider);
    _this = _super.call(this, props);
    if (!(_this.props.publicKey || _this.props.hostname)) {
      throw new Error("\n        Please pass your 'publicKey' value to this RecurlyProvider.\n        Example: <RecurlyProvider publicKey=\"MY_PUBLIC_KEY\">\n      ");
    }

    // TODO: ensure proper shape?
    if (!window.recurly || !window.recurly.Recurly) {
      throw new Error("\n        Please load Recurly.js (https://js.recurly.com/v4/recurly.js) on this page prior to\n        loading your React application.\n      ");
    }
    var _this$props = _this.props,
      children = _this$props.children,
      options = _objectWithoutProperties(_this$props, _excluded);
    _this._recurly = fetchRecurlyInstance(options);
    if (!RecurlyProvider.hasReportedInitialization && _this._recurly.report) {
      _this._recurly.ready(function () {
        _this._recurly.report('react-recurly', {
          version: _package.version
        });
      });
      RecurlyProvider.hasReportedInitialization = true;
    }
    return _this;
  }
  _createClass(RecurlyProvider, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(Provider, {
        value: {
          recurly: this._recurly
        },
        children: this.props.children
      });
    }
  }]);
  return RecurlyProvider;
}(_react["default"].Component);
_defineProperty(RecurlyProvider, "propTypes", {
  /**
   * Your Recurly public key. See
   * [API Access](https://app.recurly.com/go/developer/api_access).
   */
  publicKey: _propTypes["default"].string,
  /**
   * Register the current hostname
   */
  hostname: _propTypes["default"].string,
  /**
   * Sets a default currency
   */
  currency: _propTypes["default"].string,
  /**
   * Adds additional field requirements for tokenization. ex: ['cvv']
   */
  required: _propTypes["default"].arrayOf(_propTypes["default"].string),
  /**
   * API request timeout in ms
   */
  timeout: _propTypes["default"].number,
  /**
   * Fraud configuration. See the
   * [Recurly-js docs on fraud configuration](https://developers.recurly.com/reference/recurly-js/index.html#fraud)
   */
  fraud: _propTypes["default"].shape({
    kount: _propTypes["default"].shape({
      dataCollector: _propTypes["default"].bool
    }),
    braintree: _propTypes["default"].shape({
      deviceData: _propTypes["default"].string
    }),
    litle: _propTypes["default"].shape({
      sessionId: _propTypes["default"].string
    })
  })
});
_defineProperty(RecurlyProvider, "defaultProps", {
  publicKey: ''
});
;

/**
 * Retrieves a recurly instance from a cache on the Recurly class, or creates one
 * if none found on the cache key. This is used when the Provider is being
 * regularly re-instantiated
 *
 * @param  {object} options instance instantiation options
 * @return {Recurly}
 */
function fetchRecurlyInstance(options) {
  var cache = window.recurly.Recurly.__instanceCache = window.recurly.Recurly.__instanceCache || {};
  var key = JSON.stringify(options);
  var recurly = cache[key] || new window.recurly.Recurly();
  recurly.configure(options);
  cache[key] = recurly;
  return recurly;
}