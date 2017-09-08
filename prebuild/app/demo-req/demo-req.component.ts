import {Component, OnInit} from '@angular/core';
import {ResourcePool} from './resource-pool';
import {Http, ResponseContentType} from '@angular/http';
import {MnFileSaverServices} from '../../lib/mn-common/services/mn-file-saver.services';

declare const mu: any;

@Component({
    selector: 'app-demo-req',
    template: '<div class="demo-req">      <mn-panel-s class="bordered" title="ReqHttp"         [tools]="[reload]">         <req-http [req]="user_req" (result)="user_data = $event.data">             {{user_data | json}}         </req-http>     </mn-panel-s>      <mn-panel-s class="bordered mt-8" title="ReqResource"              [tools]="[{                 name: \'reload\',                 click: resource_reload              }]">          <req-resource [pool]="_rp"                       [req]="{method: \'get\', key: \'demo\' }"                       [params]="resource_params"                       (result)="demo_data = $event.data">             {{demo_data | json}}         </req-resource>     </mn-panel-s>       <mn-panel-s class="bordered mt-8" title="ReqDownload">         <mn-row>             <mn-col [span]="8">                 <button mn-btn (click)="download($event)">（文本）CSV 文件下载</button>             </mn-col>             <mn-col [span]="8">                 <button mn-btn (click)="csvDownload($event)">（文本）多维数组转CSV下载 </button>             </mn-col>             <mn-col [span]="8">                 <button mn-btn (click)="zipDownload($event)">（二进制流）压缩包下载</button>             </mn-col>         </mn-row>     </mn-panel-s>  </div> ',
    styles: ['.demo-req {  padding: 8px;}']
})
export class DemoReqComponent implements OnInit {

    user_data: any;
    demo_data: any;

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
    }

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
            responseType: ResponseContentType.Blob
        }).subscribe((res: any) => {
            this._mnFileServ.blobSaver([res], 'masterNg.zip');
        });
    }

    constructor(public _rp: ResourcePool, private _http: Http, private _mnFileServ: MnFileSaverServices) {
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
