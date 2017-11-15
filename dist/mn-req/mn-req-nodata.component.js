"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MnReqNoDataComponent = (function () {
    function MnReqNoDataComponent() {
    }
    MnReqNoDataComponent.prototype.ngOnInit = function () { };
    return MnReqNoDataComponent;
}());
MnReqNoDataComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-req-nodata',
                template: "\n        <div>\n            <i class=\"anticon anticon-frown-o\"></i>\n        </div>\n        <div>\n            Ooops, none data to display.\n        </div>\n    ",
                styles: [':host {  padding: 32px;  width: 100%;  color: #999;  font-size: 14px;}:host div {  text-align: center;}:host div i {  font-size: 28px;}:host div + div {  margin-top: 16px;}']
            },] },
];
/** @nocollapse */
MnReqNoDataComponent.ctorParameters = function () { return []; };
exports.MnReqNoDataComponent = MnReqNoDataComponent;
//# sourceMappingURL=mn-req-nodata.component.js.map