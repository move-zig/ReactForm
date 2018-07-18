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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var qs = __importStar(require("qs"));
var React = __importStar(require("react"));
var CheckboxGroup_1 = require("./CheckboxGroup");
var Input_1 = require("./Input");
var RadioGroup_1 = require("./RadioGroup");
var Select_1 = require("./Select");
var Invoice_1 = require("./Invoice");
var Promotion_1 = require("./Promotion");
var config = __importStar(require("../config"));
var FormContainer = /** @class */ (function (_super) {
    __extends(FormContainer, _super);
    function FormContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.cachedProvinces = {};
        _this.handleFormSubmit = function (event) {
            event.preventDefault();
            window.alert('submitted!');
        };
        /**
         * Fetches new prices and updates this.state.price. Any time the function is called, still-running http requests will
         * be cancelled.
         *
         * @param string[] courses
         * @param string   countryCode
         * @param string   provinceCode
         */
        _this.updatePrices = function (courses, countryCode, provinceCode) {
            if (_this.source) {
                _this.source.cancel('Operation superceded');
            }
            _this.source = axios_1.default.CancelToken.source();
            axios_1.default.get('https://api.qccareerschool.com/prices', {
                cancelToken: _this.source.token,
                params: { courses: courses, countryCode: countryCode, provinceCode: provinceCode },
                paramsSerializer: function (params) { return qs.stringify(params, { arrayFormat: 'brackets' }); },
            }).then(function (response) {
                _this.setState({ price: response.data });
            }).catch(function (err) {
                if (axios_1.default.isCancel(err)) {
                    // request was cancelled
                }
                else {
                    alert('unable to retrieve prices');
                }
            });
        };
        /**
         * Handles course checkbox changes and updates this.state.courses.
         */
        _this.handleCourseChange = function (event) {
            var target = event.target;
            _this.setState(function (prevState) {
                var courses;
                if (prevState.courses.indexOf(target.value) > -1) {
                    courses = prevState.courses.filter(function (s) { return s !== target.value; });
                }
                else {
                    courses = prevState.courses.concat([target.value]);
                }
                _this.updatePrices(courses, prevState.countryCode, prevState.provinceCode);
                return { courses: courses };
            });
        };
        /**
         * Handles payment plan radio button changes and updates this.state.paymentPlan.
         */
        _this.handlePaymentPlanChange = function (event) {
            var target = event.target;
            _this.setState({ paymentPlan: target.value });
        };
        /**
         * Handles input and select changes in the shipping information and updates the appropriate this.state member.
         */
        _this.handleShippingChange = function (event) {
            var target = event.target;
            if (target.name === 'countryCode') {
                if (target.value === 'CA' || target.value === 'US' || target.value === 'AU') {
                    _this.getProvinces(target.value).then(function (opts) {
                        console.log(opts);
                        _this.setState({ provinceOpts: opts.slice() });
                    });
                }
                else {
                    _this.setState({ provinceOpts: [] });
                }
            }
            _this.setState(function (prevState) {
                var _a;
                if (target.name === 'countryCode') {
                    _this.updatePrices(prevState.courses, target.value, prevState.provinceCode);
                }
                else if (target.name === 'provinceCode') {
                    _this.updatePrices(prevState.courses, prevState.countryCode, target.value);
                }
                return _a = {}, _a[target.name] = target.value, _a;
            });
        };
        _this.getProvinces = function (countryCode) { return __awaiter(_this, void 0, void 0, function () {
            var response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof this.cachedProvinces[countryCode] !== 'undefined') {
                            return [2 /*return*/, this.cachedProvinces[countryCode]];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get('https://api.qccareerschool.com/geoLocation/provinces', {
                                params: { countryCode: countryCode },
                            })];
                    case 2:
                        response = _a.sent();
                        this.cachedProvinces[countryCode] = response.data;
                        return [2 /*return*/, response.data];
                    case 3:
                        err_1 = _a.sent();
                        console.log('Unable to retrieve provinces for ' + countryCode);
                        return [2 /*return*/, []];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this.state = {
            courses: [],
            firstName: '',
            lastName: '',
            address1: '',
            address2: '',
            city: '',
            provinceCode: 'ON',
            postalCode: '',
            countryCode: 'CA',
            emailAddress: '',
            telephoneNumber: '',
            paymentPlan: 'full',
            paymentDay: null,
            price: null,
            provinceOpts: [],
        };
        return _this;
    }
    FormContainer.prototype.render = function () {
        var _this = this;
        var invoiceItems = [];
        if (this.state.price !== null && typeof this.state.price.courses !== 'undefined') {
            for (var courseCode in this.state.price.courses) {
                if (this.state.price.courses.hasOwnProperty(courseCode)) {
                    var course = this.state.price.courses[courseCode];
                    invoiceItems.push({ description: course.name, cost: course.baseCost, discount: false });
                    if (course.secondaryDiscountAmount) {
                        invoiceItems.push({
                            description: (course.secondaryDiscount * 100).toFixed(0) + '% discount',
                            cost: -course.secondaryDiscountAmount,
                            discount: true,
                        });
                    }
                }
            }
        }
        var courseList = Object.keys(config.courses).map(function (item) { return (React.createElement(CheckboxGroup_1.CheckboxGroup, { label: item, setName: 'courses', options: config.courses[item], selectedOptions: _this.state.courses, controlFunc: _this.handleCourseChange, key: item })); });
        return (React.createElement("form", { onSubmit: this.handleFormSubmit },
            React.createElement("section", { className: 'section', id: 'courses' },
                React.createElement("div", { className: 'container' },
                    React.createElement(Promotion_1.Promotion, null))),
            React.createElement("section", { className: 'section', id: 'courses' },
                React.createElement("div", { className: 'container' },
                    React.createElement("h2", { className: 'h1 text-center' }, "Choose Your Courses"),
                    React.createElement("h3", { className: 'mb-4 text-center' },
                        "Enroll in more than one course and get ",
                        React.createElement("strong", null, "50% OFF"),
                        " each additional course!"),
                    React.createElement("div", { className: 'row' },
                        React.createElement("div", { className: 'col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-0 mb-4 mb-md-0' }, courseList),
                        React.createElement("div", { className: 'col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-0' },
                            React.createElement(Invoice_1.Invoice, { lineItems: invoiceItems }))))),
            React.createElement("section", { className: 'section', id: 'payment' },
                React.createElement("div", { className: 'container' },
                    React.createElement("h2", { className: 'h1 text-center' }, "Payment Plan"),
                    React.createElement("h3", null, "Payment Options"),
                    React.createElement(RadioGroup_1.RadioGroup, { setName: 'paymentPlans', options: [
                            { value: 'full', name: 'Pay in Full' },
                            { value: 'accelerated', name: 'Accelerated Installment Plan' },
                            { value: 'part', name: 'Installments Plan' },
                        ], selectedOption: this.state.paymentPlan, controlFunc: this.handlePaymentPlanChange }))),
            React.createElement("section", { className: 'section', id: 'shipping' },
                React.createElement("div", { className: 'container' },
                    React.createElement("h2", { className: 'h1 text-center' }, "Shipping Information"),
                    React.createElement("div", { className: 'row' },
                        React.createElement("div", { className: 'col-12 col-md-6 col-lg-4 offset-lg-2' },
                            React.createElement(Input_1.Input, { type: 'text', label: 'First Name', name: 'firstName', value: this.state.firstName, placeholder: '', controlFunc: this.handleShippingChange }),
                            React.createElement(Input_1.Input, { type: 'text', label: 'Last Name', name: 'lastName', value: this.state.lastName, placeholder: '', controlFunc: this.handleShippingChange }),
                            React.createElement(Input_1.Input, { type: 'email', label: 'Email Address', name: 'emailAddress', value: this.state.emailAddress, placeholder: '', controlFunc: this.handleShippingChange }),
                            React.createElement(Input_1.Input, { type: 'text', label: 'Telephone Number', name: 'telephoneNumber', value: this.state.telephoneNumber, placeholder: '', controlFunc: this.handleShippingChange })),
                        React.createElement("div", { className: 'col-12 col-md-6 col-lg-4' },
                            React.createElement(Input_1.Input, { type: 'text', label: 'Address Line 1', name: 'address1', value: this.state.address1, placeholder: '', controlFunc: this.handleShippingChange }),
                            React.createElement(Input_1.Input, { type: 'text', label: 'Address Line 2', name: 'address2', value: this.state.address2, placeholder: '', controlFunc: this.handleShippingChange }),
                            React.createElement(Input_1.Input, { type: 'text', label: 'City', name: 'city', value: this.state.city, placeholder: '', controlFunc: this.handleShippingChange }),
                            React.createElement(Select_1.Select, { label: 'Province', name: 'provinceCode', opts: this.state.provinceOpts, value: this.state.provinceCode, controlFunc: this.handleShippingChange }),
                            React.createElement(Input_1.Input, { type: 'text', label: 'Postal Code', name: 'city', value: this.state.postalCode, placeholder: '', controlFunc: this.handleShippingChange }),
                            React.createElement(Input_1.Input, { type: 'text', label: 'Country', name: 'countryCode', value: this.state.countryCode, placeholder: '', controlFunc: this.handleShippingChange }))))),
            React.createElement("section", { className: 'section', id: 'enroll' },
                React.createElement("div", { className: 'container' },
                    React.createElement("input", { type: 'submit', className: 'btn', value: 'Enroll Now' })))));
    };
    return FormContainer;
}(React.Component));
exports.FormContainer = FormContainer;
//# sourceMappingURL=FormContainer.js.map