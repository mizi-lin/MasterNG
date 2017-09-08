import {Component, OnInit} from '@angular/core';
import {EchartsService} from '../../lib/mn-echarts/echarts.service';
declare const mu: any;

@Component({
    selector: 'mn-demo-echarts',
    template: '<div class="demo-echarts">      <mn-panel-s class="bordered" title="mn-echarts-render::injector options">         <div mn-echarts-render [options]="options_1" [style.height.px]="300">         </div>     </mn-panel-s>      <mn-panel-s class="mt-8 bordered" title="mn-echarts-render::req-http get options">         <req-http [req]="{url: \'./assets/store/echarts-options-bar.json\'}" (result)="bar_options = $event.data; barOptions($event.data)">             <mn-row>                 <mn-col [span]="12">                     <div mn-echarts-render [options]="bar_options" [style.height.px]="300">                     </div>                 </mn-col>                  <mn-col [span]="12">                     <div mn-echarts-render [options]="bar_options2">                     </div>                 </mn-col>             </mn-row>         </req-http>     </mn-panel-s>      <mn-panel-s class="mt-8 bordered" title="EchartsService::data conversion options">         <req-http [req]="{url: \'./assets/store/pie.json\'}" (result)="pieConversion($event.data); pie_data = $event.data">             <mn-row>                 <mn-col [span]="12">                     <div mn-echarts-render [options]="pie_options" [style.height.px]="300">                     </div>                 </mn-col>                  <mn-col [span]="12">                     <mn-echarts [data]="pie_data" [type]="\'pie\'" [setting]="{subtype: \'annular\', legend_show: false, selected: 1}" [style.height.px]="300">                     </mn-echarts>                 </mn-col>             </mn-row>         </req-http>     </mn-panel-s>      <mn-row [gutter]="16">         <mn-col [span]="12">             <mn-echarts-panel class="mt-8 bordered" title="EchartsPanel::bar mn-panel && tools"                            [req]="{url: \'./assets/store/echarts-bar.json\'}"                            [type]="\'bar\'"                            [tools]="[\'fullscreen\', \'download\', \'data_view\', \'line\', \'bar\', \'exchange\', \'rate\', \'label_all\', \'legend\', \'reload\']"                            [show_tools]="\'toggle\'"                            height="300px">             </mn-echarts-panel>         </mn-col>         <mn-col [span]="12">             <mn-echarts-box class="mt-8 bordered"                            [req]="{url: \'./assets/store/pie.json\'}"                            [type]="\'pie\'"                            [tools]="[ \'download\', \'data_view\', \'legend\', \'reload\', \'fullscreen\']"                            [setting]="{legend_position: \'center bottom\'}"                            [show_tools]="\'toggle\'"                            [style.height]="\'100%\'">             </mn-echarts-box>         </mn-col>     </mn-row>      <mn-row [gutter]="16" class="mt-8">         <mn-col [span]="12">             <mn-echarts-box class="mt-8 bordered"                          (result)="radarResult($event)"                          [req]="{url: \'./assets/store/echarts-radar.json\'}"                          [type]="\'radar\'"                          [tools]="[ \'download\', \'data_view\', \'legend\', \'reload\', \'fullscreen\']"                          [setting]="{legend_show: false, tooltip: true}"                          [style.height]="\'100%\'">             </mn-echarts-box>         </mn-col>         <mn-col [span]="12">             <mn-echarts-panel class="mt-8 bordered" title="EchartsPanel::world cloud"                            [req]="{url: \'./assets/store/echarts-world-cloud.json\'}"                            [type]="\'wordCloud\'"                            [tools]="[\'fullscreen\', \'download\', \'data_view\', \'line\', \'bar\', \'exchange\', \'rate\', \'label_all\', \'legend\', \'reload\']"                            height="300px">             </mn-echarts-panel>         </mn-col>     </mn-row>  </div>',
    styles: ['.demo-echarts {  padding: 8px;}']
})
export class DemoEchartsComponent implements OnInit {

    bar_options: any;
    pie_data: any;

    options_1: any = {
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

    constructor(private _serv: EchartsService) {
    }

    bar_options2: any;

    barOptions(options) {
        this.bar_options2 = this._serv.adjustECharOptions(mu.clone(options));
    }

    pie_options: any;
    pieConversion(data) {
        this.pie_options = this._serv.getEchartResult('pie', data, {
            legend_show: false
        })['options'];
    }

    radarResult($event) {
        console.debug(JSON.stringify($event.dataView));
    }

    ngOnInit() {
    }

}
