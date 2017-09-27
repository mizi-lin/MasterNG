import {Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnDestroy, ElementRef, Host} from '@angular/core';
import {Http} from '@angular/http';
import {MnReqNoDataComponent} from './mn-req-nodata.component';
import {Subscriber} from 'rxjs/Subscriber';
import {MnReqService} from './mn-req.service';

declare const mu: any;

@Component({
    selector: 'mn-req',
    template: `
        <mn-loader-bar *ngIf="loader" [loaderRef]="loaderRef"
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
    @Input('mnLoaderRef') loaderRef?: ElementRef;
    @Input('mnLoader') loader?: boolean = true;

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
                this.result.emit(res);
            }, () => {
                this.noData = true;
            });
        }, () => {
            this.process = 100;
        }, () => {
            this.process = 100;
        });

    }

    debounce_req_http: any = mu.debounce((req: any) => {
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
