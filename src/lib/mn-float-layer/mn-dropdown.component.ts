import {
    Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild, ViewChildren,
    ViewEncapsulation
} from '@angular/core';

declare const mu: any;

let i = 300, ii = 200;

@Component({
    selector: 'mn-dropdown',
    template: `
        <div>
            <ng-content></ng-content>
        </div>

        <ng-template
                [mnLayerModule]="'dropdown'"
                [mnLayerStatus]="status"
                [mnLayerStyle]="styles"
                [mnLayerHideEvt]="hidetype"
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

    constructor(private _ref: ElementRef) {
    }

    /**
     * 获得下拉菜单的位置
     * @return {any}
     * @private
     */
    _position(): any {
        const _el = this._ref.nativeElement;
        const rect = _el.getBoundingClientRect();

        const top = rect.top + rect.height;
        const left = rect.left;
        return {
            top,
            left
        };
    }

    _evt: any = mu.debounce(($event) => {
        const type = $event.type;
        if (type === 'mouseover' || type === 'click') {
            this.status = 'show';
            this.styles = {
                left: this._position().left + 'px',
                top: (this._position().top + 1) + 'px'
            };
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




