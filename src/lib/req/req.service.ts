import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

declare const mu: any;

@Injectable()
export class ReqService {
    progress$ = new BehaviorSubject<any>({});
    progress_: number;

    get progress(): any {
        return this.progress_;
    }

    set progress(value: any) {
        this.progress_ = value;
        this.progress$.next(value);
    }

    constructor() {
    }
}
