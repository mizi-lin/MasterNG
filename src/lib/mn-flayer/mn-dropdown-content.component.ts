import {Component, ElementRef, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'mn-dropdown-content',
    template: `
        <ng-content></ng-content>
    `,
    encapsulation: ViewEncapsulation.None
})
export class MnDropdownContentComponent implements OnInit {
    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) {
    }

    ngOnInit() {
    }
}