"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var echarts_service_1 = require("./echarts.service");
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
        this.result = new core_1.EventEmitter();
        this._show_dataView = false;
        this._dataView = [];
        // fullscreen, download, data_view, line, bar, exchange, rate, label_all, legend, reload
        this._tools = [];
        this.statusMap = {};
        this.toolMap = {};
        this.hide_title = false;
        this.legends = [];
        this.fullscreen_click = function (full, $event) {
            var $el = jQuery(_this._panel.nativeElement);
            $el.mnResize(function () {
                _this._myChart.resize({
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
    }
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
    MnEchartsPanelComponent.prototype.setStatus = function (fnKey) {
        this.statusMap[fnKey] = !this.statusMap[fnKey];
    };
    MnEchartsPanelComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        mu.exist(changes['setting'], function (changes_setting) {
            if (changes_setting.first) {
                _this._src_setting = mu.clone(_this.setting);
            }
            _this.setting.__where__ = _this.where;
        });
        mu.exist(changes['type'], function (type_changes) {
            if (type_changes.firstChange) {
                _this._src_type = type_changes.currentValue;
            }
        });
        mu.exist(changes['tools'], function () {
            _this.toolMap = mu.map(_this.tools || [], function (key, i) {
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
            mu.run(_this.toolMap['fullscreen'], function (o) {
                _this._tools.push({
                    name: 'fullscreen',
                    click: _this.fullscreen_click,
                    order: o.order
                });
            });
        });
    };
    MnEchartsPanelComponent.prototype._result = function ($event) {
        this._options = $event.options;
        this._dataView = $event.dataView;
        this.result.emit($event);
        // this.type === 'radar' && console.debug(JSON.stringify(this._options));
    };
    MnEchartsPanelComponent.prototype.mycharts = function ($event) {
        this._myChart = $event;
    };
    MnEchartsPanelComponent.prototype.download_click = function ($event) {
        var content = this._mnFileSaverServ.csvData(this._dataView);
        this._mnFileSaverServ.fileSaver([content], this.filename);
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
        this.setStatus('sort_click');
    };
    return MnEchartsPanelComponent;
}());
MnEchartsPanelComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-echarts-panel, mn-echarts-box',
                template: "\n        <mn-panel>\n            <mn-panel-header>\n                <mn-panel-title [innerHTML]=\"_title\"></mn-panel-title>\n                <mn-panel-toolbar [tools]=\"_tools\" [class.toggle]=\"show_tools === 'toggle'\">\n\n                    <ng-template [ngIf]=\"toolMap['download']\">\n                        <mn-col (click)=\"download_click($event)\"\n                                [order]=\"toolMap['download'].order\">\n                            <i class=\"fa fa-download\"></i>\n                        </mn-col>\n                    </ng-template>\n\n                    <ng-template [ngIf]=\"toolMap['data_view']\">\n                        <mn-col (click)=\"dataView_click($event)\"\n                                [order]=\"toolMap['data_view'].order\"\n                                [class.active]=\"statusMap.dataView_click\">\n                            <i class=\"fa fa-database\"></i>\n                        </mn-col>\n                    </ng-template>\n\n                    <ng-template [ngIf]=\"toolMap['line']\">\n                        <mn-col *ngIf=\"_src_type | mu:'or':'bar'\"\n                                (click)=\"line_click($event)\"\n                                [order]=\"toolMap['line'].order\"\n                                [class.active]=\"statusMap.line_click\">\n                            <i class=\"fa fa-line-chart\"></i>\n                        </mn-col>\n                    </ng-template>\n\n                    <ng-template [ngIf]=\"toolMap['bar']\">\n                        <mn-col *ngIf=\"_src_type | mu:'or':'line'\"\n                                (click)=\"bar_click($event)\"\n                                [order]=\"toolMap['bar'].order\"\n                                [class.active]=\"statusMap.bar_click\">\n                            <i class=\"fa fa-bar-chart\"></i>\n                        </mn-col>\n                    </ng-template>\n\n                    <ng-template [ngIf]=\"toolMap['exchange']\">\n                        <mn-col *ngIf=\"_src_type | mu:'or':'line':'bar'\"\n                                (click)=\"exchange_click($event)\"\n                                [order]=\"toolMap['exchange'].order\"\n                                [class.active]=\"statusMap.exchange_click\">\n                            <i class=\"fa fa-retweet\"></i>\n                        </mn-col>\n                    </ng-template>\n\n                    <ng-template [ngIf]=\"toolMap['rate']\">\n                        <mn-col *ngIf=\"_src_type | mu:'or':'line':'bar'\"\n                                (click)=\"precent_rate_click($event)\"\n                                [order]=\"toolMap['rate'].order\"\n                                [class.active]=\"statusMap.precent_rate_click\">\n                            <i class=\"fa fa-align-justify\"></i>\n                        </mn-col>\n                    </ng-template>\n\n                    <ng-template [ngIf]=\"toolMap['label_all']\">\n                        <mn-col *ngIf=\"_src_type | mu:'or':'line':'bar'\"\n                                (click)=\"label_show_all_click($event)\"\n                                [order]=\"toolMap['label_all'].order\"\n                                [class.active]=\"statusMap.label_show_all_click\">\n                            <i class=\"fa fa-ellipsis-h\"></i>\n                        </mn-col>\n                    </ng-template>\n\n                    <ng-template [ngIf]=\"toolMap['legend']\">\n                        <mn-col (click)=\"legend_show_click($event)\"\n                                [order]=\"toolMap['legend'].order\"\n                                [class.active]=\"statusMap.legend_show_click\">\n                            <i class=\"fa fa-bookmark\"></i>\n                        </mn-col>\n                    </ng-template>\n                    \n                    <ng-template [ngIf]=\"toolMap['sort']\">\n                        <mn-col [order]=\"toolMap['sort'].order\"\n                                [class.active]=\"statusMap.sort_click\">\n\n                            <!-- <todo \u6682\u65F6\u5148\u4F7F\u7528 nz-zorro> -->\n                            \n                            <nz-dropdown>\n                                <a class=\"ant-dropdown-link\" nz-dropdown>\n                                    <i class=\"fa fa-sort-amount-desc\"></i>\n                                </a>\n                                <ul nz-menu>\n                                    <li nz-menu-item \n                                        *ngFor=\"let legend of _options?.legend?.data\"\n                                        (click)=\"sort_click(legend.name, $event)\">\n                                        {{legend.name}}\n                                    </li>\n                                </ul>\n                            </nz-dropdown>\n                        </mn-col>\n                    </ng-template>\n                    \n                    \n\n                    <ng-template [ngIf]=\"toolMap['reload']\">\n                        <mn-col (click)=\"reload_click($event)\"\n                                [order]=\"toolMap['reload'].order\">\n                            <i class=\"fa fa-refresh\"></i>\n                        </mn-col>\n                    </ng-template>\n                </mn-panel-toolbar>\n            </mn-panel-header>\n            <mn-panel-body>\n                <req-http [req]=\"req\" (result)=\"_data = $event.data\" #panel>\n\n                    <div class=\"mn-dataView\" *ngIf=\"_show_dataView\">\n                        <table class=\"table bordered td-top-bd td-left-bd\">\n                            <tbody>\n                                <tr *ngFor=\"let dd of _dataView\">\n                                    <td *ngFor=\"let d of dd\">\n                                        {{d || '-' | mu:'format'}}\n                                    </td>\n                                </tr>\n                            </tbody>\n                        </table>\n                    </div>\n\n                    <mn-echarts [style.height]=\"height\"\n                                [setting]=\"setting\"\n                                [options]=\"options\"\n                                [type]=\"type\"\n                                [data]=\"_data || data\"\n                                (result)=\"_result($event)\"\n                                (mycharts)=\"mycharts($event)\"></mn-echarts>\n\n                </req-http>\n            </mn-panel-body>\n        </mn-panel>\n    ",
                styleUrls: ['./mn-echarts.scss']
            },] },
];
/** @nocollapse */
MnEchartsPanelComponent.ctorParameters = function () { return [
    { type: echarts_service_1.EchartsService, },
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
    'show_tools': [{ type: core_1.Input },],
    'data': [{ type: core_1.Input },],
    'title': [{ type: core_1.Input },],
    'result': [{ type: core_1.Output },],
};
exports.MnEchartsPanelComponent = MnEchartsPanelComponent;
//# sourceMappingURL=mn-echarts-panel.component.js.map