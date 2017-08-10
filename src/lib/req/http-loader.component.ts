import { Component, OnInit } from '@angular/core';
import {ReqService} from './req.service';


@Component({
    selector: 'http-loader',
    template: `
        <loader-bar [progress]="progress" position="fixed" [where]="'http-load'"></loader-bar>
    `
})
export class HttpLoaderComponent implements OnInit {

    progress: number;

    constructor(
        private _reqServ: ReqService
    ) {
        _reqServ.progress$.subscribe((v) => {
            this.progress = v;
        });
    }

    ngOnInit() {

    }

}
