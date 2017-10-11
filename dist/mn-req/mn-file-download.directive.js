"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("../assets/jquery.file-download.js");
var http_1 = require("@angular/http");
var mn_file_saver_services_1 = require("../mn-common/services/mn-file-saver.services");
var MnFileDownloadDirective = (function () {
    function MnFileDownloadDirective(_http, _fileSaverServ) {
        this._http = _http;
        this._fileSaverServ = _fileSaverServ;
        this.download = new core_1.EventEmitter();
    }
    MnFileDownloadDirective.prototype.click = function ($event) {
        // (<any>jQuery).fileDownload(this.req.url, {
        //     successCallback: function (url) {
        //         console.debug(url);
        //     },
        //     failCallback: function (responseHtml, url) {
        //         console.debug(responseHtml, url);
        //     }
        // });
        var _this = this;
        this._http.get(this.req.url).subscribe(function (res) {
            _this._fileSaverServ.fileSaver([res.toString()], 'aa.csv');
        });
        this.download.emit($event);
    };
    return MnFileDownloadDirective;
}());
MnFileDownloadDirective.decorators = [
    { type: core_1.Directive, args: [{ selector: '[file-download]' },] },
];
/** @nocollapse */
MnFileDownloadDirective.ctorParameters = function () { return [
    { type: http_1.Http, },
    { type: mn_file_saver_services_1.MnFileSaverServices, },
]; };
MnFileDownloadDirective.propDecorators = {
    'req': [{ type: core_1.Input },],
    'download': [{ type: core_1.Output },],
    'click': [{ type: core_1.HostListener, args: ['click', ['$event'],] },],
};
exports.MnFileDownloadDirective = MnFileDownloadDirective;
//# sourceMappingURL=mn-file-download.directive.js.map