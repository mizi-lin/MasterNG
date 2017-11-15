import { OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
export declare class MnCollapseComponent implements OnInit, OnChanges, AfterViewInit {
    accordion: boolean;
    collapse: string;
    _panels: any;
    _panelSimples: any;
    constructor();
    ngOnInit(): void;
    toggleAccordion(_panels: any, _panel: any, state: any): void;
    adjustPanels(_panels: any): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
}
