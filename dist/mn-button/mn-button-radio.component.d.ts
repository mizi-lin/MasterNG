import { OnInit, OnChanges, SimpleChanges, ElementRef, Renderer2, DoCheck } from '@angular/core';
export declare class ButtonRadioComponent implements OnInit, OnChanges, DoCheck {
    private _ref;
    private _render;
    type: string;
    checked: boolean;
    name: string;
    cls: string;
    onclick(target: any): void;
    radio: any;
    constructor(_ref: ElementRef, _render: Renderer2);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngDoCheck(): void;
}
