import { OnInit } from '@angular/core';
import { MnReqServices } from './mn-req.service';
export declare class MnReqLoaderComponent implements OnInit {
    private _reqServ;
    progress: number;
    constructor(_reqServ: MnReqServices);
    ngOnInit(): void;
}
