import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {EchartsService} from '../../lib/mn-echarts/echarts.service';
import {Http} from '@angular/http';

declare const mu: any;

@Component({
    selector: 'mn-demo-mc',
    template: '<div class="demo-mc p-16">     <header>          <mn-fill>             <mn-col [span]="3">金投赏品牌创意大赛创意轮播监测</mn-col>             <mn-col [span]="1">                 <mn-row class="logo" [style.height.%]="100">                     <mn-col [span]="3" class="logo-mc"></mn-col>                     <mn-col [span]="3" class="logo-roi"></mn-col>                     <mn-col [span]="12" class="logo-admaster"></mn-col>                     <mn-col [span]="6" class="logo-weibo"></mn-col>                 </mn-row>             </mn-col>         </mn-fill>      </header>      <mn-row class="mt-16" [gutter]="16">         <mn-col [span]="18">              <mn-echarts-panel class="bordered"                               [style.height.px]="380"                               [title]="\'创意每日播放量\'"                               [data]="data"                               [type]="\'line\'"                               [tools]="[\'fullscreen\', \'download\', \'data_view\', \'line\', \'bar\', \'exchange\', \'rate\', \'label_all\', \'legend\']"                               [setting]="{stack: false, area: false}">             </mn-echarts-panel>              <mn-row class="mt-8" [gutter]="16">                  <mn-col [span]="12">                     <mn-echarts-panel class="mt-8 bordered"                                       [title]="\'总播放量\'"                                       [data]="total_data"                                       [type]="\'bar\'"                                       [setting]="{zero: false, legend_show: false}"                                       [style.height.px]="480">                     </mn-echarts-panel>                 </mn-col>                  <mn-col [span]="12">                     <mn-echarts-panel class="mt-8 bordered"                                       [title]="\'播放占比\'"                                       [data]="total_data"                                       [type]="\'pie\'"                                       [setting]="{convert: [\'x-:>name\']}"                                       [style.height.px]="480">                     </mn-echarts-panel>                 </mn-col>              </mn-row>          </mn-col>          <mn-col [span]="6">              <mn-panel-s class="bordered tweets" [title]="\'微博实时监控\'">                 <ol>                     <li *ngFor="let tw of weibo_data">                         <h5>                             <span [style.backgroundImage]="\'url(\' + tw.img + \')\'"></span>                             {{tw.name}}                         </h5>                          <div class="mt-8" [innerHTML]="tw.text"></div>                     </li>                 </ol>             </mn-panel-s>          </mn-col>      </mn-row>  </div>',
    styles: ['.demo-mc {  height: 100%;}.demo-mc header {  font-size: 32px;}.demo-mc header .logo-mc {  background: url("../../assets/images/mc/mc.png") center no-repeat;  background-size: contain;}.demo-mc header .logo-roi {  background: url("../../assets/images/mc/roi.png") center no-repeat;  background-size: contain;}.demo-mc header .logo-admaster {  background: url("../../assets/images/mc/admaster.png") center no-repeat;  background-size: contain;}.demo-mc header .logo-weibo {  background: url("../../assets/images/mc/weibo.png") center no-repeat;  background-size: contain;}.demo-mc mn-panel-header mn-row mn-col {  padding-left: 4px;  padding-right: 4px;}.demo-mc .tweets {  border-radius: 5px;  background: #f2f2f2;  height: 100%;  position: relative;}.demo-mc .tweets mn-panel-body {  position: absolute;  top: 42px;  bottom: 0;  right: 0;  left: 0;  overflow-y: scroll;}.demo-mc .tweets li {  padding: 15px;}.demo-mc .tweets li h5 {  color: #7f95d1;  line-height: 32px;  font-size: 18px;}.demo-mc .tweets li h5 span {  display: inline-block;  margin-right: 10px;  margin-top: -5px;  width: 32px;  height: 32px;  border-radius: 50%;  background-size: cover;  vertical-align: middle;  box-shadow: 3px 4px 10px 1px #888888;}.demo-mc .tweets li + li {  border-top: 1px dashed #999;}'],
    encapsulation: ViewEncapsulation.None
})
export class DemoMcComponent implements OnInit {

    categorys: string[] = [
        '华扬联众',
        '二更',
        '琥珀',
        'McCann & Spencer',
        '华邑'
    ];
    data: any[] = [];
    total_data: any[];

    _weibo_data_boi: any[] = [];
    _weibo_data_mc: any[] = [];
    weibo_data: any[] = [];

    constructor(private _es: EchartsService,
                private _http: Http) {
        this._http.get('assets/store/a.csv.json').subscribe((res_boi) => {
            this._weibo_data_boi = res_boi['data'];
            this._http.get('assets/store/b.csv.json').subscribe((res) => {
                this._weibo_data_mc = res['data'];
                this.weibo_data.unshift(this._weibo_data_boi.shift());
                this.weibo_data.unshift(this._weibo_data_mc.shift());
                this.weibo_data.unshift(this._weibo_data_boi.shift());
                this.weibo_data.unshift(this._weibo_data_mc.shift());
                setInterval(() => {
                    mu.run(this._weibo_data_boi, (ds) => {
                        this.weibo_data.unshift(ds.shift());
                    });

                    mu.run(this._weibo_data_mc, (ds) => {
                        this.weibo_data.unshift(ds.shift());
                    });
                }, 4500);
            });
        });
    }

    ngOnInit() {
        let d = new Date();
        let i = 0;
        d.setSeconds(0, 0);
        d = +d - 120 * 1000;
        d = this.setData(d);
        d = this.setData(d);
        d = this.setData(d);
        setInterval(() => {
            d = this.setData(d);
            i++;
            if (i > 9) {
                this.data = [];
                d = this.setData(d);
                d = this.setData(d);
                d = this.setData(d);
                i = 0;
            }
        }, 15000);

    }

    setData(d: any) {
        const _data = mu.map(this.categorys, (name) => {
            return {
                name,
                x: this.getDate(d),
                value: mu.randomInt(50, 6210)
            };
        });

        this.data.push(..._data);

        this.data = mu.clone(this.data);

        d += (15 * 1000);

        const totals = mu.map(mu.groupArray(this.data, 'name'), (o) => this._es.total(o, 'value'));

        this.total_data = mu.map(totals, (total, name) => {
            return {
                x: name,
                name: '总播放量',
                value: total
            };
        }, []);

        return d;
    }

    _date: number;

    getDate(d?: any) {
        d = d || +new Date();
        return mu.format(new Date(d), 'hh:mm:ss');
    }

}
