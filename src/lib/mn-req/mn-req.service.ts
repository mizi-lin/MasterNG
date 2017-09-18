import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

declare const mu: any;

@Injectable()
export class MnReqService {
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

    getHeaders(fn: any) {
        return fn ? fn(this._headers) : this._headers;
    }

    constructor() {
    }
}
