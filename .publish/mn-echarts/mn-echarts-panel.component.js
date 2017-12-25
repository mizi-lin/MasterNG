"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_echarts_service_1 = require("./mn-echarts.service");
require("../assets/jquery.resize.js");
var mn_file_saver_services_1 = require("../mn-common/services/mn-file-saver.services");
var MnEchartsPanelComponent = (function () {
    function MnEchartsPanelComponent(_es, _mnFileSaverServ, _ref) {
        var _this = this;
        this._es = _es;
        this._mnFileSaverServ = _mnFileSaverServ;
        this._ref = _ref;
        this.filename = 'MasterNg';
        /**
             * show_tools
             * show, toggle
             */
        this.show_tools = 'show';
        // 让控件支持高度100%
        // height percent hundred
        this.hph = true;
        this.result = new core_1.EventEmitter();
        this.chartClick = new core_1.EventEmitter();
        this.chartDblClick = new core_1.EventEmitter();
        this.chartMouseDown = new core_1.EventEmitter();
        this.chartMouseUp = new core_1.EventEmitter();
        this.chartMouseOver = new core_1.EventEmitter();
        this.chartMouseOut = new core_1.EventEmitter();
        this.chartGlobalOut = new core_1.EventEmitter();
        this._show_dataView = false;
        // fullscreen, download, data_view, line, bar, exchange, rate, label_all, legend, reload
        this._tools = [];
        this._dataView = [];
        this.statusMap = {};
        this.toolMap = {};
        this.hide_title = false;
        this.def = {};
        this.fullScreenClick = function (full, $event) {
            var $el = jQuery(_this._panel.nativeElement);
            $el.mnResize(function () {
                _this._chart.resize({
                    width: $el.width(),
                    height: $el.height()
                });
            });
            // 自定义方法
            mu.run(_this.toolMap['fullscreen'].click, function (fn) { return fn(full, $event); });
            _this.setStatus('fullScreenClick');
        };
        if (this._ref.nativeElement.nodeName === 'ECHARTS-BOX') {
            this.hide_title = true;
        }
        this._config = this._es.getConfig();
    }
    MnEchartsPanelComponent.prototype._reqResult = function ($event) {
        return $event.data;
    };
    Object.defineProperty(MnEchartsPanelComponent.prototype, "getHph", {
        get: function () {
            return this.hph === true ? '100%' : this.hph === false ? 'auto' : this.hph;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnEchartsPanelComponent.prototype, "title", {
        set: function (v) {
            var _this = this;
            this._title = v || '';
            var _a = this._title.split('::'), parent = _a[0], sub = _a[1];
            mu.run(parent || sub, function () {
                _this._title = parent + mu.run(sub, function (sub) { return "<small>" + sub + "</small>"; }, function () { return ''; });
            });
        },
        enumerable: true,
        configurable: true
    });
    MnEchartsPanelComponent.prototype.setStatus = function (fnKey, bool) {
        this.statusMap[fnKey] = mu.ifnvl(bool, !this.statusMap[fnKey]);
    };
    MnEchartsPanelComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        /**
                 * show_tools 设置值
                 */
        mu.empty(mu.prop(changes, 'show_tools.currentValue'), function () {
            if (_this._config.show_tools) {
                _this.show_tools = _this._config.show_tools;
            }
        });
        mu.exist(changes['setting'], function (changes_setting) {
            if (changes_setting.first) {
                _this._src_setting = mu.clone(_this.setting);
            }
            _this.setting.__where__ = _this.where;
        });
        mu.exist(changes['type'], function (type_changes) {
            if (type_changes.firstChange) {
                _this._src_type = type_changes.currentValue;
                mu.empty(_this.toolMap, function () {
                    if (_this._config.toolbars) {
                        _this.toolMap = _this._getToolMap(_this._config[type_changes.currentValue]);
                        mu.run(_this.toolMap['fullscreen'], function (o) {
                            _this._tools.push({
                                name: 'fullscreen',
                                click: _this.fullScreenClick,
                                order: o.order
                            });
                        });
                    }
                });
            }
        });
        mu.exist(changes['tools'], function () {
            _this.toolMap = _this._getToolMap(_this.tools);
            mu.run(_this.toolMap['fullscreen'], function (o) {
                _this._tools.push({
                    name: 'fullscreen',
                    click: _this.fullScreenClick,
                    order: o.order
                });
            });
        });
    };
    MnEchartsPanelComponent.prototype._result = function (rst) {
        this._options = rst.options;
        this._dataView = rst.dataView;
        this._source = rst.source;
        this._chart = rst.$chart;
        this.result.emit(rst);
    };
    MnEchartsPanelComponent.prototype._getToolMap = function (maps) {
        if (maps === void 0) { maps = []; }
        return mu.map(maps, function (key, i) {
            if (typeof key === 'string') {
                key = {
                    name: key
                };
            }
            key.order = key.order || (i + 1) * 10;
            // key.click = key.click || mu.noop;
            key._click = function ($event) {
                if (key.click) {
                    return key.click($event);
                }
            };
            return {
                __key__: key.name,
                __val__: key
            };
        }, {});
    };
    MnEchartsPanelComponent.prototype.download_click = function ($event) {
        var content = this._mnFileSaverServ.csvData(this._dataView);
        // console.debug(content);
        this._mnFileSaverServ.fileSaver([content], this.filename + ('_' + +new Date()) + '.csv');
    };
    MnEchartsPanelComponent.prototype.dataView_click = function ($event) {
        this._show_dataView = !this._show_dataView;
        this.setStatus('dataView_click');
    };
    MnEchartsPanelComponent.prototype.line_click = function ($event) {
        this.type = 'line' === this.type ? this._src_type : 'line';
        this.setStatus('line_click');
    };
    MnEchartsPanelComponent.prototype.bar_click = function ($event) {
        this.type = 'bar' === this.type ? this._src_type : 'bar';
        this.setStatus('bar_click');
    };
    MnEchartsPanelComponent.prototype.exchange_click = function ($event) {
        this.setting = mu.clone(this.setting || {});
        this.setting.xy_exchange = !this.setting.xy_exchange;
        this.setStatus('exchange_click');
    };
    /**
     * 百分比结构图
     * @param $event
     */
    /**
         * 百分比结构图
         * @param $event
         */
    MnEchartsPanelComponent.prototype.precent_rate_click = /**
         * 百分比结构图
         * @param $event
         */
    function ($event) {
        this.setting = mu.clone(this.setting || {});
        this.setting.percent_rate = !this.setting.percent_rate;
        this.setting.yAxis_value_percent = !this.setting.yAxis_value_percent;
        this.setStatus('precent_rate_click');
    };
    MnEchartsPanelComponent.prototype.label_show_all_click = function ($event) {
        this.setting = mu.clone(this.setting || {});
        this.setting.rotate = this.setting.rotate ? 0 : 30;
        this.setStatus('label_show_all_click');
    };
    MnEchartsPanelComponent.prototype.legend_show_click = function ($event) {
        this.setting = mu.clone(this.setting || {});
        this.setting.legend_show = !this._options.legend.show;
        this.setStatus('legend_show_click');
    };
    MnEchartsPanelComponent.prototype.reload_click = function ($event) {
        this.req = mu.clone(this.req);
        this.setStatus('reload_click');
    };
    MnEchartsPanelComponent.prototype.sortClick = function (legend) {
        this._sort = this._sort === 'desc' ? 'asc' : 'desc';
        this.setting = mu.clone(this.setting || {});
        this.setting.legend_show = true;
        this.setting.sort = legend + ":" + this._sort;
        this.setting.zero = false;
        this.setting.sort_all = false;
        this.setStatus('sortClick', true);
        this._dropDownResult.hide();
    };
    MnEchartsPanelComponent.prototype.sortAllClick = function () {
        this._sort = this._sort === 'desc' ? 'asc' : 'desc';
        this.setting = mu.clone(this.setting || {});
        this.setting.sort = mu.prop(this._options, 'legend.data.0.name') + ":" + this._sort;
        this.setting.sort_all = true;
        this.setting.zero = false;
        this.setStatus('sortClick', true);
        this._dropDownResult.hide();
    };
    MnEchartsPanelComponent.prototype.clearSortClick = function ($event) {
        this.setting = mu.clone(this.setting || {});
        this.setting.sort = void 0;
        this.setting.zero = void 0;
        this.setStatus('sortClick', false);
        this._dropDownResult.hide();
    };
    MnEchartsPanelComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'mn-echarts-panel, mn-echarts-box',
                    styles: ['mn-echarts-panel,mn-echarts-box {  display: block;  width: 100%;}mn-echarts-panel mn-panel-body,mn-echarts-box mn-panel-body {  padding: 0;}mn-echarts-panel mn-req,mn-echarts-box mn-req {  padding: 16px;}mn-echarts-panel .mn-dataView,mn-echarts-box .mn-dataView {  position: absolute;  top: 0;  right: 0;  bottom: 0;  left: 0;  background: #fff;  z-index: 9;  padding: 16px;  overflow: auto;}mn-echarts-panel mn-panel-toolbar,mn-echarts-box mn-panel-toolbar {  color: #999;}mn-echarts-panel mn-panel-toolbar.toggle,mn-echarts-box mn-panel-toolbar.toggle {  display: none;}mn-echarts-panel:hover mn-panel-toolbar.toggle,mn-echarts-box:hover mn-panel-toolbar.toggle {  display: block;}mn-echarts-box mn-panel-header {  position: absolute;  width: 100%;  visibility: visible;  z-index: 200;  border-bottom: 1px transparent solid;  pointer-events: none;}mn-echarts-box mn-panel-header mn-panel-toolbar {  pointer-events: auto;}mn-echarts-box mn-panel-body {  height: 100%;}@font-face {  font-family: \'iconfont\';  /* project id 465572 */  src: url(\'//at.alicdn.com/t/font_465572_ycms8h6pp6wdn29.eot\');  src: url(\'//at.alicdn.com/t/font_465572_ycms8h6pp6wdn29.eot?#iefix\') format(\'embedded-opentype\'), url(\'//at.alicdn.com/t/font_465572_ycms8h6pp6wdn29.woff\') format(\'woff\'), url(\'//at.alicdn.com/t/font_465572_ycms8h6pp6wdn29.ttf\') format(\'truetype\'), url(\'//at.alicdn.com/t/font_465572_ycms8h6pp6wdn29.svg#iconfont\') format(\'svg\');}.iconfont {  font-family: "iconfont" !important;  font-size: 16px;  font-style: normal;  -webkit-font-smoothing: antialiased;  -moz-osx-font-smoothing: grayscale;}.icon-suoxiao:before {  content: "\\\e600";}.icon-table:before {  content: "\\\e60d";}.icon-xiazai:before {  content: "\\\e643";}.icon-sort-copy:before {  content: "\\\e605";}.icon-fangda:before {  content: "\\\e616";}.icon-shuaxin:before {  content: "\\\e6e5";}.icon-bar:before {  content: "\\\e604";}.icon-percent:before {  content: "\\\e6f0";}.icon-yincang:before {  content: "\\\e67f";}.icon-liebiaodanchu:before {  content: "\\\e634";}.icon-rotate:before {  content: "\\\e6b4";}'],
                    encapsulation: core_1.ViewEncapsulation.None,
                    template: "\n        <mn-panel [hph]=\"true\">\n            <mn-panel-header>\n                <mn-panel-title [innerHTML]=\"_title\"></mn-panel-title>\n                <mn-panel-toolbar [tools]=\"_tools\" [class.toggle]=\"show_tools === 'toggle'\">\n\n                    <ng-template [ngIf]=\"toolMap['download']\">\n                        <mn-col (click)=\"download_click($event)\"\n                                [order]=\"toolMap['download'].order\">\n                            <i class=\"icon iconfont icon-xiazai\" mnTooltip=\"download\"></i>\n                        </mn-col>\n                    </ng-template>\n\n                    <ng-template [ngIf]=\"toolMap['data_view']\">\n                        <mn-col (click)=\"dataView_click($event)\"\n                                [order]=\"toolMap['data_view'].order\"\n                                [class.active]=\"statusMap.dataView_click\">\n                            <i class=\"icon iconfont icon-table\" mnTooltip=\"table\"></i>\n                        </mn-col>\n                    </ng-template>\n\n                    <ng-template [ngIf]=\"toolMap['line']\">\n                        <mn-col *ngIf=\"_src_type | mu:'or':'bar'\"\n                                (click)=\"line_click($event)\"\n                                [order]=\"toolMap['line'].order\"\n                                [class.active]=\"statusMap.line_click\">\n                            <i class=\"fa fa-line-chart\" mnTooltip=\"line chart\"></i>\n                        </mn-col>\n                    </ng-template>\n\n                    <ng-template [ngIf]=\"toolMap['bar']\">\n                        <mn-col *ngIf=\"_src_type | mu:'or':'line'\"\n                                (click)=\"bar_click($event)\"\n                                [order]=\"toolMap['bar'].order\"\n                                [class.active]=\"statusMap.bar_click\">\n                            <i class=\"icon iconfont icon-bar\" mnTooltip=\"bar chart\"></i>\n                        </mn-col>\n                    </ng-template>\n\n                    <ng-template [ngIf]=\"toolMap['exchange']\">\n                        <mn-col *ngIf=\"_src_type | mu:'or':'line':'bar'\"\n                                (click)=\"exchange_click($event)\"\n                                [order]=\"toolMap['exchange'].order\"\n                                [class.active]=\"statusMap.exchange_click\">\n                            <i class=\"icon iconfont icon-rotate\" mnTooltip=\"rotate\"></i>\n                        </mn-col>\n                    </ng-template>\n\n                    <ng-template [ngIf]=\"toolMap['rate']\">\n                        <mn-col *ngIf=\"_src_type | mu:'or':'line':'bar'\"\n                                (click)=\"precent_rate_click($event)\"\n                                [order]=\"toolMap['rate'].order\"\n                                [class.active]=\"statusMap.precent_rate_click\">\n                            <i class=\"icon iconfont icon-percent\" mnTooltip=\"percentage\"></i>\n                        </mn-col>\n                    </ng-template>\n\n                    <ng-template [ngIf]=\"toolMap['label_all']\">\n                        <mn-col *ngIf=\"_src_type | mu:'or':'line':'bar'\"\n                                (click)=\"label_show_all_click($event)\"\n                                [order]=\"toolMap['label_all'].order\"\n                                [class.active]=\"statusMap.label_show_all_click\">\n                            <i class=\"icon iconfont icon-liebiaodanchu\" mnTooltip=\"show all\"></i>\n                        </mn-col>\n                    </ng-template>\n\n                    <ng-template [ngIf]=\"toolMap['legend']\">\n                        <mn-col (click)=\"legend_show_click($event)\"\n                                [order]=\"toolMap['legend'].order\"\n                                [class.active]=\"statusMap.legend_show_click\">\n                            <i class=\"icon iconfont icon-yincang\" mnTooltip=\"show/hide legends\"></i>\n                        </mn-col>\n                    </ng-template>\n\n                    <ng-template [ngIf]=\"toolMap['sort']\">\n                        <mn-col [order]=\"toolMap['sort'].order\"\n                                [class.active]=\"statusMap.sortClick\">\n                            <mn-dropdown (mnResult)=\"_dropDownResult = $event\">\n                                <i class=\"icon iconfont icon-sort-copy\" mnTooltip=\"icon-sort-copy\"></i>\n                                <mn-dropdown-content>\n                                    <ol class=\"mnc-list\">\n                                        <li (click)=\"sortAllClick($event)\">\n                                            By All\n                                        </li>\n                                        <li class=\"mnc-divider\"></li>\n                                        <li *ngFor=\"let legend of _options?.legend?.data\"\n                                            (click)=\"sortClick(legend.name, $event)\">\n                                            By {{legend.name}}\n                                        </li>\n                                        <li class=\"mnc-divider\"></li>\n                                        <li (click)=\"clearSortClick($event)\">\n                                            Clear\n                                        </li>\n                                    </ol>\n                                </mn-dropdown-content>\n                            </mn-dropdown>\n                        </mn-col>\n                    </ng-template>\n\n                    <ng-template [ngIf]=\"toolMap['reload']\">\n                        <mn-col (click)=\"reload_click($event)\"\n                                [order]=\"toolMap['reload'].order\">\n                            <i class=\"icon iconfont icon-shuaxin\" mnTooltip=\"refresh\"></i>\n                        </mn-col>\n                    </ng-template>\n                </mn-panel-toolbar>\n            </mn-panel-header>\n            <mn-panel-body>\n                <mn-req #panel\n                        [loader]=\"loader\"\n                        [loaderStyle]=\"loaderStyle\"\n                        [req]=\"req\"\n                        (result)=\"_data = _reqResult($event.data, $event) || $event.data\">\n\n                    <div class=\"mn-dataView\" *ngIf=\"_show_dataView\">\n                        <table class=\"table bordered td-top-bd td-left-bd\">\n                            <tbody>\n                                <tr *ngFor=\"let dd of _dataView\">\n                                    <td *ngFor=\"let d of dd\">\n                                        {{d || '-' | mu:'format'}}\n                                    </td>\n                                </tr>\n                            </tbody>\n                        </table>\n                    </div>\n\n                    <mn-echarts [style.height]=\"height\"\n                                [setting]=\"setting\"\n                                [options]=\"options\"\n                                [type]=\"type\"\n                                [data]=\"_data || data\"\n                                (chartClick)=\"chartClick.emit($event)\"\n                                (chartDblClick)=\"chartDblClick.emit($event)\"\n                                (chartMouseDown)=\"chartMouseDown.emit($event)\"\n                                (chartMouseUp)=\"chartMouseUp.emit($event)\"\n                                (chartMouseOver)=\"chartMouseOver.emit($event)\"\n                                (chartMouseOut)=\"chartMouseOut.emit($event)\"\n                                (chartGlobalOut)=\"chartGlobalOut.emit($event)\"\n                                (result)=\"_result($event)\"></mn-echarts>\n\n                </mn-req>\n            </mn-panel-body>\n        </mn-panel>\n    "
                },] },
    ];
    /** @nocollapse */
    MnEchartsPanelComponent.ctorParameters = function () { return [
        { type: mn_echarts_service_1.MnEchartsServices, },
        { type: mn_file_saver_services_1.MnFileSaverServices, },
        { type: core_1.ElementRef, },
    ]; };
    MnEchartsPanelComponent.propDecorators = {
        "_panel": [{ type: core_1.ViewChild, args: ['panel', { read: core_1.ElementRef },] },],
        "req": [{ type: core_1.Input },],
        "type": [{ type: core_1.Input },],
        "height": [{ type: core_1.Input },],
        "options": [{ type: core_1.Input },],
        "setting": [{ type: core_1.Input },],
        "where": [{ type: core_1.Input },],
        "tools": [{ type: core_1.Input },],
        "filename": [{ type: core_1.Input },],
        "loader": [{ type: core_1.Input },],
        "loaderStyle": [{ type: core_1.Input },],
        "_reqResult": [{ type: core_1.Input, args: ['mnReqResult',] },],
        "show_tools": [{ type: core_1.Input },],
        "data": [{ type: core_1.Input },],
        "hph": [{ type: core_1.Input },],
        "getHph": [{ type: core_1.HostBinding, args: ['style.height',] },],
        "title": [{ type: core_1.Input },],
        "result": [{ type: core_1.Output },],
        "chartClick": [{ type: core_1.Output },],
        "chartDblClick": [{ type: core_1.Output },],
        "chartMouseDown": [{ type: core_1.Output },],
        "chartMouseUp": [{ type: core_1.Output },],
        "chartMouseOver": [{ type: core_1.Output },],
        "chartMouseOut": [{ type: core_1.Output },],
        "chartGlobalOut": [{ type: core_1.Output },],
    };
    return MnEchartsPanelComponent;
}());
exports.MnEchartsPanelComponent = MnEchartsPanelComponent;
//# sourceMappingURL=mn-echarts-panel.component.js.map