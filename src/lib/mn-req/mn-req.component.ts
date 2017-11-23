import {Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnDestroy, ElementRef, Host} from '@angular/core';
import {Http} from '@angular/http';
import {MnReqNoDataComponent} from './mn-req-nodata.component';
import {Subscriber} from 'rxjs/Subscriber';
import {MnReqService} from './mn-req.service';

declare const mu: any;

@Component({
    selector: 'mn-req',
    template: `
        <ng-template [ngIf]="loading">
            <mn-loader-bar [loader]="loader"
                           [loaderStyle]="loaderStyle"
                           [progress]="process"></mn-loader-bar>
        </ng-template>
        <ng-container *ngIf="showNoData">
            <mn-dynamic-component *ngIf="noData" [component]="noDataComponent" [inputs]="context"></mn-dynamic-component>
        </ng-container>
        <ng-container *ngIf="showNoData ? !noData : true">
            <ng-content></ng-content>
        </ng-container>
        
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
    @Input() loading: boolean = true;
    @Input() loaderStyle: any;
    @Input() showNoData: boolean = true;

    @Output() result: any = new EventEmitter<any>();

    _observable: Subscriber<any>;

    noData: boolean = false;
    noDataComponent: any = MnReqNoDataComponent;

    process: number = 0;

    constructor(private _http: Http,
                private _rs: MnReqService) {
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

        const source = mu.run(req.url, (url) => {
            return this._http[method](url, ...args);
        }, () => {
            const _resources = this._rs.getResources();
            return _resources[req.api][method](req.params || {}, req.payload || {});
        });

        this._observable = source.subscribe((res) => {
            this.process = 100;
            res = res || {};
            mu.run(res.data, () => {
                this.noData = false;
            }, () => {
                this.noData = true;
            });

            this.result.emit(res);
        }, () => {
            this.process = 100;
        }, () => {
            this.process = 100;
        });

    }

    debounceReqHttp: any = mu.debounce((req: any) => {
        mu.run(req, () => {
            this.req_http(req);
        });
    }, 300);

    processStep(): any {
        const tid = setTimeout(() => {
            if (this.process < mu.randomInt(75, 85)) {
                this.process = this.process * 1.05;
                this.processStep();
            } else {
                clearTimeout(tid);
            }
        }, mu.randomInt(300, 1200));
    }

    ngOnChanges(changes: SimpleChanges) {

        mu.run(this.req, () => {
            this.process = mu.randomInt(0, 49);
            this.processStep();
        });

        mu.run(changes['params'] && this.req, () => {
            this.req.params = {
                params: this.params
            };
            this.params = null;
            this.debounceReqHttp(this.req);
        });

        mu.run(changes['payload'] && this.req, () => {
            this.req.payload = this.payload;
            this.payload = null;
            this.debounceReqHttp(this.req);
        });

        mu.run(changes['req'], () => {
            this.debounceReqHttp(this.req);
        });

    }

    ngOnDestroy(): void {
        this._observable && this._observable.unsubscribe();
    }

}
