import {Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnDestroy} from '@angular/core';
import {Http} from '@angular/http';
import {Observable, Subscriber} from 'rxjs';
import {ReqNoDataComponent} from './req-nodata.component';
import * as mu from 'mzmu';

declare const mu: any;

@Component({
    selector: 'req-http',
    template: `
        <dynamic-component *ngIf="noData" [component]="noDataComponent" [inputs]="context"></dynamic-component>
        <ng-content *ngIf="!noData"></ng-content>
    `
})
export class ReqHttpComponent implements OnChanges, OnDestroy {

    @Input() req: any;
    @Input() params: any;
    @Input() payload: any;
    @Input() data: any;
    @Input() context: any;

    // todo
    @Input() loading: boolean = false;

    @Output() result: any = new EventEmitter<any>();

    _observable: Subscriber<any>;

    noData: boolean = false;
    noDataComponent: any = ReqNoDataComponent;

    constructor(private _http: Http) {
    }

    ngOnInit() {
    }

    req_http(req: any): void {
        let args: any[] = [];
        const method = req.method || (req.payload ? 'post' : 'get');

        switch (method) {
            case 'get':
            case 'delete':
                args = [req.params];
                break;
            case 'patch':
            case 'post':
                args = [
                    req.payload,
                    req.params
                ];
                break;
        }

        this._observable = this._http[method](req.url, ...args).subscribe((res) => {
            res = res || {};
            mu.run(res.data, () => {
                this.result.emit(res);
            }, () => {
                this.noData = true;
            });

        });
    }

    debounce_req_http: any = mu.debounce((req: any) => {
        this.req_http(req);
    }, 300);

    ngOnChanges(changes: SimpleChanges) {

        mu.run(changes['params'] && this.req, () => {
            this.req.params = {
                params: this.params
            };
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