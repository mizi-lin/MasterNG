import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import * as mu from 'mzmu';
import {MnEchartsServices} from './mn-echarts.service';
declare const mu: any;
import '../assets/china.js';

/**
 * 处理数据，将data转为echart_options
 */

@Component({
    selector: 'mn-echarts',
    template: `
        <div 
                mn-echarts-render 
                [options]="echarts_options" 
                (chartClick)="chartClick.emit($event)"
                (chartDblClick)="chartDblClick.emit($event)"
                (chartMouseDown)="chartMouseDown.emit($event)"
                (chartMouseUp)="chartMouseUp.emit($event)"
                (chartMouseOver)="chartMouseOver.emit($event)"
                (chartMouseOut)="chartMouseOut.emit($event)"
                (chartGlobalOut)="chartGlobalOut.emit($event)"
                (result)="getRenderResult($event)"></div>
    `,
    styles: [
            `
            :host,
            :host ::ng-deep [mn-echarts-render] {
                display: block;
                width: 100%;
                height: 100%;
            }
            `
    ]

})
export class MnEchartsComponent implements OnInit, OnChanges {

    @Input() data: any;
    @Input() options: any;

    // -> setting ::: 快捷设置 options 属性
    @Input() setting?: any = {};

    @Input() type?: string;

    @Output() result: any = new EventEmitter<any>();
    @Output() chartClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartDblClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartMouseDown: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartMouseUp: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartMouseOver: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartMouseOut: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartGlobalOut: EventEmitter<any> = new EventEmitter<any>();

    echarts_options: any;

    _result: any = {};


    constructor(private _es: MnEchartsServices) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {

        mu.run(mu.prop(changes, 'options.currentValue'), (options) => {
            this.echarts_options = options;
            this._result['options'] = options;
            this.result.emit(this._result);
        });

        mu.run(mu.prop(changes, 'data.currentValue'), (data) => {
            const result_ = this._es.getEchartResult(this.type, data, this.setting);
            this.echarts_options = result_['options'];
            this._result.source = mu.clone(this.data);
            this._result = mu.extend(this._result, result_);
            this.result.emit(this._result);
        });

        mu.run(changes['setting'], (settingListener) => {
            if (!settingListener.firstChange) {
                const result_ = this._es.getEchartResult(this.type, this.data, this.setting);
                this.echarts_options = result_['options'];
                this._result.source = mu.clone(this.data);
                this._result = mu.extend(this._result, result_);
                this.result.emit(this._result);
            }
        });

        mu.run(changes['type'], (typeListener) => {
            if (!typeListener.firstChange) {
                const result_ = this._es.getEchartResult(this.type, this.data, this.setting) || {};
                this.echarts_options = result_['options'];
                this._result.source = mu.clone(this.data);
                this._result = mu.extend(this._result, result_);
                this.result.emit(this._result);
            }
        });

    }

    getRenderResult(rst: any) {
        this._result = mu.extend(this._result, rst);
        this.result.emit(this._result);
    }

}
