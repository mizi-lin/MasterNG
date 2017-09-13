import { ElementRef, Renderer2, OnChanges, SimpleChanges, AfterContentChecked } from '@angular/core';
export declare class MnPanelComponent implements OnChanges, AfterContentChecked {
    private _ref;
    private _renderer;
    panelBody: any;
    where: string;
    isCollapse: boolean;
    isChanges: boolean;
    toggle_collapse(state?: boolean): void;
    _ngChanges(): void;
    /**
     * header-title 是否支持 collapse
     */
    collapse: string;
    class_collapse_up: boolean;
    class_collapse_drop: boolean;
    constructor(_ref: ElementRef, _renderer: Renderer2);
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterContentChecked(): void;
}
