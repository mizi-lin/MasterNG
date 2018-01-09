import {
    Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnDestroy, ElementRef,
    ViewEncapsulation
} from '@angular/core';
import {MnReqNoDataComponent} from './mn-req-nodata.component';
import {Subscriber} from 'rxjs/Subscriber';
import {MnReqServices} from './mn-req.service';
import {HttpClient} from '@angular/common/http';

declare const mu: any;

@Component({
    selector: 'mn-req, mn-http',
    template: `
        <ng-template [ngIf]="_showLoading">
            <mn-loader-bar [loader]="loader"
                           [loaderStyle]="loaderStyle"
                           [progress]="_process"></mn-loader-bar>
        </ng-template>

        <ng-template [ngIf]="_showGutter">
            <mn-gutter [mnRows]="1" *ngIf="_process != 100"></mn-gutter>
        </ng-template>

        <ng-container *ngIf="_showNoData">
            <mn-dynamic-component
                    *ngIf="_isNoData && _process === 100"
                    [component]="_noDataComponent"
                    [inputs]="_noDataContext">
            </mn-dynamic-component>
        </ng-container>

        <ng-container *ngIf="_showNoData ? !_isNoData : true">
            <ng-content></ng-content>
        </ng-container>
    `,

    styleUrls: ['./mn-req.scss'],
    encapsulation: ViewEncapsulation.None

})
export class MnReqHttpComponent implements OnChanges, OnDestroy {

    @Output() result: any = new EventEmitter<any>();

    @Input() req: any;

    @Input('mnData') _data: any;
    @Input('mnShowGutter') _showGutter: boolean = true;
    @Input('mnShowLoading') _showLoading: boolean = true;
    @Input('mnNoDataComponent') _noDataComponent: any = this._rs._noDataComponent || MnReqNoDataComponent;
    @Input('mnNoDataContext') _noDataContext: any;
    @Input('mnShowNoData') _showNoData: boolean = true;
    @Input() loader: ElementRef;
    @Input() loaderStyle: any;

    _observable: Subscriber<any>;
    _restful: boolean = true;
    _isNoData: boolean = false;
    _process: number = 0;
    _delay: number = 500;

    _dbTimeId: any;

    constructor(private _http: HttpClient,
                private _rs: MnReqServices) {

        // 获取 resource pool
        this._restful = mu.ifnvl(this._rs._restful, true);
    }

    reqHttp(req: any): void {
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

        // this._observable && this._observable.unsubscribe();

        this._observable = source.subscribe((res) => {
                this._process = 100;
                res = res || {};
                mu.run(this._restful ? res.data : res, () => {
                    this._isNoData = false;
                }, () => {
                    this._isNoData = true;
                });
                this.result.emit(res);
            },
            // error
            () => {
                this._process = 100;
                this._isNoData = true;
                this.result.emit({});
            },
            // completed
            () => {
                this._process = 100;
            });

    }

    ngOnChanges(changes: SimpleChanges) {
        mu.run(this.req, () => {
            this._process = mu.randomInt(0, 49);
            this.processStep();
        });

        mu.run(changes['req'], () => {
            this.debounceReqHttp(this.req);
        });

        /**
         * req 与 data 二者只可同时生效其一
         * req 占主导位置
         */
        mu.run(!this.req && changes['_data'], () => {
            this._process = mu.randomInt(this._process || 30, 60);
            this.debounceData(changes['_data']);
        });

    }

    ngOnDestroy(): void {
        this._observable && this._observable.unsubscribe();
    }

    debounceReqHttp: any = mu.debounce((req: any) => {
        mu.run(req, () => {
            this.ngOnDestroy();
            this.reqHttp(req);
        });
    }, this._delay);

    // 处理直接传递数据
    debounceData: any = mu.debounce((change) => {
        // data 只认存在数据（isExist)
        let _data = mu.prop(change, 'currentValue.data') || mu.prop(change, 'currentValue');
        if (mu.isExist(_data)) {
            this._dbTimeId && clearTimeout(this._dbTimeId);
            this._process = 99;
            this._dbTimeId = setTimeout(() => {
                this._isNoData = mu.isEmpty(_data);
                this.result.emit(_data);
                this._process = 100;
            }, 2500);
        }
    }, this._delay);

    processStep(): any {
        const tid = setTimeout(() => {
            if (this._process < mu.randomInt(75, 85)) {
                this._process = this._process * 1.05;
                this.processStep();
            } else {
                clearTimeout(tid);
            }
        }, mu.randomInt(300, 1200));
    }

}
