import { AfterViewInit, OnInit, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { MnLayerContainerService } from './mn-layer-container.service';
export declare class MnLayerContext {
    $implicit: any;
    mnLayer: any;
}
export declare class MnLayerDirective implements OnInit, AfterViewInit {
    private _render;
    private _mlcs;
    private _vcRef;
    private _tempRef;
    _module: any;
    _styles: any;
    _hide_evt: any;
    mnLayerStatus: any;
    result: any;
    _clear: any;
    _showed: boolean;
    _setStyle(styles: any): void;
    _layer: HTMLElement;
    private _context;
    private _viewRef;
    constructor(_render: Renderer2, _mlcs: MnLayerContainerService, _vcRef: ViewContainerRef, _tempRef: TemplateRef<MnLayerContext>);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    private _createLayerElement();
    private _show();
    private _hide();
}
