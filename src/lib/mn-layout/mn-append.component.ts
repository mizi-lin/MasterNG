import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'mn-append',
    template: `
        <ng-content></ng-content>
    `,
    encapsulation: ViewEncapsulation.None
})
export class MnAppendComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }
}
