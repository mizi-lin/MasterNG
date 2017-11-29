import {
    Component, OnInit, Input, AfterViewInit, ElementRef,
    Renderer2, OnChanges, SimpleChanges, HostListener, HostBinding, ViewEncapsulation
} from '@angular/core';
// import {ColComponent} from './col.component';
declare const mu: any;

@Component({
    selector: 'mn-row, mn-fill',
    template: '<ng-content></ng-content>',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./layout.scss']
})
export class MnRowComponent implements OnChanges {
    @Input() gutter;
    @Input() where;

    // 让控件支持高度100%
    // height percent hundred
    @Input() hph: boolean | string = true;

    @HostBinding('style.height')
    get getHph() {
        return this.hph === true ? '100%' : this.hph === false ? 'auto' : this.hph;
    }

    constructor(private _ref: ElementRef,
                private _renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        mu.exist(changes['gutter'], () => {
            const i = Math.ceil(this.gutter / 2);
            this._renderer.setStyle(this._ref.nativeElement, 'marginLeft', -i + 'px');
            this._renderer.setStyle(this._ref.nativeElement, 'marginRight', -i + 'px');
            this._renderer.addClass(this._ref.nativeElement, 'gutter-' + i);
        });
    }
}
