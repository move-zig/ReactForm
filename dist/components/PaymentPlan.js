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
var PaymentPlan = /** @class */ (function (_super) {
    __extends(PaymentPlan, _super);
    function PaymentPlan(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChange = function (event) {
            var target = event.target;
            _this.setState({ paymentPlan: target.value });
        };
        _this.state = {
            paymentPlan: 'full',
        };
        return _this;
    }
    PaymentPlan.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("h2", null, "Payment Plan"),
            React.createElement("div", { className: 'form-group' },
                React.createElement("div", { className: 'form-check' },
                    React.createElement("input", { className: 'form-check-input', type: 'radio', name: 'paymentPlan', value: 'full', id: 'payment-plan-full', checked: this.state.paymentPlan === 'full', onChange: this.handleChange }),
                    React.createElement("label", { className: 'form-name-label', htmlFor: 'payment-plan-full' }, "Pay in Full")),
                React.createElement("div", { className: 'form-check' },
                    React.createElement("input", { className: 'form-check-input', type: 'radio', name: 'paymentPlan', value: 'part', id: 'payment-plan-part', checked: this.state.paymentPlan === 'part', onChange: this.handleChange }),
                    React.createElement("label", { className: 'form-name-label', htmlFor: 'payment-plan-part' }, "Installment Plan")),
                React.createElement("div", { className: 'form-check' },
                    React.createElement("input", { className: 'form-check-input', type: 'radio', name: 'paymentPlan', value: 'accelerated', id: 'payment-plan-accelerated', checked: this.state.paymentPlan === 'accelerated', onChange: this.handleChange }),
                    React.createElement("label", { className: 'form-name-label', htmlFor: 'payment-plan-accelerated' }, "Accelerated Plan")))));
    };
    return PaymentPlan;
}(React.Component));
exports.PaymentPlan = PaymentPlan;
//# sourceMappingURL=PaymentPlan.js.map