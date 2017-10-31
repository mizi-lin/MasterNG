import { OnInit } from '@angular/core';
import { MnReqService } from './mn-req.service';
export declare class MnReqLoaderComponent implements OnInit {
    private _reqServ;
    progress: number;
    constructor(_reqServ: MnReqService);
    ngOnInit(): void;
}
