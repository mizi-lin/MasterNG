import {Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnDestroy, ElementRef, Host} from '@angular/core';
import {Http} from '@angular/http';
import {MnReqNoDataComponent} from './mn-req-nodata.component';
import {Subscriber} from 'rxjs/Subscriber';
declare const mu: any;

@Component({
    selector: 'req-http',
    template: `
        <mn-loader-bar *ngIf="loading" [loader]="loader"
                       [progress]="process"></mn-loader-bar>
        <mn-dynamic-component *ngIf="noData" [component]="noDataComponent" [inputs]="context"></mn-dynamic-component>
        <ng-content *ngIf="!noData"></ng-content>
    `,
    styles: [
            `:host {
            display: block;
            width: 100%;
            height: 100%;
        }`
    ]
})
export class ReqHttpComponent implements OnChanges, OnDestroy {

    @Input() req: any;
    @Input() params: any;
    @Input() payload: any;
    @Input() data: any;
    @Input() context: any;
    @Input() loader: ElementRef;

    // todo
    @Input() loading: boolean = true;

    @Output() result: any = new EventEmitter<any>();

    _observable: Subscriber<any>;

    noData: boolean = false;
    noDataComponent: any = MnReqNoDataComponent;

    process: number = 0;

    constructor(private _http: Http) {
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
            this.process = 100;
            res = res || {};
            mu.run(res.data, () => {
                this.result.emit(res);
            }, () => {
                this.noData = true;
            });

        });
    }

    debounce_req_http: any = mu.debounce((req: any) => {
        mu.run(req, () => {
            this.req_http(req);
        });
    }, 300);

    ngOnChanges(changes: SimpleChanges) {

        mu.run(this.req, () => {
            this.process = 50;
        });

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
