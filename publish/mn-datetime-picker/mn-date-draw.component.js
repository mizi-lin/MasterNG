"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
/**
 * 构建日期视图
 */
var MnDateDrawComponent = (function () {
    function MnDateDrawComponent() {
    }
    MnDateDrawComponent.prototype.ngOnInit = function () {
        this._frames = this.buildFrame(this._view);
    };
    /**
     * 根据不同的视图，创建时间集合架子
     */
    /**
         * 根据不同的视图，创建时间集合架子
         */
    MnDateDrawComponent.prototype.buildFrame = /**
         * 根据不同的视图，创建时间集合架子
         */
    function (view) {
        switch (view) {
            // 年视图
            // 5 年视图
            // row 5 col 4
            case 'years':
                return mu.map(10, function (i) {
                    return new Array(5);
                }, []);
            // 季度视图
            // 5 年视图
            // row 5 col 4
            case 'quarter':
                return mu.map(5, function (i) {
                    return new Array(4);
                }, []);
            // 月视图
            // row 4 col 3
            case 'months':
                return mu.map(4, function (i) {
                    return new Array(3);
                }, []);
            // 周视图
            // 当年周数
            // row 7 col 8
            case 'weeks':
                return mu.map(7, function (i) {
                    return new Array(8);
                }, []);
            // 日视图
            case 'days':
                return mu.map(6, function (i) {
                    return new Array(7);
                }, []);
        }
    };
    MnDateDrawComponent.prototype.fillFrame = function (frame) {
        return [];
    };
    MnDateDrawComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'mn-datedraw',
                    template: "\n        <section>\n            <mn-fill [gutter]=\"2\" *ngFor=\"let rows of _frames\">\n                <mn-col [span]=\"1\" *ngFor=\"let col of rows\">\n                    1\n                </mn-col>\n            </mn-fill>\n        </section>\n    "
                },] },
    ];
    /** @nocollapse */
    MnDateDrawComponent.ctorParameters = function () { return []; };
    MnDateDrawComponent.propDecorators = {
        "_maxDate": [{ type: core_1.Input },],
        "_minDate": [{ type: core_1.Input },],
        "_year": [{ type: core_1.Input },],
        "_month": [{ type: core_1.Input },],
        "_view": [{ type: core_1.Input, args: ['mnView',] },],
    };
    return MnDateDrawComponent;
}());
exports.MnDateDrawComponent = MnDateDrawComponent;
//# sourceMappingURL=mn-date-draw.component.js.map