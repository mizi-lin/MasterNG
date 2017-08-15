import {Component, OnInit} from '@angular/core';
import * as mu from 'mzmu';
import {ResourcePool} from './resource-pool';

declare const mu: any;

@Component({
    selector: 'app-demo-req',
    templateUrl: './demo-req.component.html',
    styleUrls: ['./demo-req.component.scss']
})
export class DemoReqComponent implements OnInit {

    user_req: any = {
        url: './assets/store/user.json'
    };

    resource_params: any = {
        store: 'store',
        name: 'user',
        key: 'req_resource'
    };

    reload: any = {
        name: 'reload',
        click: ($event) => {
            this.user_req = mu.clone(this.user_req);
        }
    };

    resource_reload: any = () => {
        this.resource_params = mu.clone(this.resource_params);
    };

    constructor(private _rp: ResourcePool) {
    }

    ngOnInit() {
        let i = 0;
        const l = setInterval(() => {
            this._rp.demo.get({
                store: 'store',
                name: 'user',
                key: 'req_resource'
            }).subscribe(() => {
                i++;
                console.debug(i);
                if (i > 5) {
                    clearInterval(l);
                }
            });

        }, 300);

    }

}
