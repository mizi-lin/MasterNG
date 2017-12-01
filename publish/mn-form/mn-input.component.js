"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MnInputComponent = (function () {
    function MnInputComponent() {
        this.mnType = 'text';
        this.mnDisabled = false;
        this.mnReadonly = false;
        this.mnBlur = new core_1.EventEmitter();
        this.mnFocus = new core_1.EventEmitter();
        this.mnClick = new core_1.EventEmitter();
    }
    MnInputComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(MnInputComponent.prototype, "_mnValue", {
        set: function (value) {
            this.mnValue = mu.ifnvl(value, '');
        },
        enumerable: true,
        configurable: true
    });
    // get mnValue(): any {
    //     return this._value;
    // }
    //
    // set mnValue(value: any) {
    //     mu.run(value, v => this._value = v);
    // }
    MnInputComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'mn-input',
                    template: "\n        <mn-fill>\n            <mn-col [order]=\"1\">\n                <ng-content select=\".mnc-prev\"></ng-content>\n            </mn-col>\n            <mn-col [order]=\"2\" [span]=\"1\" [style.position]=\"'relative'\">\n                <input\n                        [attr.name]=\"mnName\"\n                        [attr.type]=\"mnType\"\n                        [attr.id]=\"mnId\"\n                        [attr.placeholder]=\"mnPlaceHolder\"\n                        [disabled]=\"mnDisabled\"\n                        [readonly]=\"mnReadonly\"\n                        [value]=\"mnValue\"\n                        (blur)=\"mnBlur.emit($event)\"\n                        (focus)=\"mnFocus.emit($event)\"\n                        (click)=\"mnClick.emit($event)\"\n                        class=\"mn-input\">\n            </mn-col>\n            <mn-col [order]=\"3\">\n                <ng-content select=\".mnc-next\"></ng-content>\n            </mn-col>\n        </mn-fill>\n    ",
                    encapsulation: core_1.ViewEncapsulation.None,
                    styles: ['mn-input {  display: inline-block;  height: 32px;  border: 1px solid #dedede;  border-radius: 2px;}mn-input input {  position: absolute;  width: 100%;  height: 100%;  padding: 2px 4px;  margin: 0;  border: none;  outline: none;  vertical-align: middle;}mn-input .mnc-next,mn-input .mnc-prev {  display: inline-block;  padding: 0 8px;  vertical-align: middle;  font-size: 14px;  line-height: 30px;}']
                },] },
    ];
    /** @nocollapse */
    MnInputComponent.ctorParameters = function () { return []; };
    MnInputComponent.propDecorators = {
        "mnPlaceHolder": [{ type: core_1.Input },],
        "mnType": [{ type: core_1.Input },],
        "mnId": [{ type: core_1.Input },],
        "mnName": [{ type: core_1.Input },],
        "mnDisabled": [{ type: core_1.Input },],
        "mnReadonly": [{ type: core_1.Input },],
        "mnBlur": [{ type: core_1.Output },],
        "mnFocus": [{ type: core_1.Output },],
        "mnClick": [{ type: core_1.Output },],
        "_mnValue": [{ type: core_1.Input, args: ['mnValue',] },],
    };
    return MnInputComponent;
}());
exports.MnInputComponent = MnInputComponent;
//# sourceMappingURL=mn-input.component.js.map