(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{143:function(e,t,a){"use strict";a.r(t);var n=a(7),r=a.n(n),l=a(0),i=a.n(l),c=(a(146),function(e){var t=e.name,a=e.type,n=e.label,r=e.required,l=e.placeholder,c=e.selectOptions,o=void 0===c?[]:c,s=e.onChange,u=void 0===s?function(){}:s;return i.a.createElement("div",{className:"input-container"},n&&i.a.createElement("label",{htmlFor:t,className:"input-label "+(r?"input-label-required":"")},n),"select"===a?i.a.createElement("select",{name:t,id:t,className:"input",onChange:u},l&&i.a.createElement("option",{value:"",disabled:!0,selected:!0},l),o.map(function(e,t){var a=e.key,n=e.text;return i.a.createElement("option",{key:t,value:a},n)})):i.a.createElement("input",{className:"input",name:t,placeholder:l,required:r,type:a,onChange:u}))}),o=(a(144),[{key:"STUDENT",text:"Student"},{key:"POLICE",text:"Police"},{key:"TEACHER",text:"Teacher"},{key:"UTILITY",text:"Utility"},{key:"AGENCY",text:"Agency"},{key:"OTHERS",text:"Others"}]),s=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){return i.a.createElement("div",{className:"container container-padded"},i.a.createElement("h1",{className:"heading-1 heading-gutter-bottom"},"Continue Registration"),i.a.createElement("p",{className:"typography-sub"},"To continue with your registration, please fill out all the necessary details below."),i.a.createElement("form",{className:"registration",method:"POST"},i.a.createElement("div",{className:"fields"},i.a.createElement(c,{type:"text",placeholder:"Juan Dela Cruz",label:"Name",required:!0}),i.a.createElement(c,{type:"date",label:"Birthdate",required:!0}),i.a.createElement(c,{type:"select",label:"Profession",placeholder:"Select Profession",selectOptions:o,required:!0}),i.a.createElement(c,{type:"text",label:"Affiliation",placeholder:"N/A"})),i.a.createElement("button",{className:"submit",type:"submit"},"Register")))},t}(l.Component);t.default=s},146:function(e,t,a){var n=a(25).f,r=Function.prototype,l=/^\s*function ([^ (]*)/;"name"in r||a(18)&&n(r,"name",{configurable:!0,get:function(){try{return(""+this).match(l)[1]}catch(e){return""}}})}}]);
//# sourceMappingURL=component---src-pages-registration-js-ca353e0e0d8bb5c3decb.js.map