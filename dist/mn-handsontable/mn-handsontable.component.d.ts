import { AfterViewInit, ElementRef, OnChanges, OnInit, SimpleChanges } from '@angular/core';
export declare class MnHandsontableComponent implements OnInit, AfterViewInit, OnChanges {
    private _ref;
    el: any;
    data: any;
    uri: string;
    hot: any;
    constructor(_ref: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
}
