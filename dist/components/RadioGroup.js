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
var RadioGroup = /** @class */ (function (_super) {
    __extends(RadioGroup, _super);
    function RadioGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadioGroup.prototype.render = function () {
        var _this = this;
        var inputs = this.props.options.map(function (opt) { return (React.createElement("div", { className: 'form-check', key: opt.value },
            React.createElement("input", { type: 'radio', className: 'form-check-input', name: _this.props.setName, onChange: _this.props.controlFunc, value: opt.value, checked: _this.props.selectedOption === opt.value, id: _this.props.setName + '-' + opt.value }),
            React.createElement("label", { className: 'form-check-label', htmlFor: _this.props.setName + '-' + opt.value }, opt.name))); });
        return (React.createElement("div", { className: 'form-group' },
            typeof this.props.label !== 'undefined' ? React.createElement("label", null, this.props.label) : '',
            inputs));
    };
    return RadioGroup;
}(React.Component));
exports.RadioGroup = RadioGroup;
//# sourceMappingURL=RadioGroup.js.map