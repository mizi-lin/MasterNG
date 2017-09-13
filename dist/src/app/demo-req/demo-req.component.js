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
                templateUrl: './demo-req.component.html',
                styleUrls: ['./demo-req.component.scss']
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