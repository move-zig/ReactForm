"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
exports.BLUE = '#0000ff';
exports.RED = '#ff0000';
var Hello = /** @class */ (function (_super) {
    __extends(Hello, _super);
    function Hello(props) {
        var _this = _super.call(this, props) || this;
        _this.toggleColor = function () {
            var newColor = _this.state.color === exports.BLUE ? exports.RED : exports.BLUE;
            _this.setState({ color: newColor });
        };
        _this.state = { color: exports.BLUE };
        return _this;
    }
    Hello.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("h1", { style: { color: this.state.color } },
                "Hello from ",
                this.props.compiler,
                " and ",
                this.props.framework,
                "!"),
            React.createElement("button", { onClick: this.toggleColor }, "Toggle")));
    };
    return Hello;
}(React.Component));
exports.Hello = Hello;
//# sourceMappingURL=Hello.js.map