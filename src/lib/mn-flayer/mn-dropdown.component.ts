import {
    Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewEncapsulation
} from '@angular/core';

import * as mu from 'mzmu';

@Component({
    selector: 'mn-dropdown',
    template: `
        <div>
            <ng-content></ng-content>
        </div>

        <ng-template
                [mnLayerModule]="'mnDropDown'"
                [mnLayerStatus]="status"
                [mnLayerHideEvt]="hidetype"
                [mnLayerPosition]="'bottom left'"
                [mnLayerSourceRef]="_ref"
                (mnResult)="_result($event)"
                mnLayer>
            <ng-content select="mn-dropdown-content"></ng-content>
        </ng-template>

    `,
    styleUrls: ['./mn-dropdown.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MnDropdownComponent implements OnInit {

    @HostListener('mouseover', ['$event'])
    _hover($event) {
        mu.run(this._hasEvt($event.type), () => this._evt($event));
    }

    @HostListener('click', ['$event']) _click = this._hover;

    @HostListener('mouseleave', ['$event'])
    _out($event) {
        this._evt($event);
    }

    @Input('mnShowTypes') showtypes: string = 'mouseover';

    @Input('mnHideEventType') hidetype: string;

    @Output('mnResult') result: any = new EventEmitter<any>();

    status: string = 'hide';

    styles: any;

    top: number;
    left: number;

    constructor(public _ref: ElementRef) {
    }

    _evt: any = mu.debounce(($event) => {
        const type = $event.type;
        if (type === 'mouseover' || type === 'click') {
            this.status = 'show';
        } else if (type === 'mouseleave') {
            this.status = 'hide';
        }
    }, 300);

    _hasEvt(type) {
        const types = this.showtypes.split(',');
        const _rst = types.filter((_type) => {
            return _type.trim() === type;
        });

        return !mu.isEmpty(_rst);
    }

    _result($event) {
        this.result.emit($event);
    }

    ngOnInit() {
    }
}




