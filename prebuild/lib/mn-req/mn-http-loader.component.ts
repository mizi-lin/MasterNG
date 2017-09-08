import { Component, OnInit } from '@angular/core';
import {MnReqService} from './mn-req.service';

@Component({
    selector: 'http-loader',
    template: `
        <mn-loader-bar [progress]="progress" position="fixed" [where]="'http-load'"></mn-loader-bar>
    `
})
export class MnHttpLoaderComponent implements OnInit {

    progress: number;

    constructor(
        private _reqServ: MnReqService
    ) {
        _reqServ.progress$.subscribe((v) => {
            this.progress = v;
        });
    }

    ngOnInit() {

    }

}
