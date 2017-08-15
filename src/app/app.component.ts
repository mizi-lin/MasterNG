import {AfterViewInit, Component} from '@angular/core';
import * as $ from 'jquery';
declare let mu: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
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
