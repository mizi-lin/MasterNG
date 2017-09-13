"use strict";
/**
 * https://github.com/xieziyu/angular2-echarts/blob/master/src/directive/angular-echarts.directive.ts
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var echarts = require("echarts");
require("echarts-wordcloud/dist/echarts-wordcloud.min");
var MnEchartsRenderDirective = (function () {
    function MnEchartsRenderDirective(_ref) {
        this._ref = _ref;
        // chart events:
        this.mycharts = new core_1.EventEmitter();
        this.element = new core_1.EventEmitter();
        this.chartClick = new core_1.EventEmitter();
        this.chartDblClick = new core_1.EventEmitter();
        this.chartMouseDown = new core_1.EventEmitter();
        this.chartMouseUp = new core_1.EventEmitter();
        this.chartMouseOver = new core_1.EventEmitter();
        this.chartMouseOut = new core_1.EventEmitter();
        this.chartGlobalOut = new core_1.EventEmitter();
        this._chart = null;
        this.currentWindowWidth = null;
    }
    MnEchartsRenderDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.element.emit(this._ref.nativeElement);
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
        var echarts_ = echarts.init(this._ref.nativeElement);
        this.mycharts.emit(echarts_);
        return echarts_;
    };
    MnEchartsRenderDirective.prototype.updateChart = function () {
        // this._chart.clear();
        var _this = this;
        var width = this.getWidth(this._ref.nativeElement);
        var height = this.getHeight(this._ref.nativeElement);
        mu.run(width || height, function () {
            _this._ref.nativeElement.style.width = width + 'px';
            _this._ref.nativeElement.style.height = height + 'px';
        });
        /**
         * 根据 legend， 调整 grid.top || grid bottom
         */
        // mu.run(mu.prop(this.options, 'legend.show'), () => {
        //     let legend = mu.map(mu.prop(this.options, 'legend.data'), (o) => o.name || o);
        //     let len = legend.join(',').length + 5 * legend.length;
        //     let h = Math.ceil(len * 7 / width) + 1.5;
        //
        //     this.options.grid.bottom = h * 54;
        //
        //     console.debug(this.options.grid.bottom, h, len, width);
        //
        // });
        this._chart.setOption(this.options);
        this._chart.resize();
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
        if (changes['dataset']) {
            this.onDatasetChange(this.dataset);
        }
        if (changes['options']) {
            this.onOptionsChange(this.options);
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
                // register events:
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
    MnEchartsRenderDirective.prototype.registerEvents = function (myChart) {
        var _this = this;
        if (myChart) {
            // register mouse events:
            myChart.on('click', function (e) {
                _this.chartClick.emit(e);
            });
            myChart.on('dblClick', function (e) {
                _this.chartDblClick.emit(e);
            });
            myChart.on('mousedown', function (e) {
                _this.chartMouseDown.emit(e);
            });
            myChart.on('mouseup', function (e) {
                _this.chartMouseUp.emit(e);
            });
            myChart.on('mouseover', function (e) {
                _this.chartMouseOver.emit(e);
            });
            myChart.on('mouseout', function (e) {
                _this.chartMouseOut.emit(e);
            });
            myChart.on('globalout', function (e) {
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
]; };
MnEchartsRenderDirective.propDecorators = {
    'options': [{ type: core_1.Input },],
    'dataset': [{ type: core_1.Input },],
    'theme': [{ type: core_1.Input },],
    'loading': [{ type: core_1.Input },],
    'mycharts': [{ type: core_1.Output },],
    'element': [{ type: core_1.Output },],
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