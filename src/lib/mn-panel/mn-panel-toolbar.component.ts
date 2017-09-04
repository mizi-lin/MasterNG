import {
    Component, OnInit, Input, ContentChildren, AfterViewInit, ElementRef,
    Renderer2, OnChanges, SimpleChanges, HostListener, DoCheck
} from '@angular/core';
import * as mu from 'mzmu';

declare const mu: any;

@Component({
    selector: 'mn-panel-toolbar',
    template: `
        <mn-row [gutter]="8" [where]="where">
            <mn-col *ngIf="toolMap['fullscreen']" [order]="toolMap['fullscreen'].order">
                <tool-expand *ngIf="!fullscreen" (fsClick)="fullscreen_click($event)"></tool-expand>
                <tool-compress *ngIf="fullscreen" (fsClick)="fullscreen_click($event)"></tool-compress>
            </mn-col>

            <mn-col *ngIf="toolMap['remove']" [order]="toolMap['remove'].order">
                <i class="fa fa-remove" aria-hidden="true"></i>
            </mn-col>

            <mn-col *ngIf="toolMap['reload']" [order]="toolMap['reload'].order">
                <tool-refresh (fsClick)="toolMap['reload']._click($event)"></tool-refresh>
            </mn-col>

            <mn-col *ngIf="toolMap['collapse']" [order]="toolMap['collapse'].order">
                <tool-collapse-up></tool-collapse-up>
                <tool-collapse-down></tool-collapse-down>
            </mn-col>

            <mn-col *ngIf="toolMap['|']" [order]="toolMap['|'].order">
                <ng-content></ng-content>
            </mn-col>

            <ng-content select="mn-col"></ng-content>
            <ng-content select="ng-template"></ng-content>
        </mn-row>
    `,
    styles: [
    ]
})
export class PanelToolbarComponent implements OnChanges {

    @Input() tools: string[];
    @Input() where: string;

    // -> fullscreen  控制全屏控件toggle
    fullscreen: boolean = false;

    fullscreen_click($event): void {
        this.fullscreen = !this.fullscreen;
        this.toolMap['fullscreen']._click(this.fullscreen, $event);
    }

    // -> toolMap
    toolMap: any = {};

    constructor(private _ref: ElementRef,
                private _renderer: Renderer2) {

    }

    ngOnChanges(changes: SimpleChanges): void {
        mu.exist(changes['tools'], () => {
            this.toolMap = mu.map(this.tools || [], (key, i) => {

                if (typeof key === 'string') {
                    key = {
                        name: key
                    };
                }

                key.order = key.order || (i + 1) * 10;
                // key.click = key.click || mu.noop;

                key._click = ($event) => {
                    if (key.click) {
                       return key.click($event);
                    }
                };

                return {
                    __key__: key.name,
                    __val__: key
                };
            }, {});
        });
    }
}
