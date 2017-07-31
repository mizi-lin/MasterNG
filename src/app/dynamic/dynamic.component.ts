import {Component, OnInit} from '@angular/core';
import {DynamicComponent} from '../../lib/dynamic/dynamic-component.directive';



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
export class DynamicDemoComponent implements OnInit {

    title: string = `title a, b, c `;
    html: string = require('./test.html');

    ccc: any = DynamicSample1Component;

    constructor() {
    }

    ngOnInit() {
    }

}

@Component({
    selector: 'dynamic-sample-1',
    template: `<div>Dynamic sample 1 ({{context?.text}} - {{abc}})</div> <panel-s title="xxxx"></panel-s>`
})
export class DynamicSample1Component extends DynamicComponent {
    abc: string = 'adssadad';
}
