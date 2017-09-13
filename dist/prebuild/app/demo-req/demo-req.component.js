"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var resource_pool_1 = require("./resource-pool");
var http_1 = require("@angular/http");
var mn_file_saver_services_1 = require("../../lib/mn-common/services/mn-file-saver.services");
var DemoReqComponent = (function () {
    function DemoReqComponent(_rp, _http, _mnFileServ) {
        var _this = this;
        this._rp = _rp;
        this._http = _http;
        this._mnFileServ = _mnFileServ;
        this.user_req = {
            url: './assets/store/user.json'
        };
        this.resource_params = {
            store: 'store',
            name: 'user',
            key: 'req_resource'
        };
        this.reload = {
            name: 'reload',
            click: function ($event) {
                _this.user_req = mu.clone(_this.user_req);
            }
        };
        this.resource_reload = function () {
            _this.resource_params = mu.clone(_this.resource_params);
        };
    }
    DemoReqComponent.prototype.download = function ($event) {
        var _this = this;
        this._http.get('./assets/file/MasterNg.csv').subscribe(function (res) {
            _this._mnFileServ.fileSaver([res.toString()], 'masterNg.csv');
        });
    };
    DemoReqComponent.prototype.csvDownload = function ($event) {
        var _this = this;
        this._http.get('./assets/store/csv-data.json').subscribe(function (res) {
            var content = _this._mnFileServ.csvData(res);
            _this._mnFileServ.fileSaver([content], 'csv-data.csv');
        });
    };
    DemoReqComponent.prototype.zipDownload = function ($event) {
        var _this = this;
        this._http.get('./assets/file/download.zip', {
            responseType: http_1.ResponseContentType.Blob
        }).subscribe(function (res) {
            _this._mnFileServ.blobSaver([res], 'masterNg.zip');
        });
    };
    DemoReqComponent.prototype.ngOnInit = function () {
        var _this = this;
        var i = 0;
        var l = setInterval(function () {
            _this._rp.demo.get({
                store: 'store',
                name: 'user',
                key: 'req_resource'
            }).subscribe(function () {
                i++;
                console.debug(i);
                if (i > 5) {
                    clearInterval(l);
                }
            });
        }, 300);
    };
    return DemoReqComponent;
}());
DemoReqComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'app-demo-req',
                template: '<div class="demo-req">      <mn-panel-s class="bordered" title="ReqHttp"         [tools]="[reload]">         <req-http [req]="user_req" (result)="user_data = $event.data">             {{user_data | json}}         </req-http>     </mn-panel-s>      <mn-panel-s class="bordered mt-8" title="ReqResource"              [tools]="[{                 name: \'reload\',                 click: resource_reload              }]">          <req-resource [pool]="_rp"                       [req]="{method: \'get\', key: \'demo\' }"                       [params]="resource_params"                       (result)="demo_data = $event.data">             {{demo_data | json}}         </req-resource>     </mn-panel-s>       <mn-panel-s class="bordered mt-8" title="ReqDownload">         <mn-row>             <mn-col [span]="8">                 <button mn-btn (click)="download($event)">（文本）CSV 文件下载</button>             </mn-col>             <mn-col [span]="8">                 <button mn-btn (click)="csvDownload($event)">（文本）多维数组转CSV下载 </button>             </mn-col>             <mn-col [span]="8">                 <button mn-btn (click)="zipDownload($event)">（二进制流）压缩包下载</button>             </mn-col>         </mn-row>     </mn-panel-s>  </div> ',
                styles: ['.demo-req {  padding: 8px;}']
            },] },
];
/** @nocollapse */
DemoReqComponent.ctorParameters = function () { return [
    { type: resource_pool_1.ResourcePool, },
    { type: http_1.Http, },
    { type: mn_file_saver_services_1.MnFileSaverServices, },
]; };
exports.DemoReqComponent = DemoReqComponent;
//# sourceMappingURL=demo-req.component.js.map