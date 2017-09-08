import {AfterViewInit, Component} from '@angular/core';
import * as $ from 'jquery';
declare let mu: any;

@Component({
    selector: 'app-root',
    template: '<http-loader></http-loader>   <ngx-button>aaaa</ngx-button>  <router-outlet></router-outlet>',
    styles: ['']
})
export class AppComponent implements AfterViewInit {
    title = 'app';

    constructor() {
        this.title = 'AAPPP';
        // console.log($);
        // console.log(mu);
        // console.log(jQuery);

    }

    ngAfterViewInit(): void {
    }
}
