import { OnChanges, SimpleChanges, OnDestroy, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Subscriber } from 'rxjs/Subscriber';
import { MnReqServices } from './mn-req.service';
export declare class ReqHttpComponent implements OnChanges, OnDestroy {
    private _http;
    private _rs;
    req: any;
    params: any;
    payload: any;
    data: any;
    context: any;
    loader: ElementRef;
    loading: boolean;
    loaderStyle: any;
    showNoData: boolean;
    result: any;
    _observable: Subscriber<any>;
    isNoData: boolean;
    noDataComponent: any;
    process: number;
    constructor(_http: Http, _rs: MnReqServices);
    reqHttp(req: any): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    debounceReqHttp: any;
    processStep(): any;
}
