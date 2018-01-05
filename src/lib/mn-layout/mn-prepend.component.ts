import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'mn-prepend',
    template: `
        <ng-content></ng-content>
    `,
    encapsulation: ViewEncapsulation.None
})
export class MnPrependComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }
}
