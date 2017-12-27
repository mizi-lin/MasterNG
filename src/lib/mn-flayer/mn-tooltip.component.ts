import {
    Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewEncapsulation
} from '@angular/core';

declare const mu: any;

@Component({
    selector: '[mnTooltip]',
    template: `
        <ng-content></ng-content>
        <ng-template
                [mnLayerModule]="'mnTooltip'"
                [mnLayerPosition]="_position"
                [mnLayerStatus]="_status"
                [mnLayerHideEvt]="_hideType"
                [mnLayerSourceRef]="_ref"
                (mnResult)="_result($event)"
                mnLayer>
            <div [innerHTML]="_tooltip"></div>
        </ng-template>
    `,
    // styleUrls: ['./mn-dropdown.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MnTooltipComponent implements OnInit {

    @HostListener('mouseover', ['$event'])
    hover_($event) {
        mu.run(this._hasEvt($event.type), () => this._evt($event));
    }

    @HostListener('click', ['$event']) _click = this.hover_;

    @HostListener('mouseleave', ['$event'])
    out_($event) {
        this._evt($event);
    }

    @Input('mnTooltip') _tooltip: string;
    @Input('mnShowTypes') _showTypes: string = 'mouseover';
    @Input('mnHideEventType') _hideType: string;
    @Input('mnPosition') _position: string = 'top center';

    @Output('mnResult') result: any = new EventEmitter<any>();

    _status: string = 'hide';

    constructor(public _ref: ElementRef) {
    }

    _evt: any = mu.debounce(($event) => {
        const type = $event.type;
        if (type === 'mouseover' || type === 'click') {
            this._status = 'show';
        } else if (type === 'mouseleave') {
            this._status = 'hide';
        }
    }, 300);

    _hasEvt(type) {
        const types = this._showTypes.split(',');
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




