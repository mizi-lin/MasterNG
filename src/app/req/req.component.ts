import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {ResourcePool} from './resource-pool';

declare const mu: any;

@Component({
    selector: 'ngx-req',
    templateUrl: './req.component.html',
    styleUrls: ['./req.component.scss']
})
export class ReqComponent implements OnInit {

    data: any;

    params: any = {
        t: + new Date()
    };

    payload: any = {
        d: 4, e: 5
    };

    req: any = {
        url: 'assets/store/company.json',
        method: 'get',
        params: this.params,
        payload: {
            a: 1,
            b: 2,
            c: 3
        }
    };

    constructor(
        private _http: Http,
        private _rp: ResourcePool
    ) {
    }

    ngOnInit() {
        this._http.get('assets/store/info.json', {
            params: {
                t: + new Date()
            }
        }).subscribe((res) => {
            this.data = res;
        });

        this._rp.demo.get({
            store: 'store',
            name: 'user',
            key: 'Resource_User'
        }).subscribe((res) => {
            this.data = res;
        });

        this._rp.demo.post({
            store: 'store',
            name: 'company',
            key: 'Resource_Company'
        },{
            ttt: + new Date()
        }).subscribe((res) => {
            this.data = res;
        });



        // setInterval(() => {
        //     this.params = {
        //         t: + new Date()
        //     };
        //
        //     this.payload = {
        //         tttt: + new Date()
        //     };
        // }, 3000)

    }

}

