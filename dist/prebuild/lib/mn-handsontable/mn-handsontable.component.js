"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * use handsontable v0.34
 * must !!!
 * in polyfills.ts
 * before "import 'zone.js/dist/zone'"
 * add import 'handsontable/dist/handsontable'
 */
var Handsontable = require("handsontable");
var MnHandsontableComponent = (function () {
    function MnHandsontableComponent(_ref) {
        this._ref = _ref;
        this.uri = 'aaa';
    }
    MnHandsontableComponent.prototype.ngOnInit = function () {
    };
    MnHandsontableComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        mu.run(this.hot, function (hot) {
            hot.clear();
        });
        mu.run(mu.prop(changes['data'], 'currentValue'), function () {
            _this.hot = new Handsontable(_this.el.nativeElement, {
                data: _this.data,
                rowHeaders: true,
                colHeaders: true
            });
        });
    };
    MnHandsontableComponent.prototype.ngAfterViewInit = function () {
        // const data = [
        //     ['', 'Ford', 'Volvo', 'Toyota', 'Honda'],
        //     ['2016', 10, 11, 12, 13],
        //     ['2017', 20, 11, 14, 13],
        //     ['2018', 30, 15, 12, 13]
        // ];
        //
        // const container = this.el.nativeElement;
        //
        // const hot = new (<any>Handsontable)(container, {
        //     data: data,
        //     rowHeaders: true,
        //     colHeaders: true
        // });
        // let csv = jQuery.csv.fromObjects(data);
        // this.uri = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
    };
    return MnHandsontableComponent;
}());
MnHandsontableComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-handsontable',
                template: "\n        <div #el></div>\n        <!--<a download=\"abc.csv\" [href]=\"uri | trust\">DOWN</a>-->\n    "
            },] },
];
/** @nocollapse */
MnHandsontableComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
]; };
MnHandsontableComponent.propDecorators = {
    'el': [{ type: core_1.ViewChild, args: ['el',] },],
    'data': [{ type: core_1.Input },],
};
exports.MnHandsontableComponent = MnHandsontableComponent;
//# sourceMappingURL=mn-handsontable.component.js.map