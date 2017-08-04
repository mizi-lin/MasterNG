import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {Subscriber} from 'rxjs/Subscriber';
import {ReqNoDataComponent} from './req-nodata.component';
import * as mu from 'mzmu';

declare let mu: any;

@Component({
    selector: 'req-resource',
    template: `
        <dynamic-component *ngIf="noData" [component]="noDataComponent" [inputs]="context"></dynamic-component>
        <ng-content *ngIf="!noData"></ng-content>
    `
})
export class ReqResourceComponent implements OnInit {

    @Input() pool: any;
    @Input() req: any | {
        key: string,
        method: string,
        params: any,
        payload: any
    };
    @Input() params: any;
    @Input() payload: any;

    // todo
    @Input() loading: boolean = false;

    @Output() result: any = new EventEmitter<any>();

    _observable: Subscriber<any>;

    noData: boolean = false;
    noDataComponent: any = ReqNoDataComponent;

    constructor() {
    }

    ngOnInit() {
    }

    req_http(req: any): void {
        const method = req.method || (req.payload ? 'post' : 'get');
        mu.run(mu.prop(this.pool, req.key), (pool) => {
            this._observable = pool[method](req.params, req.paylaod).subscribe((res: any = {}) => {
                mu.run(res.data, () => {
                    this.result.emit(res);
                }, () => {
                    this.noData = true;
                });
            });
        });
    }

    debounce_req_http: any = mu.debounce((req: any) => {
        this.req_http(req);
    }, 300);

    ngOnChanges(changes: SimpleChanges) {

        mu.run(changes['params'] && this.req, () => {
            this.req.params = this.params;
            this.params = null;
            this.debounce_req_http(this.req);
        });

        mu.run(changes['payload'] && this.req, () => {
            this.req.payload = this.payload;
            this.payload = null;
            this.debounce_req_http(this.req);
        });

        mu.run(changes['req'], () => {
            this.debounce_req_http(this.req);
        });

    }

    ngOnDestroy(): void {
        this._observable && this._observable.unsubscribe();
    }
}


