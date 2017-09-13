"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var echarts_service_1 = require("../../lib/mn-echarts/echarts.service");
var DemoEchartsComponent = (function () {
    function DemoEchartsComponent(_serv) {
        this._serv = _serv;
        this.options_1 = {
            title: {
                text: '折线图堆叠'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: [
                    '邮件营销',
                    '联盟广告',
                    '视频广告',
                    '直接访问',
                    '搜索引擎'
                ]
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: [
                    '周一',
                    '周二',
                    '周三',
                    '周四',
                    '周五',
                    '周六',
                    '周日'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    data: [
                        120,
                        132,
                        101,
                        134,
                        90,
                        230,
                        210
                    ]
                },
                {
                    name: '联盟广告',
                    type: 'line',
                    stack: '总量',
                    data: [
                        220,
                        182,
                        191,
                        234,
                        290,
                        330,
                        310
                    ]
                },
                {
                    name: '视频广告',
                    type: 'line',
                    stack: '总量',
                    data: [
                        150,
                        232,
                        201,
                        154,
                        190,
                        330,
                        410
                    ]
                },
                {
                    name: '直接访问',
                    type: 'line',
                    stack: '总量',
                    data: [
                        320,
                        332,
                        301,
                        334,
                        390,
                        330,
                        320
                    ]
                },
                {
                    name: '搜索引擎',
                    type: 'line',
                    stack: '总量',
                    data: [
                        820,
                        932,
                        901,
                        934,
                        1290,
                        1330,
                        1320
                    ]
                }
            ]
        };
    }
    DemoEchartsComponent.prototype.barOptions = function (options) {
        this.bar_options2 = this._serv.adjustECharOptions(mu.clone(options));
    };
    DemoEchartsComponent.prototype.pieConversion = function (data) {
        this.pie_options = this._serv.getEchartResult('pie', data, {
            legend_show: false
        })['options'];
    };
    DemoEchartsComponent.prototype.radarResult = function ($event) {
    };
    DemoEchartsComponent.prototype.ngOnInit = function () {
    };
    return DemoEchartsComponent;
}());
DemoEchartsComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-demo-echarts',
                templateUrl: './demo-echarts.component.html',
                styleUrls: ['./demo-echarts.component.scss']
            },] },
];
/** @nocollapse */
DemoEchartsComponent.ctorParameters = function () { return [
    { type: echarts_service_1.EchartsService, },
]; };
exports.DemoEchartsComponent = DemoEchartsComponent;
//# sourceMappingURL=demo-echarts.component.js.map