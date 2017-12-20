import { OnInit } from '@angular/core';
import { MnDatetimeServices } from './mn-datetime.services';
export declare class MuDatetimeRangesComponent implements OnInit {
    private _mds;
    _type: string;
    _ranges: any[];
    _views: any[];
    type: any;
    result: any;
    selected: any;
    _view: string;
    constructor(_mds: MnDatetimeServices);
    ngOnInit(): void;
    getDate(rule: any): void;
    selectView(_view: string): void;
}
