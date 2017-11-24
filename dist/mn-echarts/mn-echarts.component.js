"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mu = require("mzmu");
var mn_echarts_service_1 = require("./mn-echarts.service");
/**
 * 处理数据，将data转为echart_options
 */
var MnEchartsComponent = (function () {
    function MnEchartsComponent(_es) {
        this._es = _es;
        // -> setting ::: 快捷设置 options 属性
        this.setting = {};
        this.result = new core_1.EventEmitter();
        this.chartClick = new core_1.EventEmitter();
        this.chartDblClick = new core_1.EventEmitter();
        this.chartMouseDown = new core_1.EventEmitter();
        this.chartMouseUp = new core_1.EventEmitter();
        this.chartMouseOver = new core_1.EventEmitter();
        this.chartMouseOut = new core_1.EventEmitter();
        this.chartGlobalOut = new core_1.EventEmitter();
        this._result = {};
    }
    MnEchartsComponent.prototype.ngOnInit = function () {
    };
    MnEchartsComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        mu.run(mu.prop(changes, 'options.currentValue'), function (options) {
            _this.echarts_options = options;
            _this._result['options'] = options;
            _this.result.emit(_this._result);
        });
        mu.run(mu.prop(changes, 'data.currentValue'), function (data) {
            var result_ = _this._es.getEchartResult(_this.type, data, _this.setting);
            _this.echarts_options = result_['options'];
            _this._result.source = mu.clone(_this.data);
            _this._result = mu.extend(_this._result, result_);
            _this.result.emit(_this._result);
        });
        mu.run(changes['setting'], function (settingListener) {
            if (!settingListener.firstChange) {
                var result_ = _this._es.getEchartResult(_this.type, _this.data, _this.setting);
                _this.echarts_options = result_['options'];
                _this._result.source = mu.clone(_this.data);
                _this._result = mu.extend(_this._result, result_);
                _this.result.emit(_this._result);
            }
        });
        mu.run(changes['type'], function (typeListener) {
            if (!typeListener.firstChange) {
                var result_ = _this._es.getEchartResult(_this.type, _this.data, _this.setting);
                _this.echarts_options = result_['options'];
                _this._result.source = mu.clone(_this.data);
                _this._result = mu.extend(_this._result, result_);
                _this.result.emit(_this._result);
            }
        });
    };
    MnEchartsComponent.prototype.getRenderResult = function (rst) {
        this._result = mu.extend(this._result, rst);
        this.result.emit(this._result);
    };
    return MnEchartsComponent;
}());
MnEchartsComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-echarts',
                template: "\n        <div \n                mn-echarts-render \n                [options]=\"echarts_options\" \n                (chartClick)=\"chartClick.emit($event)\"\n                (chartDblClick)=\"chartDblClick.emit($event)\"\n                (chartMouseDown)=\"chartMouseDown.emit($event)\"\n                (chartMouseUp)=\"chartMouseUp.emit($event)\"\n                (chartMouseOver)=\"chartMouseOver.emit($event)\"\n                (chartMouseOut)=\"chartMouseOut.emit($event)\"\n                (chartGlobalOut)=\"chartGlobalOut.emit($event)\"\n                (result)=\"getRenderResult($event)\"></div>\n    ",
                styles: [
                    "\n            :host,\n            :host ::ng-deep [mn-echarts-render] {\n                display: block;\n                width: 100%;\n                height: 100%;\n            }\n            "
                ]
            },] },
];
/** @nocollapse */
MnEchartsComponent.ctorParameters = function () { return [
    { type: mn_echarts_service_1.MnEchartsService, },
]; };
MnEchartsComponent.propDecorators = {
    'data': [{ type: core_1.Input },],
    'options': [{ type: core_1.Input },],
    'setting': [{ type: core_1.Input },],
    'type': [{ type: core_1.Input },],
    'result': [{ type: core_1.Output },],
    'chartClick': [{ type: core_1.Output },],
    'chartDblClick': [{ type: core_1.Output },],
    'chartMouseDown': [{ type: core_1.Output },],
    'chartMouseUp': [{ type: core_1.Output },],
    'chartMouseOver': [{ type: core_1.Output },],
    'chartMouseOut': [{ type: core_1.Output },],
    'chartGlobalOut': [{ type: core_1.Output },],
};
exports.MnEchartsComponent = MnEchartsComponent;
//# sourceMappingURL=mn-echarts.component.js.map