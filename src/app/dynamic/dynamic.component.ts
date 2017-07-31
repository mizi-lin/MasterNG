import {Component, OnInit} from '@angular/core';
import {DynamicSample1Component} from '../../lib/dynamic/dynamic-component.directive';



@Component({
    selector: 'aaa',
    template: 'bbbbbbbbbbb',
})
export class DyComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }
}


@Component({
    selector: 'ngx-dynamic',
    templateUrl: './dynamic.component.html',
    styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit {

    title: string = `title a, b, c `;
    html: string = require('./test.html');

    ccc: any = DynamicSample1Component;

    constructor() {
    }

    ngOnInit() {
    }

}

