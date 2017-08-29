import {Directive, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';

declare const mu: any, jQuery: any;
import './jquery.file-download.js';
import {Http} from '@angular/http';

import {saveAs} from 'file-saver/FileSaver.js';
import {MnReqService} from './mn-req.service';

@Directive({selector: '[file-download]'})
export class MnFileDownloadDirective {

    @Input() req: any;

    @Output() download: any = new EventEmitter<any>();

    @HostListener('click', ['$event'])
    click($event) {
        // (<any>jQuery).fileDownload(this.req.url, {
        //     successCallback: function (url) {
        //         console.debug(url);
        //     },
        //     failCallback: function (responseHtml, url) {
        //         console.debug(responseHtml, url);
        //     }
        // });

        this._http.get(this.req.url).subscribe((res) => {
            this._reqServ.fileSaver([res.toString()], 'aa.csv');
        });

        this.download.emit($event);
    }

    constructor(private _http: Http, private _reqServ: MnReqService) {

    }
}
