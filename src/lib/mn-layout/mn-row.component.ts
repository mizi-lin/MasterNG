import {
    Component, OnInit, Input, AfterViewInit, ElementRef,
    Renderer2, OnChanges, SimpleChanges
} from '@angular/core';
// import {ColComponent} from './col.component';
declare const mu: any;

@Component({
    selector: 'mn-row, [mn-row], mn-fill, [mn-fill]',
    template: '<ng-content></ng-content>',
    styleUrls: ['./layout.scss']
})
export class MnRowComponent implements OnChanges {
    @Input() gutter;
    @Input() where;

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
