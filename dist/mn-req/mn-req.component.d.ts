import { OnChanges, SimpleChanges, OnDestroy, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import { Subscriber } from 'rxjs/Subscriber';
import { MnReqService } from './mn-req.service';
export declare class ReqHttpComponent implements OnChanges, OnDestroy {
    private _http;
    private _rs;
    req: any;
    params: any;
    payload: any;
    data: any;
    context: any;
    loaderRef?: ElementRef;
    loader?: boolean;
    result: any;
    _observable: Subscriber<any>;
    noData: boolean;
    noDataComponent: any;
    process: number;
    constructor(_http: Http, _rs: MnReqService);
    req_http(req: any): void;
    debounce_req_http: any;
    processStep(): any;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
}
