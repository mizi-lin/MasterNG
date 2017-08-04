import {
    Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter,
    ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import * as mu from 'mzmu';

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
    styleUrls: ['./dynamic.component.scss'],

})
export class DynamicDemoComponent implements OnInit {

    title: string = `将进酒::李白`;
    html: string = require('./test.html');

    ccc: any = DynamicSample1Component;
    context: any = {};

    count: number = 0;

    outevt($event): void {
        // console.debug($event);
    }

    constructor(private cdRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.context.text = +new Date();
        this.context.title = 'This v - title';
    }

}

@Component({
    selector: 'dynamic-sample-1',
    template: `
        <div>{{title}}</div> 
        <panel-s class="bordered" title="OOOO::oooo">Dynamic sample 1 ({{text}}) {{abc}}</panel-s>
    `
})
export class DynamicSample1Component implements OnChanges, OnInit {
    abc: string = 'adssadad';

    text: string = 's';

    @Input() title: any;

    // @Input context: any;

    @Output() abcd: any = new EventEmitter<any>();

    constructor() {

    }

    ngOnInit() {
        this.abcd.emit({
            a: 1111111111
        });
    }

    ngOnChanges(changes: SimpleChanges) {
    }
}
