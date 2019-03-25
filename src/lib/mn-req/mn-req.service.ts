import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import  mu from 'mzmu';

@Injectable()
export class MnReqServices {
    progress$ = new BehaviorSubject<any>({});
    progress_: number;

    get progress(): any {
        return this.progress_;
    }

    set progress(value: any) {
        this.progress_ = value;
        this.progress$.next(value);
    }

    /**
     * httpInterceptor headers
     */
    _headers: any;

    setHeaders(headers: any) {
        this._headers = headers;
    }

    getHeaders(fn?: any) {
        return fn ? fn(this._headers) : this._headers;
    }

    /**
     * resource
     */
    _resources: any;

    setResources(resources: any) {
        this._resources = resources;
    }

    getResources(fn?: any) {
        return fn ? fn(this._resources) : this._resources;
    }

    reqCatch(error, caught, url): any {
        return void 0;
    }

    reqError(error, caught, url): any {
        return void 0;
    }

    /**
     * 设置nodata component
     */
    _noDataComponent: any;

    setNoDataComponent(component) {
        this._noDataComponent = component;
    }

    _restful: boolean;

    setRestful(b: boolean) {
        this._restful = b;
    }

    constructor() {
    }
}
