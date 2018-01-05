import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ResourcePool} from './resource-pool';
import {Http, ResponseContentType} from '@angular/http';
import {MnFileSaverServices} from '../../lib/mn-common/services/mn-file-saver.services';
import {DemoNodataComponent} from '../demo-nodata/demo-nodata.component';
import {HttpClient, HttpResponse} from '@angular/common/http';

declare const mu: any;

@Component({
    selector: 'app-demo-req',
    templateUrl: './demo-req.component.html',
    styleUrls: ['./demo-req.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemoReqComponent implements OnInit {

    user_data: any;
    demo_data: any;

    user_req: any = {
        url: './assets/store/user1.json'
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

    download($event) {
        this._http.get('./assets/file/MasterNg.csv').subscribe((res) => {
            this._mnFileServ.fileSaver([res.toString()], 'masterNg.csv');
        });
    }

    csvDownload($event) {
        this._http.get('./assets/store/csv-data.json').subscribe((res: any) => {
            const content = this._mnFileServ.csvData(res);
            this._mnFileServ.fileSaver([content], 'csv-data.csv');
        });
    }

    zipDownload($event) {
        this._http.get('./assets/file/download.zip', {
            responseType: 'blob'
        }).subscribe((res: any) => {
            this._mnFileServ.blobSaver([res], 'masterNg.zip');
        });
    }

    constructor(public _rp: ResourcePool, private _http: HttpClient, private _mnFileServ: MnFileSaverServices) {
        // this._http.post('./assets/store/user.json', {
        //     params: {
        //         cef: 1,
        //         efj: 2
        //     }
        // }).subscribe((a) => {
        //     console.log('ooOoOOoOOoo', a);
        // });

        this._rp.demo.post({
            store: 'abcdef',
            name: 'jiangshan',
            ee: 'eeee',
            ff: 'aaaa'
        }, {a: 1}).subscribe((a) => {
            console.log('ooOoOOoOOoo', a);
        });
    }

    ngOnInit() {
        // let i = 0;
        // const l = setInterval(() => {
        //     this._rp.demo.get({
        //         store: 'store',
        //         name: 'user',
        //         key: 'req_resource'
        //     }).subscribe(() => {
        //         i++;
        //         console.debug(i);
        //         if (i > 5) {
        //             clearInterval(l);
        //         }
        //     });
        //
        // }, 300);
    }

}
