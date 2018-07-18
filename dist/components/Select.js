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
var Select = /** @class */ (function (_super) {
    __extends(Select, _super);
    function Select() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Select.prototype.render = function () {
        var _this = this;
        var items = this.props.opts.map(function (el) {
            if (_this.props.value === el.value) {
                return React.createElement("option", { value: el.value, selected: true }, el.name);
            }
            else {
                return React.createElement("option", { value: el.value }, el.name);
            }
        });
        return (React.createElement("div", { className: 'form-group' },
            typeof this.props.label !== 'undefined' ? (React.createElement("label", { htmlFor: '' }, this.props.label)) : '',
            React.createElement("select", { className: 'form-control', name: this.props.name, onChange: this.props.controlFunc }, items)));
    };
    return Select;
}(React.Component));
exports.Select = Select;
//# sourceMappingURL=Select.js.map