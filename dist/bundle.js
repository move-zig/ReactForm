!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=7)}([function(e,t){e.exports=React},function(e,t,r){"use strict";var n=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var a=o(r(0)),l=function(e){function t(t){var r=e.call(this,t)||this;return r.handleChange=function(e){var t,n=e.target,o=n.name,a=n.value;r.setState(((t={})[o]=a,t))},r.state={firstName:"",lastName:"",address1:"",address2:"",city:"",provinceCode:"",postalCode:"",countryCode:""},r}return n(t,e),t.prototype.render=function(){return a.createElement("div",null,a.createElement("h2",null,"Shipping Address"),a.createElement("div",{className:"form-group"},a.createElement("label",{htmlFor:"firstName"},"First Name"),a.createElement("input",{type:"text",className:"form-control",name:"firstName",id:"firstName",value:this.state.firstName,onChange:this.handleChange})),a.createElement("div",{className:"form-group"},a.createElement("label",{htmlFor:"lastName"},"Last Name"),a.createElement("input",{type:"text",className:"form-control",name:"lastName",id:"lastName",value:this.state.lastName,onChange:this.handleChange})))},t}(a.Component);t.ShippingAddress=l},function(e,t,r){"use strict";var n=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var a=o(r(0)),l=function(e){function t(t){var r=e.call(this,t)||this;return r.handleChange=function(e){},r.state={paymentPlan:"full"},r}return n(t,e),t.prototype.render=function(){return a.createElement("div",{className:"form-group"},a.createElement("div",{className:"form-check"},a.createElement("input",{className:"form-check-input",type:"radio",name:"paymentPlan",value:"full",id:"payment-plan-full",checked:"full"===this.state.paymentPlan,onChange:this.handleChange}),a.createElement("label",{className:"form-name-label",htmlFor:"payment-plan-full"},"Pay in Full")),a.createElement("div",{className:"form-check"},a.createElement("input",{className:"form-check-input",type:"radio",name:"paymentPlan",value:"part",id:"payment-plan-part",checked:"part"===this.state.paymentPlan,onChange:this.handleChange}),a.createElement("label",{className:"form-name-label",htmlFor:"payment-plan-part"},"Installment Plan")))},t}(a.Component);t.PaymentPlan=l},function(e,t,r){"use strict";var n=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var a=o(r(0));t.BLUE="#0000ff",t.RED="#ff0000";var l=function(e){function r(r){var n=e.call(this,r)||this;return n.toggleColor=function(){var e=n.state.color===t.BLUE?t.RED:t.BLUE;n.setState({color:e})},n.state={color:t.BLUE},n}return n(r,e),r.prototype.render=function(){return a.createElement("div",null,a.createElement("h1",{style:{color:this.state.color}},"Hello from ",this.props.compiler," and ",this.props.framework,"!"),a.createElement("p",null,this.props.foo),a.createElement("button",{onClick:this.toggleColor},"Toggle"))},r.defaultProps={foo:"foo",bar:"bar"},r}(a.Component);t.Hello=l},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default={mm:"Master Makeup Artistry",ma:"Makeup Artistry",mw:"Pro Makeup Workshop",gb:"Global Beauty Workshop",hs:"Hair Styling Essentials"}},function(e,t,r){"use strict";var n=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var l=o(r(0)),c=a(r(4)),i=function(e){function t(t){var r=e.call(this,t)||this;r.handleChange=function(e){var t,n=e.target,o=n.checked,a=n.value;r.setState(((t={})[a]=o,t))},r.selectAll=function(e){var t={};for(var n in c.default)c.default.hasOwnProperty(n)&&(t[n]=!0);r.setState(t),e.preventDefault()};var n={};for(var o in c.default)c.default.hasOwnProperty(o)&&(n[o]=!1);return r.state=n,r}return n(t,e),t.prototype.render=function(){var e=this,t=Object.keys(c.default).map(function(t){return l.createElement("div",{className:"form-check"},l.createElement("input",{className:"form-check-input",type:"checkbox",name:"courses",id:"course-"+t,key:t,value:t,checked:e.state[t],onChange:e.handleChange}),l.createElement("label",{className:"form-check-label",htmlFor:"course-"+t},c.default[t]))});return l.createElement("div",null,l.createElement("h2",null,"Choose Your Courses"),l.createElement("div",{className:"form-group"},t),l.createElement("button",{className:"btn",onClick:this.selectAll},"Select All"))},t}(l.Component);t.CourseSelection=i},function(e,t){e.exports=ReactDOM},function(e,t,r){"use strict";var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var o=n(r(0)),a=n(r(6)),l=r(5),c=r(3),i=r(2),u=r(1);a.render(o.createElement("div",{className:"container"},o.createElement(c.Hello,{compiler:"TypeScript",framework:"React",foo:"overwritten!"}),o.createElement("form",null,o.createElement(l.CourseSelection,null),o.createElement(i.PaymentPlan,null),o.createElement(u.ShippingAddress,null))),document.getElementById("root"))}]);
//# sourceMappingURL=bundle.js.map