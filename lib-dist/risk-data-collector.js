"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.RISK_STRATEGIES = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _provider = require("./provider");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
var RISK_STRATEGIES = exports.RISK_STRATEGIES = ['kount'];

/**
 * Injects risk data collection point in your checkout.
 *
 * <https://docs.recurly.com/docs/kount>
 */
var RiskDataCollector = exports["default"] = /*#__PURE__*/function (_React$Component) {
  _inherits(RiskDataCollector, _React$Component);
  var _super = _createSuper(RiskDataCollector);
  function RiskDataCollector(props, context) {
    var _this;
    _classCallCheck(this, RiskDataCollector);
    _this = _super.call(this, props, context);
    if (!context || !context.recurly) {
      throw new Error('<RiskDataCollector> must be within a <RecurlyProvider> tree.');
    }

    /**
     * TODO
     * Once recurly.Fraud is decommissioned in favor of recurly.Risk.FraudConcern,
     * this will change to consume a RiskProvider.
     */
    _this._container = /*#__PURE__*/_react["default"].createRef();
    _this._recurly = _this.context.recurly;
    return _this;
  }
  _createClass(RiskDataCollector, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var container = this._container,
        recurly = this._recurly;
      var _this$props = this.props,
        strategy = _this$props.strategy,
        onError = _this$props.onError;
      recurly.configure({
        fraud: _defineProperty({}, strategy, {
          dataCollector: true,
          form: container.current
        })
      });
      var fraud = this._fraud = recurly.fraud;
      fraud.on('error', function () {
        return onError.apply(void 0, arguments);
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        id: this.props.id,
        className: this.props.className,
        ref: this._container
      });
    }
  }]);
  return RiskDataCollector;
}(_react["default"].Component);
_defineProperty(RiskDataCollector, "propTypes", {
  /**
   * Applied to the container.
   */
  id: _propTypes["default"].string,
  /**
   * Applied to the container.
   */
  className: _propTypes["default"].string,
  /**
   * Risk data collection strategy.
   *
   * Possible values: 'kount'
   */
  strategy: _propTypes["default"].oneOf(RISK_STRATEGIES),
  /**
   * Called when an error is encountered
   * @type {FraudDataCollector~onError}
   */

  /**
   * @callback FraudDataCollector~onError
   * @param {RecurlyError}
   */
  onError: _propTypes["default"].func
});
_defineProperty(RiskDataCollector, "defaultProps", {
  id: undefined,
  className: undefined,
  strategy: RISK_STRATEGIES[0],
  onError: function onError(e) {
    throw e;
  }
});
_defineProperty(RiskDataCollector, "contextType", _provider.RecurlyContext);
;