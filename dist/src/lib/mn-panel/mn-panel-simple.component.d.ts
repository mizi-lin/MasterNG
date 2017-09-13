import { ElementRef, Renderer2, OnChanges, SimpleChanges, AfterContentChecked } from '@angular/core';
export declare class MnPanelSimpleComponent implements OnChanges, AfterContentChecked {
    private _ref;
    private _renderer;
    _title: string;
    title: any;
    tools: string[];
    theme: string;
    _panel: any;
    constructor(_ref: ElementRef, _renderer: Renderer2);
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterContentChecked(): void;
}
