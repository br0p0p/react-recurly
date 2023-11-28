"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useRecurly;
var _react = require("react");
var _elements = require("./elements");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Provides a recurly instance bound to the provider tree
 */
function useRecurly() {
  var elementsContext = (0, _react.useContext)(_elements.RecurlyElementsContext);
  if (!elementsContext || !elementsContext.elements) {
    throw new Error("It looks like you are trying to use Recurly outside of an Elements context.\n       Please be sure the component that calls 'useRecurly' is within an <Elements> component.");
  }
  var elements = elementsContext.elements;
  var recurly = _objectSpread(_objectSpread({}, elements.recurly), {}, {
    // Provide a curried token method to bind the elements from the closest context
    token: function token() {
      var _elements$recurly;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return (_elements$recurly = elements.recurly).token.apply(_elements$recurly, [elements].concat(args));
    }
  });
  Object.setPrototypeOf(recurly, elements.recurly);
  return recurly;
}