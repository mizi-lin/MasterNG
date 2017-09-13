/**
 * https://github.com/xieziyu/angular2-echarts/blob/master/src/directive/angular-echarts.directive.ts
 */
import { ElementRef, OnChanges, OnDestroy, SimpleChange, EventEmitter, AfterViewInit } from '@angular/core';
import 'echarts-wordcloud/dist/echarts-wordcloud.min';
export declare class MnEchartsRenderDirective implements OnChanges, OnDestroy, AfterViewInit {
    private _ref;
    options: any;
    dataset: any[];
    theme: string;
    loading: boolean;
    mycharts: EventEmitter<any>;
    element: EventEmitter<any>;
    chartClick: EventEmitter<any>;
    chartDblClick: EventEmitter<any>;
    chartMouseDown: EventEmitter<any>;
    chartMouseUp: EventEmitter<any>;
    chartMouseOver: EventEmitter<any>;
    chartMouseOut: EventEmitter<any>;
    chartGlobalOut: EventEmitter<any>;
    private _chart;
    private currentWindowWidth;
    constructor(_ref: ElementRef);
    ngAfterViewInit(): void;
    private getWidth(elm);
    private getHeight(elm);
    private createChart();
    private updateChart();
    onWindowResize(event: any): void;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
    private onOptionsChange(opt);
    private onDatasetChange(dataset);
    private onLoadingChange(loading);
    private mergeDataset(dataset);
    /**
     * method to check if the option has dataset.
     */
    private hasData();
    private registerEvents(myChart);
}
