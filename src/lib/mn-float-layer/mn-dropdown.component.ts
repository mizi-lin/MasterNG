import {Component, ContentChild, ElementRef, HostListener, OnInit, ViewChild, ViewChildren, ViewEncapsulation} from '@angular/core';
import {MnDropdownContentComponent} from './mn-dropdown-content.component';

@Component({
    selector: 'mn-dropdown',
    template: `
        <div>
            <ng-content></ng-content>
        </div>

        <ng-template
            [mnLayerModule]="'mn-dropdown'"
                mnLayer>
            <ng-content select="mn-dropdown-content"></ng-content>
        </ng-template>

    `,
    // styleUrls: ['./mn-dropdown.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MnDropdownComponent implements OnInit {

    @ContentChild(MnDropdownContentComponent) _content;

    constructor(private _ref: ElementRef) {
    }

    ngOnInit() {
    }
}




