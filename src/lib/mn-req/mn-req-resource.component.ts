import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Subscriber} from 'rxjs/Subscriber';
import {MnReqNoDataComponent} from './mn-req-nodata.component';
import * as mu from 'mzmu';

declare let mu: any;

@Component({
    selector: 'req-resource',
    template: `
        <mn-loader-bar *ngIf="loading"
                       [progress]="process"></mn-loader-bar>
        <dynamic-component *ngIf="noData" [component]="noDataComponent" [inputs]="context"></dynamic-component>
        <ng-content *ngIf="!noData"></ng-content>
    `,
    styles: [
            `:host {
            display: block;
        }`
    ]
})
export class MnReqResourceComponent implements OnInit, OnChanges, OnDestroy {

    @Input() pool: any;
    @Input() req: any | {
        key: string,
        method: string,
        params: any,
        payload: any
    };
    @Input() params: any;
    @Input() payload: any;
    @Input() context: any;

    // todo
    @Input() loading = true;

    @Output() result: any = new EventEmitter<any>();

    _observable: Subscriber<any>;

    noData: boolean = false;
    noDataComponent: any = MnReqNoDataComponent;

    process: number;

    constructor() {
    }

    ngOnInit() {
    }

    req_http(req: any): void {
        const method = req.method || (req.payload ? 'post' : 'get');
        mu.run(mu.prop(this.pool, req.key), (pool) => {
                this._observable = pool[method](req.params, req.paylaod).subscribe((res: any = {}) => {
                    this.process = 100;
                    mu.run(res.data, () => {
                        this.result.emit(res);
                    }, () => {
                        this.noData = true;
                    });
                });
            },
            // fail request
            () => {
                this.process = 100;
            });
    }

    debounce_req_http: any = mu.debounce((req: any) => {
        this.req_http(req);
    }, 300);

    ngOnChanges(changes: SimpleChanges) {

        this.process = Math.round(Math.random() * 30);

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
        mu.run(this._observable, (_ob) => _ob.unsubscribe());
    }
}


