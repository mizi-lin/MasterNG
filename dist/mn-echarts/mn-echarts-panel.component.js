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
        this.fullscreen_click = function (full, $event) {
            var $el = jQuery(_this._panel.nativeElement);
            $el.mnResize(function () {
                _this._chart.resize({
                    width: $el.width(),
                    height: $el.height()
                });
            });
            // 自定义方法
            mu.run(_this.toolMap['fullscreen'].click, function (fn) { return fn(full, $event); });
            _this.setStatus('fullscreen_click');
        };
        if (this._ref.nativeElement.nodeName === 'ECHARTS-BOX') {
            this.hide_title = true;
        }
        this._config = this._es.getConfig();
    }
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
                                click: _this.fullscreen_click,
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
                    click: _this.fullscreen_click,
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
        this._mnFileSaverServ.fileSaver([content], this.filename + '.csv');
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
    MnEchartsPanelComponent.prototype.precent_rate_click = function ($event) {
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
    MnEchartsPanelComponent.prototype.sort_click = function (legend) {
        this._sort = this._sort === 'desc' ? 'asc' : 'desc';
        this.setting = mu.clone(this.setting || {});
        this.setting.legend_show = true;
        this.setting.sort = legend + ":" + this._sort;
        this.setting.zero = false;
        this.setting.sort_all = false;
        this.setStatus('sort_click', true);
    };
    MnEchartsPanelComponent.prototype.sort_all_click = function () {
        this._sort = this._sort === 'desc' ? 'asc' : 'desc';
        this.setting = mu.clone(this.setting || {});
        this.setting.sort = mu.prop(this._options, 'legend.data.0.name') + ":" + this._sort;
        this.setting.sort_all = true;
        this.setting.zero = false;
        this.setStatus('sort_click', true);
    };
    MnEchartsPanelComponent.prototype.clear_sort_click = function ($event) {
        this.setting = mu.clone(this.setting || {});
        this.setting.sort = void 0;
        this.setting.zero = void 0;
        this.setStatus('sort_click', false);
    };
    return MnEchartsPanelComponent;
}());
MnEchartsPanelComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-echarts-panel, mn-echarts-box',
                styles: [':host {  display: block;  width: 100%;}:host::ng-deep mn-panel-body {  padding: 0;}:host::ng-deep mn-req {  padding: 16px;}:host::ng-deep .mn-dataView {  position: absolute;  top: 0;  right: 0;  bottom: 0;  left: 0;  background: #fff;  z-index: 9;  padding: 16px;  overflow: auto;}:host::ng-deep nz-dropdown a {  color: inherit;}:host::ng-deep mn-panel-toolbar.toggle {  display: none;}:host::ng-deep:hover mn-panel-toolbar.toggle {  display: block;}:host(mn-echarts-box) ::ng-deep mn-panel-header {  position: absolute;  width: 100%;  visibility: visible;  z-index: 200;  border-bottom: 1px transparent solid;  pointer-events: none;}:host(mn-echarts-box) ::ng-deep mn-panel-header mn-panel-toolbar {  pointer-events: auto;}:host(mn-echarts-box) ::ng-deep mn-panel-body {  height: 100%;}'],
                template: "\n        <mn-panel [hph]=\"true\">\n            <mn-panel-header>\n                <mn-panel-title [innerHTML]=\"_title\"></mn-panel-title>\n                <mn-panel-toolbar [tools]=\"_tools\" [class.toggle]=\"show_tools === 'toggle'\">\n\n                    <ng-template [ngIf]=\"toolMap['download']\">\n                        <mn-col (click)=\"download_click($event)\"\n                                [order]=\"toolMap['download'].order\">\n                            <i class=\"fa fa-download\"></i>\n                        </mn-col>\n                    </ng-template>\n\n                    <ng-template [ngIf]=\"toolMap['data_view']\">\n                        <mn-col (click)=\"dataView_click($event)\"\n                                [order]=\"toolMap['data_view'].order\"\n                                [class.active]=\"statusMap.dataView_click\">\n                            <i class=\"fa fa-database\"></i>\n                        </mn-col>\n                    </ng-template>\n\n                    <ng-template [ngIf]=\"toolMap['line']\">\n                        <mn-col *ngIf=\"_src_type | mu:'or':'bar'\"\n                                (click)=\"line_click($event)\"\n                                [order]=\"toolMap['line'].order\"\n                                [class.active]=\"statusMap.line_click\">\n                            <i class=\"fa fa-line-chart\"></i>\n                        </mn-col>\n                    </ng-template>\n\n                    <ng-template [ngIf]=\"toolMap['bar']\">\n                        <mn-col *ngIf=\"_src_type | mu:'or':'line'\"\n                                (click)=\"bar_click($event)\"\n                                [order]=\"toolMap['bar'].order\"\n                                [class.active]=\"statusMap.bar_click\">\n                            <i class=\"fa fa-bar-chart\"></i>\n                        </mn-col>\n                    </ng-template>\n\n                    <ng-template [ngIf]=\"toolMap['exchange']\">\n                        <mn-col *ngIf=\"_src_type | mu:'or':'line':'bar'\"\n                                (click)=\"exchange_click($event)\"\n                                [order]=\"toolMap['exchange'].order\"\n                                [class.active]=\"statusMap.exchange_click\">\n                            <i class=\"fa fa-retweet\"></i>\n                        </mn-col>\n                    </ng-template>\n\n                    <ng-template [ngIf]=\"toolMap['rate']\">\n                        <mn-col *ngIf=\"_src_type | mu:'or':'line':'bar'\"\n                                (click)=\"precent_rate_click($event)\"\n                                [order]=\"toolMap['rate'].order\"\n                                [class.active]=\"statusMap.precent_rate_click\">\n                            <i class=\"fa fa-align-justify\"></i>\n                        </mn-col>\n                    </ng-template>\n\n                    <ng-template [ngIf]=\"toolMap['label_all']\">\n                        <mn-col *ngIf=\"_src_type | mu:'or':'line':'bar'\"\n                                (click)=\"label_show_all_click($event)\"\n                                [order]=\"toolMap['label_all'].order\"\n                                [class.active]=\"statusMap.label_show_all_click\">\n                            <i class=\"fa fa-ellipsis-h\"></i>\n                        </mn-col>\n                    </ng-template>\n\n                    <ng-template [ngIf]=\"toolMap['legend']\">\n                        <mn-col (click)=\"legend_show_click($event)\"\n                                [order]=\"toolMap['legend'].order\"\n                                [class.active]=\"statusMap.legend_show_click\">\n                            <i class=\"fa fa-bookmark\"></i>\n                        </mn-col>\n                    </ng-template>\n\n                    <ng-template [ngIf]=\"toolMap['sort']\">\n                        <mn-col [order]=\"toolMap['sort'].order\"\n                                [class.active]=\"statusMap.sort_click\">\n\n                            <!-- <todo \u6682\u65F6\u5148\u4F7F\u7528 nz-zorro> -->\n\n                            <nz-dropdown>\n                                <a class=\"ant-dropdown-link\" nz-dropdown>\n                                    <i class=\"fa fa-sort-amount-desc\"></i>\n                                </a>\n                                <ul nz-menu>\n                                    <li nz-menu-item\n                                        (click)=\"sort_all_click($event)\">\n                                        by All\n                                    </li>\n                                    <li nz-menu-divider></li>\n                                    <li nz-menu-item\n                                        *ngFor=\"let legend of _options?.legend?.data\"\n                                        (click)=\"sort_click(legend.name, $event)\">\n                                        by {{legend.name}}\n                                    </li>\n                                    \n                                    <li nz-menu-divider></li>\n                                    <li nz-menu-item\n                                        (click)=\"clear_sort_click($event)\">\n                                        Clear\n                                    </li>\n                                </ul>\n                            </nz-dropdown>\n                        </mn-col>\n                    </ng-template>\n\n                    <ng-template [ngIf]=\"toolMap['reload']\">\n                        <mn-col (click)=\"reload_click($event)\"\n                                [order]=\"toolMap['reload'].order\">\n                            <i class=\"fa fa-refresh\"></i>\n                        </mn-col>\n                    </ng-template>\n                </mn-panel-toolbar>\n            </mn-panel-header>\n            <mn-panel-body>\n                <mn-req #panel\n                        [loader]=\"loader\"\n                        [loaderStyle]=\"loaderStyle\"\n                        [req]=\"req\"\n                        (result)=\"_data = $event.data\">\n\n                    <div class=\"mn-dataView\" *ngIf=\"_show_dataView\">\n                        <table class=\"table bordered td-top-bd td-left-bd\">\n                            <tbody>\n                                <tr *ngFor=\"let dd of _dataView\">\n                                    <td *ngFor=\"let d of dd\">\n                                        {{d || '-' | mu:'format'}}\n                                    </td>\n                                </tr>\n                            </tbody>\n                        </table>\n                    </div>\n\n                    <mn-echarts [style.height]=\"height\"\n                                [setting]=\"setting\"\n                                [options]=\"options\"\n                                [type]=\"type\"\n                                [data]=\"_data || data\"\n                                (chartClick)=\"chartClick.emit($event)\"\n                                (chartDblClick)=\"chartDblClick.emit($event)\"\n                                (chartMouseDown)=\"chartMouseDown.emit($event)\"\n                                (chartMouseUp)=\"chartMouseUp.emit($event)\"\n                                (chartMouseOver)=\"chartMouseOver.emit($event)\"\n                                (chartMouseOut)=\"chartMouseOut.emit($event)\"\n                                (chartGlobalOut)=\"chartGlobalOut.emit($event)\"\n                                (result)=\"_result($event)\"></mn-echarts>\n\n                </mn-req>\n            </mn-panel-body>\n        </mn-panel>\n    "
            },] },
];
/** @nocollapse */
MnEchartsPanelComponent.ctorParameters = function () { return [
    { type: mn_echarts_service_1.MnEchartsService, },
    { type: mn_file_saver_services_1.MnFileSaverServices, },
    { type: core_1.ElementRef, },
]; };
MnEchartsPanelComponent.propDecorators = {
    '_panel': [{ type: core_1.ViewChild, args: ['panel', { read: core_1.ElementRef },] },],
    'req': [{ type: core_1.Input },],
    'type': [{ type: core_1.Input },],
    'height': [{ type: core_1.Input },],
    'options': [{ type: core_1.Input },],
    'setting': [{ type: core_1.Input },],
    'where': [{ type: core_1.Input },],
    'tools': [{ type: core_1.Input },],
    'filename': [{ type: core_1.Input },],
    'loader': [{ type: core_1.Input },],
    'loaderStyle': [{ type: core_1.Input },],
    'show_tools': [{ type: core_1.Input },],
    'data': [{ type: core_1.Input },],
    'hph': [{ type: core_1.Input },],
    'getHph': [{ type: core_1.HostBinding, args: ['style.height',] },],
    'title': [{ type: core_1.Input },],
    'result': [{ type: core_1.Output },],
    'chartClick': [{ type: core_1.Output },],
    'chartDblClick': [{ type: core_1.Output },],
    'chartMouseDown': [{ type: core_1.Output },],
    'chartMouseUp': [{ type: core_1.Output },],
    'chartMouseOver': [{ type: core_1.Output },],
    'chartMouseOut': [{ type: core_1.Output },],
    'chartGlobalOut': [{ type: core_1.Output },],
};
exports.MnEchartsPanelComponent = MnEchartsPanelComponent;
//# sourceMappingURL=mn-echarts-panel.component.js.map