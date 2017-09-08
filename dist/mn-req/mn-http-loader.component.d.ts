import { OnInit } from '@angular/core';
import { MnReqService } from './mn-req.service';
export declare class MnHttpLoaderComponent implements OnInit {
    private _reqServ;
    progress: number;
    constructor(_reqServ: MnReqService);
    ngOnInit(): void;
}
