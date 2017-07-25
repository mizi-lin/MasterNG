import {Component, OnInit, Input, ContentChildren, AfterViewInit, OnChanges, SimpleChanges} from '@angular/core';
import * as mu from 'mzmu';
import {PanelComponent} from './panel.component';
declare var mu: any;

@Component({
    selector: 'collapse',
    template: `<ng-content></ng-content>`,
    styles: [
        `
            :host {
                display: block;
                width: 100%;
            }
        `
    ]
})
export class CollapseComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() accordion: boolean;
    @Input() collapse: string;

    @ContentChildren(PanelComponent) _panels: any;

    constructor() {
    }

    ngOnInit(): void {
    }

    toggle_accordion(_panel, state): void {
        mu.run(this._panels, (_panels) => {
            mu.each(_panels._results, (__panel) => {
                if (__panel !== _panel) {
                    __panel._toggle_collapse(state);
                } else {
                    __panel._toggle_collapse(_panel.isCollapse);
                }
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
                mu.exist(this.accordion, (showIndex) => {
                    mu.each(_panels._results, (_panel, index) => {
                        let _toggle_collapse = _panel.toggle_collapse.bind(_panel);
                        _toggle_collapse(showIndex !== index);
                        _panel._toggle_collapse = _toggle_collapse;
                        _panel.collapse = true;
                        _panel.isChanges = true;
                        _panel.toggle_collapse = () => {
                            this.toggle_accordion(_panel, true);
                        };

                    });
                }, () => {
                    mu.each(_panels._results, (_panel) => {
                        _panel.collapse = this.collapse;
                    });
                });
            });
        }, 1);

    }
}

