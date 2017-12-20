import { OnInit, OnChanges, SimpleChanges } from '@angular/core';
export declare class ButtonCheckComponent implements OnInit, OnChanges {
    type: string;
    checked: boolean;
    name: string;
    onclick(target: any): void;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
}
