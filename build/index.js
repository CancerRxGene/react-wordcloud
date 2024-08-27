"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var React = _interopRequireWildcard(require("react"));
var _d3Cloud = _interopRequireDefault(require("d3-cloud"));
var _invariant = _interopRequireDefault(require("invariant"));
var _lodash = _interopRequireDefault(require("lodash"));
var d3 = _interopRequireWildcard(require("d3"));
var _tooltip = _interopRequireDefault(require("./tooltip"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /**
 * Powerful React + D3 word cloud component with rich features.
 * Based on the original word cloud generator: https://www.jasondavies.com/wordcloud/.
 *
 *
 */
// min values are required because the layout will take too long to compute
// recursively if small values are provided
var MIN_HEIGHT = 150;
var MIN_WIDTH = 200;
var WordCloud = /*#__PURE__*/function (_React$Component) {
  function WordCloud() {
    var _this;
    _classCallCheck(this, WordCloud);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, WordCloud, [].concat(args));
    _defineProperty(_this, "state", {
      tooltipContent: '',
      tooltipEnabled: false,
      tooltipX: 0,
      tooltipY: 0
    });
    _defineProperty(_this, "_setText", function (d) {
      return _lodash["default"].get(d, _this.props.wordKey, '');
    });
    _defineProperty(_this, "_colorScale", function (d, i) {
      var _this$props = _this.props,
        colorScale = _this$props.colorScale,
        colors = _this$props.colors;
      return colorScale ? colorScale(d, i) : _chooseRandom(colors || DEFAULT_COLORS);
    });
    _defineProperty(_this, "_onMouseOver", function (d) {
      var _this$props2 = _this.props,
        tooltipEnabled = _this$props2.tooltipEnabled,
        wordKey = _this$props2.wordKey,
        wordCountKey = _this$props2.wordCountKey,
        onSetTooltip = _this$props2.onSetTooltip;
      var tooltipContent = onSetTooltip ? onSetTooltip(d) : _lodash["default"].get(d, wordKey, '') + " (".concat(d[wordCountKey], ")");
      if (tooltipEnabled) {
        _this.setState({
          tooltipContent: tooltipContent,
          tooltipEnabled: true,
          tooltipX: event.clientX,
          tooltipY: event.clientY - 28
        });
      }
    });
    _defineProperty(_this, "_onMouseOut", function () {
      if (_this.props.tooltipEnabled) {
        _this.setState({
          tooltipEnabled: false
        });
      }
    });
    return _this;
  }
  _inherits(WordCloud, _React$Component);
  return _createClass(WordCloud, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._validateProps();
      this._init(this.props);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this._update(nextProps);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$state = this.state,
        tooltipContent = _this$state.tooltipContent,
        tooltipEnabled = _this$state.tooltipEnabled,
        tooltipX = _this$state.tooltipX,
        tooltipY = _this$state.tooltipY;
      var tooltip = tooltipEnabled ? /*#__PURE__*/React.createElement(_tooltip["default"], {
        content: tooltipContent,
        isEnabled: tooltipEnabled,
        x: tooltipX,
        y: tooltipY
      }) : null;
      return /*#__PURE__*/React.createElement("div", {
        ref: function ref(container) {
          _this2._container = container;
        }
      }, /*#__PURE__*/React.createElement("div", {
        ref: function ref(chart) {
          _this2._chart = chart;
        }
      }), tooltip);
    }

    // read w/h from props, then from parent container, then from min values
  }, {
    key: "_setDimensions",
    value: function _setDimensions(height, width) {
      var _this$_container$pare = this._container.parentNode,
        parentHeight = _this$_container$pare.offsetHeight,
        parentWidth = _this$_container$pare.offsetWidth;
      this._height = height || parentHeight;
      this._width = width || parentWidth;
      if (typeof this._height !== 'number' || this._height < MIN_HEIGHT) {
        console.warn("Invalid/small height provided, falling back to minimum value of ".concat(MIN_HEIGHT));
        this._height = MIN_HEIGHT;
      }
      if (typeof this._width !== 'number' || this._width < MIN_WIDTH) {
        console.warn("Invalid/small width provided, falling back to minimum value of ".concat(MIN_WIDTH));
        this._width = MIN_WIDTH;
      }
    }
  }, {
    key: "_init",
    value: function _init(props) {
      // cleanup
      d3.select(this._chart).selectAll('*').remove();

      // create svg and vis nodes
      var height = props.height,
        width = props.width;
      this._setDimensions(height, width);
      this._svg = d3.select(this._chart).append('svg');
      this._vis = this._svg.append('g');
      this._layout = (0, _d3Cloud["default"])();
      this._update(props);
    }
  }, {
    key: "_update",
    value: function _update(props) {
      var _this3 = this;
      var fontFamily = props.fontFamily,
        height = props.height,
        maxAngle = props.maxAngle,
        maxWords = props.maxWords,
        minAngle = props.minAngle,
        orientations = props.orientations,
        scale = props.scale,
        spiral = props.spiral,
        width = props.width,
        wordCountKey = props.wordCountKey,
        words = props.words,
        minFontSize = props.minFontSize,
        maxFontSize = props.maxFontSize;
      // update svg/vis nodes dimensions
      this._setDimensions(height, width);
      console.log("This ._svg is", this._svg);
      this._svg.attr('height', this._height).attr('width', this._width).style('background-color', 'white');
      this._vis.attr('transform', "translate(".concat(this._width / 2, ", ").concat(this._height / 2, ")"));

      // update fontScale by rescaling to min/max values of data
      // if min === max, we prefer the upper bound range value
      var d3Scale = _getScale(scale);
      var filteredWords = words.slice(0, maxWords);
      this._fontScale = _lodash["default"].uniqBy(filteredWords, wordCountKey).length > 1 ? d3Scale().range([minFontSize, maxFontSize]) : d3Scale().range([maxFontSize, maxFontSize]);
      if (filteredWords.length) {
        this._fontScale.domain([d3.min(filteredWords, function (d) {
          return d[wordCountKey];
        }), d3.max(filteredWords, function (d) {
          return d[wordCountKey];
        })]);
      }

      // compute rotations based on orientations and angles
      if (typeof orientations === 'number' && orientations > 0) {
        var rotations = [];
        if (orientations === 1) {
          rotations = [minAngle];
        } else {
          rotations = [minAngle, maxAngle];
          var increment = (maxAngle - minAngle) / (orientations - 1);
          var rotation = minAngle + increment;
          while (rotation < maxAngle) {
            rotations.push(rotation);
            rotation += increment;
          }
        }
        this._layout.rotate(function () {
          return _chooseRandom(rotations);
        });
      }
      this._layout.size([this._width, this._height]).words(filteredWords).padding(1).text(this._setText).font(fontFamily).fontSize(function (d) {
        return _this3._fontScale(d[wordCountKey]);
      }).spiral(spiral).on('end', function (words) {
        return _this3._draw(words, props);
      }).start();
    }
  }, {
    key: "_draw",
    value: function _draw(words, props) {
      // d3.layout.cloud adds 'x', 'y', 'rotate', 'size' accessors to 'd' object
      var fontFamily = props.fontFamily,
        transitionDuration = props.transitionDuration,
        onWordClick = props.onWordClick;
      this._words = this._vis.selectAll('text').data(words);

      // enter transition
      this._words.enter().append('text').on('click', onWordClick).on('mouseover', this._onMouseOver).on('mouseout', this._onMouseOut).attr('cursor', onWordClick ? 'pointer' : 'default').attr('fill', this._colorScale).attr('font-family', fontFamily).attr('text-anchor', 'middle').attr('transform', 'translate(0,0) rotate(0)').transition().duration(transitionDuration).attr('font-size', function (d) {
        return "".concat(d.size, "px");
      }).attr('transform', this._transformText).text(this._setText);

      // update transition
      this._words.transition().duration(transitionDuration).attr('fill', this._colorScale).attr('font-family', fontFamily).attr('font-size', function (d) {
        return "".concat(d.size, "px");
      }).attr('transform', this._transformText).text(this._setText);

      // exit transition
      this._words.exit().transition().duration(transitionDuration).attr('fill-opacity', 0).remove();
    }
  }, {
    key: "_transformText",
    value: function _transformText(d) {
      var translate = "translate(".concat(d.x, ", ").concat(d.y, ")");
      var rotate = typeof d.rotate === 'number' ? "rotate(".concat(d.rotate, ")") : '';
      return translate + rotate;
    }
  }, {
    key: "_validateProps",
    value: function _validateProps() {
      var _this$props3 = this.props,
        maxAngle = _this$props3.maxAngle,
        minAngle = _this$props3.minAngle,
        words = _this$props3.words,
        wordCountKey = _this$props3.wordCountKey,
        wordKey = _this$props3.wordKey;
      (0, _invariant["default"])(Math.abs(minAngle) <= 90 && Math.abs(maxAngle) <= 90, 'Angles must have values between -90 to 90 degrees');
      (0, _invariant["default"])(minAngle <= maxAngle, 'minAngle must be <= maxAngle');
      if (words.length > 0) {
        var firstRow = words[0];
        (0, _invariant["default"])(_lodash["default"].get(firstRow, wordKey, false), 'Word key must be a valid key in the data');
        (0, _invariant["default"])(wordCountKey in firstRow, 'Word count key must be a valid key in the data');
      }
    }
  }]);
}(React.Component);
_defineProperty(WordCloud, "defaultProps", {
  colors: DEFAULT_COLORS,
  fontFamily: 'impact',
  height: null,
  maxAngle: 0,
  maxWords: 300,
  minAngle: 0,
  orientations: 1,
  scale: 'sqrt',
  spiral: 'rectangular',
  tooltipEnabled: true,
  transitionDuration: 1000,
  width: null,
  minFontSize: 10,
  maxFontSize: 100
});
console.log(d3.schemeCategory10);
var scale = d3.scaleOrdinal(d3.schemeCategory10);
var DEFAULT_COLORS = d3.range(20).map(scale);
var _chooseRandom = function _chooseRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
};
var _getScale = function _getScale(scale) {
  switch (scale) {
    case 'linear':
      return d3.scaleLinear;
    case 'log':
      return d3.scaleLog;
    case 'sqrt':
    default:
      return d3.scaleSqrt;
  }
};
var _default = exports["default"] = WordCloud;
