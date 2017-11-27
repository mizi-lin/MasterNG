"use strict";
/**
 * https://github.com/xieziyu/angular2-echarts/blob/master/src/directive/angular-echarts.directive.ts
 */
Object.defineProperty(exports, "__esModule", { value: true });
// "echarts": "3.6.2",
// "echarts-wordcloud": "1.1.0",
// "zrender": "3.5.2"
var core_1 = require("@angular/core");
var echarts = require("echarts");
require("echarts-wordcloud/dist/echarts-wordcloud.min");
var mn_echarts_service_1 = require("./mn-echarts.service");
var MnEchartsRenderDirective = (function () {
    function MnEchartsRenderDirective(_ref, _es) {
        var _this = this;
        this._ref = _ref;
        this._es = _es;
        this.result = new core_1.EventEmitter();
        this.chartClick = new core_1.EventEmitter();
        this.chartDblClick = new core_1.EventEmitter();
        this.chartMouseDown = new core_1.EventEmitter();
        this.chartMouseUp = new core_1.EventEmitter();
        this.chartMouseOver = new core_1.EventEmitter();
        this.chartMouseOut = new core_1.EventEmitter();
        this.chartGlobalOut = new core_1.EventEmitter();
        // callback 返回对象
        // ref, $chart, width, height
        this._result = {};
        this._chart = null;
        this.currentWindowWidth = null;
        this._de = mu.debounce(function (_chart, options) {
            // 确保 wordcloud 清理的缓存
            // 但可能会造成内存消耗过大
            // 持续跟踪
            if (mu.prop(options, 'series.0.type') === 'wordCloud') {
                _chart.clear();
            }
            _chart.setOption(options, true);
            _chart.resize();
        }, 300);
        this._result['ref'] = this._ref;
        this.result.emit(this._result);
        var $el = jQuery(this._ref.nativeElement.parentElement);
        $el.mnResize(function () {
            mu.run(_this._chart, function () {
                _this._chart.resize({
                    width: $el.width(),
                    height: $el.height()
                });
            });
        });
    }
    MnEchartsRenderDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        mu.run(this._chart, function () {
            _this._chart.resize();
        });
    };
    MnEchartsRenderDirective.prototype.getWidth = function (elm) {
        if (elm) {
            var $el = jQuery(elm);
            return $el.width() || this.getWidth(elm.parentElement);
        }
        else {
            return 0;
        }
    };
    MnEchartsRenderDirective.prototype.getHeight = function (elm) {
        return elm && (elm.clientHeight || this.getHeight(elm.parentElement));
    };
    MnEchartsRenderDirective.prototype.createChart = function () {
        this.theme = this.theme || 'default';
        this.currentWindowWidth = window.innerWidth;
        var $chart = echarts.init(this._ref.nativeElement);
        this._result['$chart'] = $chart;
        this.result.emit(this._result);
        return $chart;
    };
    MnEchartsRenderDirective.prototype.updateChart = function () {
        var _this = this;
        var _width = 0, _height = 0;
        mu.run(this.getWidth(this._ref.nativeElement), function (width) {
            _width = width;
            _this._ref.nativeElement.style.width = width + 'px';
        });
        mu.run(this.getHeight(this._ref.nativeElement), function (height) {
            _height = height;
            _this._ref.nativeElement.style.height = height + 'px';
        });
        this._result['width'] = _width;
        this._result['height'] = _height;
        this.result.emit(this._result);
        this.options = this._es.adjustOptionsWithLegend(this.options, _width, _height);
        this._de(this._chart, this.options);
    };
    MnEchartsRenderDirective.prototype.onWindowResize = function (event) {
        if (event.target.innerWidth !== this.currentWindowWidth) {
            this.currentWindowWidth = event.target.innerWidth;
            if (this._chart) {
                this._chart.resize();
            }
        }
    };
    MnEchartsRenderDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['dataset']) {
            this.onDatasetChange(this.dataset);
        }
        if (changes['options']) {
            this.onOptionsChange(this.options);
            setTimeout(function () {
                _this.onOptionsChange(_this.options);
                _this.onOptionsChange(_this.options);
                _this.onOptionsChange(_this.options);
            }, 200);
        }
        // -> 空的options, 不渲染echarts
        // mu.run(mu.prop(changes, 'options.currentValue'), (options) => {
        //     this.onOptionsChange(options);
        // });
        // this.onLoadingChange(true);
        if (changes['loading']) {
            this.onLoadingChange(this.loading);
        }
    };
    MnEchartsRenderDirective.prototype.ngOnDestroy = function () {
        if (this._chart) {
            this._chart.dispose();
            this._chart = null;
        }
    };
    MnEchartsRenderDirective.prototype.onOptionsChange = function (opt) {
        if (opt) {
            if (!this._chart) {
                this._chart = this.createChart();
                this.registerEvents(this._chart);
            }
            if (this.hasData()) {
                this.updateChart();
            }
            else if (this.dataset && this.dataset.length) {
                this.mergeDataset(this.dataset);
                this.updateChart();
            }
            else {
                this.updateChart();
            }
        }
    };
    MnEchartsRenderDirective.prototype.onDatasetChange = function (dataset) {
        if (this._chart && this.options) {
            if (!this.options.series) {
                this.options.series = [];
            }
            this.mergeDataset(dataset);
            this.updateChart();
        }
    };
    MnEchartsRenderDirective.prototype.onLoadingChange = function (loading) {
        if (this._chart) {
            if (loading) {
                this._chart.showLoading({
                    text: '',
                    color: 'rgba(48, 127, 255, 0.9)',
                    textColor: '#000',
                    maskColor: 'rgba(255, 255, 255, 0.6)',
                    zlevel: 0
                });
            }
            else {
                this._chart.hideLoading();
            }
        }
    };
    MnEchartsRenderDirective.prototype.mergeDataset = function (dataset) {
        for (var i = 0, len = dataset.length; i < len; i++) {
            if (!this.options.series[i]) {
                this.options.series[i] = { data: dataset[i] };
            }
            else {
                this.options.series[i].data = dataset[i];
            }
        }
    };
    /**
     * method to check if the option has dataset.
     */
    MnEchartsRenderDirective.prototype.hasData = function () {
        if (!this.options.series || !this.options.series.length) {
            return false;
        }
        for (var _i = 0, _a = this.options.series; _i < _a.length; _i++) {
            var serie = _a[_i];
            if (serie.data && serie.data.length > 0) {
                return true;
            }
        }
        return false;
    };
    MnEchartsRenderDirective.prototype.registerEvents = function (_chart) {
        var _this = this;
        if (_chart) {
            // register mouse events:
            _chart.on('click', function (e) {
                _this.chartClick.emit(e);
            });
            _chart.on('dblClick', function (e) {
                _this.chartDblClick.emit(e);
            });
            _chart.on('mousedown', function (e) {
                _this.chartMouseDown.emit(e);
            });
            _chart.on('mouseup', function (e) {
                _this.chartMouseUp.emit(e);
            });
            _chart.on('mouseover', function (e) {
                _this.chartMouseOver.emit(e);
            });
            _chart.on('mouseout', function (e) {
                _this.chartMouseOut.emit(e);
            });
            _chart.on('globalout', function (e) {
                _this.chartGlobalOut.emit(e);
            });
        }
    };
    return MnEchartsRenderDirective;
}());
MnEchartsRenderDirective.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[mn-echarts-render]'
            },] },
];
/** @nocollapse */
MnEchartsRenderDirective.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: mn_echarts_service_1.MnEchartsServices, },
]; };
MnEchartsRenderDirective.propDecorators = {
    'options': [{ type: core_1.Input },],
    'dataset': [{ type: core_1.Input },],
    'theme': [{ type: core_1.Input },],
    'loading': [{ type: core_1.Input },],
    'result': [{ type: core_1.Output },],
    'chartClick': [{ type: core_1.Output },],
    'chartDblClick': [{ type: core_1.Output },],
    'chartMouseDown': [{ type: core_1.Output },],
    'chartMouseUp': [{ type: core_1.Output },],
    'chartMouseOver': [{ type: core_1.Output },],
    'chartMouseOut': [{ type: core_1.Output },],
    'chartGlobalOut': [{ type: core_1.Output },],
    'onWindowResize': [{ type: core_1.HostListener, args: ['window:resize', ['$event'],] },],
};
exports.MnEchartsRenderDirective = MnEchartsRenderDirective;
//# sourceMappingURL=mn-echarts-render.directive.js.map