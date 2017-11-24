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
    noData: boolean;
    noDataComponent: any;
    process: number;
    constructor(_http: Http, _rs: MnReqServices);
    req_http(req: any): void;
    debounceReqHttp: any;
    processStep(): any;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
}
