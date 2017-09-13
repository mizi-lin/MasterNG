"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var echarts_service_1 = require("../../lib/mn-echarts/echarts.service");
var http_1 = require("@angular/http");
var DemoMcComponent = (function () {
    function DemoMcComponent(_es, _http) {
        var _this = this;
        this._es = _es;
        this._http = _http;
        this.categorys = [
            '华扬联众',
            '二更',
            '琥珀',
            'McCann & Spencer',
            '华邑'
        ];
        this.data = [];
        this._weibo_data_boi = [];
        this._weibo_data_mc = [];
        this.weibo_data = [];
        this._http.get('assets/store/a.csv.json').subscribe(function (res_boi) {
            _this._weibo_data_boi = res_boi['data'];
            _this._http.get('assets/store/b.csv.json').subscribe(function (res) {
                _this._weibo_data_mc = res['data'];
                _this.weibo_data.unshift(_this._weibo_data_boi.shift());
                _this.weibo_data.unshift(_this._weibo_data_mc.shift());
                _this.weibo_data.unshift(_this._weibo_data_boi.shift());
                _this.weibo_data.unshift(_this._weibo_data_mc.shift());
                setInterval(function () {
                    mu.run(_this._weibo_data_boi, function (ds) {
                        _this.weibo_data.unshift(ds.shift());
                    });
                    mu.run(_this._weibo_data_mc, function (ds) {
                        _this.weibo_data.unshift(ds.shift());
                    });
                }, 4500);
            });
        });
    }
    DemoMcComponent.prototype.ngOnInit = function () {
        var _this = this;
        var d = new Date();
        var i = 0;
        d.setSeconds(0, 0);
        d = +d - 120 * 1000;
        d = this.setData(d);
        d = this.setData(d);
        d = this.setData(d);
        setInterval(function () {
            d = _this.setData(d);
            i++;
            if (i > 9) {
                _this.data = [];
                d = _this.setData(d);
                d = _this.setData(d);
                d = _this.setData(d);
                i = 0;
            }
        }, 15000);
    };
    DemoMcComponent.prototype.setData = function (d) {
        var _this = this;
        var _data = mu.map(this.categorys, function (name) {
            return {
                name: name,
                x: _this.getDate(d),
                value: mu.randomInt(50, 6210)
            };
        });
        (_a = this.data).push.apply(_a, _data);
        this.data = mu.clone(this.data);
        d += (15 * 1000);
        var totals = mu.map(mu.groupArray(this.data, 'name'), function (o) { return _this._es.total(o, 'value'); });
        this.total_data = mu.map(totals, function (total, name) {
            return {
                x: name,
                name: '总播放量',
                value: total
            };
        }, []);
        return d;
        var _a;
    };
    DemoMcComponent.prototype.getDate = function (d) {
        d = d || +new Date();
        return mu.format(new Date(d), 'hh:mm:ss');
    };
    return DemoMcComponent;
}());
DemoMcComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-demo-mc',
                templateUrl: './demo-mc.component.html',
                styleUrls: ['./demo-mc.component.scss'],
                encapsulation: core_1.ViewEncapsulation.None
            },] },
];
/** @nocollapse */
DemoMcComponent.ctorParameters = function () { return [
    { type: echarts_service_1.EchartsService, },
    { type: http_1.Http, },
]; };
exports.DemoMcComponent = DemoMcComponent;
//# sourceMappingURL=demo-mc.component.js.map