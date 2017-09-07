import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {EchartsService} from '../../lib/mn-echarts/echarts.service';
import {Http} from '@angular/http';

declare const mu: any;

@Component({
    selector: 'mn-demo-mc',
    templateUrl: './demo-mc.component.html',
    styleUrls: ['./demo-mc.component.scss'],
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
        this._http.get('/assets/store/a.csv.json').subscribe((res_boi) => {
            this._weibo_data_boi = res_boi['data'];
            this._http.get('/assets/store/b.csv.json').subscribe((res) => {
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
        let d = +new Date();
        d = this.setData(d);
        d = this.setData(d);
        d = this.setData(d);
        setInterval(() => {
            d = this.setData(d);
        }, 5000);

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

        d += (60 * 60 * 24 * 1000);

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
        return mu.format(new Date(d), 'yyyy-MM-dd');
    }

}
