import {
    Component, Input, ElementRef, Renderer2, OnChanges, SimpleChanges, ContentChild, HostBinding,
    AfterContentChecked
} from '@angular/core';
import {MnPanelBodyComponent} from './mn-panel-body.component';

declare const mu: any;

@Component({
    selector: 'mn-panel',
    template: `
        <ng-content></ng-content>
    `,
    styles: [
            `
            :host {
                height: 100%;
                width: 100%;
            }
            `
    ]
})
export class MnPanelComponent implements OnChanges, AfterContentChecked {

    @ContentChild(MnPanelBodyComponent) panelBody: any;

    @Input() where: string;

    // @ContentChildren(MnPanelBodyComponent, {descendants: true}) ss: any;
    // @ContentChild(forwardRef(() => MnPanelBodyComponent)) children: any;
    // @ViewChild(MnPanelBodyComponent) ss: any;

    isCollapse = true;
    isChanges = false;

    toggle_collapse(state?: boolean): void {
        mu.exist(state, () => {
            this.isCollapse = state;
        });

        mu.run(this.panelBody, (cmp) => {
            this.isCollapse
                ? cmp._renderer.setAttribute(cmp._ref.nativeElement, 'hidden')
                : cmp._renderer.removeAttribute(cmp._ref.nativeElement, 'hidden');
            this.isCollapse = !this.isCollapse;
            this.class_collapse_drop = this.isCollapse;
            this.class_collapse_up = !this.isCollapse;
        });
    }

    _ngChanges(): void {
        this.isChanges = true;
        this.isCollapse = this.collapse === 'up';
        this.toggle_collapse();
    }

    /**
     * header-title 是否支持 collapse
     */
    @Input() collapse: string;
    @HostBinding('class.collapse-up') class_collapse_up: boolean;
    @HostBinding('class.collapse-drop') class_collapse_drop: boolean;


    constructor(private _ref: ElementRef,
                private _renderer: Renderer2) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        // 默认展开
        mu.exist(changes['collapse'], () => {
            this._ngChanges();
        });
    }

    ngAfterContentChecked(): void {
        if (!this.isChanges && this.collapse) {
            this._ngChanges();
        }
    }

}
