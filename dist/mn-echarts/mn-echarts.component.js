"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mu = require("mzmu");
var echarts_service_1 = require("./echarts.service");
/**
 * 处理数据，将data转为echart_options
 */
var MnEchartsComponent = (function () {
    function MnEchartsComponent(_serv) {
        this._serv = _serv;
        // -> setting ::: 快捷设置 options 属性
        this.setting = {};
        this.mycharts = new core_1.EventEmitter();
        this.result = new core_1.EventEmitter();
    }
    MnEchartsComponent.prototype.ngOnInit = function () {
    };
    MnEchartsComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        mu.run(mu.prop(changes, 'options.currentValue'), function (options) {
            _this.echarts_options = options;
            _this.result.emit(_this.echarts_options);
        });
        mu.run(mu.prop(changes, 'data.currentValue'), function (data) {
            var result_ = _this._serv.getEchartResult(_this.type, data, _this.setting);
            _this.echarts_options = result_['options'];
            _this.result.emit(result_);
        });
        mu.run(changes['setting'], function (settingListener) {
            if (!settingListener.firstChange) {
                var result_ = _this._serv.getEchartResult(_this.type, _this.data, _this.setting);
                _this.echarts_options = result_['options'];
                _this.result.emit(result_);
            }
        });
        mu.run(changes['type'], function (typeListener) {
            if (!typeListener.firstChange) {
                var result = _this._serv.getEchartResult(_this.type, _this.data, _this.setting);
                _this.echarts_options = result['options'];
                _this.result.emit(result);
            }
        });
    };
    return MnEchartsComponent;
}());
// mycharts_(_mycharts): void {
//     this.mycharts.emit(_mycharts);
// }
MnEchartsComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-echarts',
                template: "\n        <div mn-echarts-render [options]=\"echarts_options\" (mycharts)=\"mycharts.emit($event)\"></div>\n    ",
                styles: [
                    "\n            :host,\n            :host /deep/ [mn-echarts-render] {\n                display: block;\n                width: 100%;\n                height: 100%;\n            }\n            "
                ]
            },] },
];
/** @nocollapse */
MnEchartsComponent.ctorParameters = function () { return [
    { type: echarts_service_1.EchartsService, },
]; };
MnEchartsComponent.propDecorators = {
    'data': [{ type: core_1.Input },],
    'options': [{ type: core_1.Input },],
    'setting': [{ type: core_1.Input },],
    'type': [{ type: core_1.Input },],
    'mycharts': [{ type: core_1.Output },],
    'result': [{ type: core_1.Output },],
};
exports.MnEchartsComponent = MnEchartsComponent;
//# sourceMappingURL=mn-echarts.component.js.map