import { OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Subscriber } from 'rxjs/Subscriber';
export declare class ReqHttpComponent implements OnChanges, OnDestroy {
    private _http;
    req: any;
    params: any;
    payload: any;
    data: any;
    context: any;
    loading: boolean;
    result: any;
    _observable: Subscriber<any>;
    noData: boolean;
    noDataComponent: any;
    process: number;
    constructor(_http: Http);
    req_http(req: any): void;
    debounce_req_http: any;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
}
