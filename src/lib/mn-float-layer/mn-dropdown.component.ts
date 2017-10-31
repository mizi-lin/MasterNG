import {Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'mn-dropdown',
    template: `
        <ng-content></ng-content>
    `,
    styleUrls: ['./mn-dropdown.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MnDropdownComponent implements OnInit {
    
    constructor(private _ref: ElementRef) {
    }

    ngOnInit() {
    }
}

@Component({
    selector: 'mn-dropdown-content',
    template: `
        <ng-content></ng-content>
    `,
    encapsulation: ViewEncapsulation.None
})
export class MnDropdownContentComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
    }
}


