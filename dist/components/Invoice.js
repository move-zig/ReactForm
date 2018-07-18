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
var Invoice = /** @class */ (function (_super) {
    __extends(Invoice, _super);
    function Invoice() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Invoice.prototype.render = function () {
        var lines = this.props.lineItems.map(function (el) { return (React.createElement("tr", { className: el.discount ? 'text-primary' : '' },
            React.createElement("td", null, el.description),
            React.createElement("td", { className: 'text-right' }, el.cost))); });
        return (React.createElement("table", { style: this.props.lineItems.length ?
                { maxWidth: '360px', width: '100%', display: 'table' } :
                { display: 'none' } },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null, "Selected Courses"),
                    React.createElement("th", { className: 'text-right' }, "Cost"))),
            React.createElement("tbody", null, lines)));
    };
    return Invoice;
}(React.Component));
exports.Invoice = Invoice;
//# sourceMappingURL=Invoice.js.map