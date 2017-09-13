import { OnInit } from '@angular/core';
import { ResourcePool } from './resource-pool';
import { Http } from '@angular/http';
import { MnFileSaverServices } from '../../lib/mn-common/services/mn-file-saver.services';
export declare class DemoReqComponent implements OnInit {
    _rp: ResourcePool;
    private _http;
    private _mnFileServ;
    user_data: any;
    demo_data: any;
    user_req: any;
    resource_params: any;
    reload: any;
    resource_reload: any;
    download($event: any): void;
    csvDownload($event: any): void;
    zipDownload($event: any): void;
    constructor(_rp: ResourcePool, _http: Http, _mnFileServ: MnFileSaverServices);
    ngOnInit(): void;
}
