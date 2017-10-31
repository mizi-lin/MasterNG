import { OnInit } from '@angular/core';
import { MnDatetimeServices } from './mn-datetime.services';
export declare class MuDatetimeQuickComponent implements OnInit {
    private _mds;
    status: string;
    _relatively: any;
    _absolute: any;
    mnQuick: any;
    result: any;
    constructor(_mds: MnDatetimeServices);
    ngOnInit(): void;
    getDate(rule: any): void;
}
