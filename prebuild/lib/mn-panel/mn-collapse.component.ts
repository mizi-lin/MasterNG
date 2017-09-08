import {Component, OnInit, Input, ContentChildren, AfterViewInit, OnChanges, SimpleChanges} from '@angular/core';
import * as mu from 'mzmu';
import {MnPanelComponent} from './mn-panel.component';
import {MnPanelSimpleComponent} from './mn-panel-simple.component';

declare const mu: any;

@Component({
    selector: 'mn-collapse',
    template: `
        <ng-content></ng-content>`,
    styles: [
            `
            :host {
                display: block;
                width: 100%;
            }
            `
    ]
})
export class MnCollapseComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() accordion: boolean;
    @Input() collapse: string;

    @ContentChildren(MnPanelComponent) _panels: any;
    @ContentChildren(MnPanelSimpleComponent) _panelSimples: any;

    constructor() {
    }

    ngOnInit(): void {
    }

    toggleAccordion(_panels, _panel, state): void {
        mu.each(_panels, (__panel) => {
            if (__panel !== _panel) {
                __panel._toggle_collapse(state);
            } else {
                __panel._toggle_collapse(_panel.isCollapse);
            }
        });
    }

    adjustPanels(_panels: any): void {
        mu.exist(this.accordion, (showIndex) => {
            mu.each(_panels, (_panel, index) => {
                const _toggle_collapse = _panel.toggle_collapse.bind(_panel);
                _toggle_collapse(showIndex !== index);
                _panel._toggle_collapse = _toggle_collapse;
                _panel.collapse = true;
                _panel.isChanges = true;
                _panel.toggle_collapse = () => {
                    this.toggleAccordion(_panels, _panel, true);
                };

            });
        }, () => {
            mu.each(_panels, (_panel) => {
                _panel.collapse = this.collapse;
            });
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        // console.debug(changes);
    }

    ngAfterViewInit(): void {
        // console.debug(this._panels);

        // 重写 toggle_collapse 方法
        setTimeout(() => {
            mu.run(this._panels, (_panels) => {
                this.adjustPanels(_panels._results);
            });

            mu.run(this._panelSimples, (_ps) => {
                const _panels = mu.map(_ps._results, (o) => o._panel);
                this.adjustPanels(_panels);
            });

        }, 1);

    }
}

