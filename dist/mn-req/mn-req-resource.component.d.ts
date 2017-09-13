import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscriber } from 'rxjs/Subscriber';
export declare class MnReqResourceComponent implements OnInit, OnChanges, OnDestroy {
    pool: any;
    req: any | {
        key: string;
        method: string;
        params: any;
        payload: any;
    };
    params: any;
    payload: any;
    context: any;
    loading: boolean;
    result: any;
    _observable: Subscriber<any>;
    noData: boolean;
    noDataComponent: any;
    process: number;
    constructor();
    ngOnInit(): void;
    req_http(req: any): void;
    debounce_req_http: any;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
}
