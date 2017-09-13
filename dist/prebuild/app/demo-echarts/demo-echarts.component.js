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
                template: '<div class="demo-echarts">      <!--<mn-panel-s class="bordered" title="mn-echarts-render::injector options">-->         <!--<div mn-echarts-render [options]="options_1" [style.height.px]="300">-->         <!--</div>-->     <!--</mn-panel-s>-->      <!--<mn-panel-s class="mt-8 bordered" title="mn-echarts-render::req-http get options">-->         <!--<req-http [req]="{url: \'./assets/store/echarts-options-bar.json\'}" (result)="bar_options = $event.data; barOptions($event.data)">-->             <!--<mn-row>-->                 <!--<mn-col [span]="12">-->                     <!--<div mn-echarts-render [options]="bar_options" [style.height.px]="300">-->                     <!--</div>-->                 <!--</mn-col>-->                  <!--<mn-col [span]="12">-->                     <!--<div mn-echarts-render [options]="bar_options2">-->                     <!--</div>-->                 <!--</mn-col>-->             <!--</mn-row>-->         <!--</req-http>-->     <!--</mn-panel-s>-->      <!--<mn-panel-s class="mt-8 bordered" title="EchartsService::data conversion options" mn-element #abc="element">-->         <!--<req-http [req]="{url: \'./assets/store/pie.json\'}"-->                   <!--[mnLoaderRef]="abc.elementRef"-->                   <!--(result)="pieConversion($event.data); pie_data = $event.data">-->             <!--<mn-row>-->                 <!--<mn-col [span]="12">-->                     <!--<div mn-echarts-render [options]="pie_options" [style.height.px]="300">-->                     <!--</div>-->                 <!--</mn-col>-->                  <!--<mn-col [span]="12">-->                     <!--<mn-echarts [data]="pie_data" [type]="\'pie\'" [setting]="{subtype: \'annular\', legend_show: false, selected: 1}" [style.height.px]="300">-->                     <!--</mn-echarts>-->                 <!--</mn-col>-->             <!--</mn-row>-->         <!--</req-http>-->     <!--</mn-panel-s>-->      <mn-row class="mt-8" [gutter]="16">         <mn-col [span]="24">             <mn-echarts-panel class="bordered" title="EchartsPanel::bar mn-panel && tools"                               [req]="{url: \'./assets/store/echarts-bars.json\'}"                               [type]="\'bar\'"                               [tools]="[\'fullscreen\', \'download\', \'data_view\', \'sort\', \'line\', \'bar\', \'exchange\', \'rate\', \'label_all\', \'legend\',  \'reload\']"                               [setting]="{legend_show: false, rotate: 20}"                               height="300px">             </mn-echarts-panel>         </mn-col>         <!--<mn-col [span]="12">-->             <!--<mn-echarts-box class="bordered"-->                             <!--[req]="{url: \'./assets/store/pie.json\'}"-->                             <!--[type]="\'pie\'"-->                             <!--[tools]="[ \'download\', \'data_view\', \'legend\', \'reload\', \'fullscreen\']"-->                             <!--[setting]="{legend_position: \'center top\'}"-->                             <!--[show_tools]="\'toggle\'">-->             <!--</mn-echarts-box>-->         <!--</mn-col>-->     <!--</mn-row>-->      <!--<mn-row [gutter]="16" class="mt-8">-->         <!--<mn-col [span]="12">-->             <!--<mn-echarts-box class="bordered"-->                             <!--(result)="radarResult($event)"-->                             <!--[req]="{url: \'./assets/store/echarts-radar.json\'}"-->                             <!--[type]="\'radar\'"-->                             <!--[tools]="[ \'download\', \'data_view\', \'legend\', \'reload\', \'fullscreen\']"-->                             <!--[setting]="{legend_show: false, tooltip: true}">-->             <!--</mn-echarts-box>-->         <!--</mn-col>-->         <!--<mn-col [span]="12">-->             <!--<mn-echarts-panel class="bordered" title="EchartsPanel::world cloud"-->                               <!--[req]="{url: \'./assets/store/echarts-world-cloud.json\'}"-->                               <!--[type]="\'wordCloud\'"-->                               <!--[tools]="[\'fullscreen\', \'download\', \'data_view\', \'line\', \'bar\', \'exchange\', \'rate\', \'label_all\', \'legend\', \'reload\']"-->                               <!--height="300px">-->             <!--</mn-echarts-panel>-->         <!--</mn-col>-->     </mn-row>  </div>',
                styles: ['.demo-echarts {  padding: 8px;}']
            },] },
];
/** @nocollapse */
DemoEchartsComponent.ctorParameters = function () { return [
    { type: echarts_service_1.EchartsService, },
]; };
exports.DemoEchartsComponent = DemoEchartsComponent;
//# sourceMappingURL=demo-echarts.component.js.map