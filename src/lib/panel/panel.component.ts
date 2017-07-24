import {
    Component, Input, ContentChildren, AfterViewInit, ElementRef,
    Renderer2, OnChanges, SimpleChanges, HostListener, ContentChild, HostBinding
} from '@angular/core';
import * as mu from 'mzmu';
import {PanelBodyComponent} from './panel-body.component';
declare var mu: any;

@Component({
    selector: 'panel',
    template: `
        <ng-content></ng-content>
    `,
    styles: [
        `
            :host {
               width: 100%;
            }
        `
    ]
})
export class PanelComponent implements OnChanges {
    isCollapse: boolean = true;

    toggle_collapse(): void {
        mu.run(this.panelBody, (cmp) => {
            this.isCollapse ? cmp._renderer.setAttribute(cmp._ref.nativeElement, 'hidden') : cmp._renderer.removeAttribute(cmp._ref.nativeElement, 'hidden');
            this.isCollapse = !this.isCollapse;
            this.class_collapse_drop = this.isCollapse;
            this.class_collapse_up = !this.isCollapse;
        });
    }

    constructor(private _ref: ElementRef,
                private _renderer: Renderer2) {

    }

    @ContentChild(PanelBodyComponent) panelBody: any;

    /**
     * header-title 是否支持 collapse
     */
    @Input() collapse: string;
    @HostBinding('class.collapse-up') class_collapse_up: boolean;
    @HostBinding('class.collapse-drop') class_collapse_drop: boolean;

    @HostListener('click', ['$event']) onClick(event: any) {
        if (this.collapse && mu.or(event.target.nodeName, 'PANEL-TITLE')) {
            this.toggle_collapse();
        }

    }

    ngOnChanges(changes: SimpleChanges): void {
        console.debug('ooOoooOooOOOOooo', changes);

        // 默认展开
        mu.exist(changes['collapse'], () => {
            this.isCollapse = this.collapse === 'up';
            this.toggle_collapse();
        });
    }

}