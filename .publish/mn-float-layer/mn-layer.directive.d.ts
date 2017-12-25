import { AfterViewInit, OnInit, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { MnLayerContainerService } from './mn-layer-container.service';
/**
 * 将浮层（floatLayer) 移到根目录下（body）
 * 以此更能准确的定位（position: absolute)
 */
export declare class MnLayerContext {
    $implicit: any;
    mnLayer: any;
}
export declare class MnLayerDirective implements OnInit, AfterViewInit {
    private _render;
    private _ms;
    private _vcRef;
    private _tempRef;
    _module: any;
    _position: any;
    position_: string;
    _sRef: any;
    _hide_evt: any;
    mnLayerStatus: any;
    result: any;
    _clear: any;
    _showed: boolean;
    _layer: any;
    private _context;
    private _viewRef;
    constructor(_render: Renderer2, _ms: MnLayerContainerService, _vcRef: ViewContainerRef, _tempRef: TemplateRef<MnLayerContext>);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    _createLayerElement(): void;
    _show(): void;
    _hide(): void;
    /**
     * 设置浮动层显示位置
     * @private
     */
    _adjustPosition(layer: any, fn?: any): void;
    adjustLeft(left: any, _tRect: any): any;
    adjustTop(top: any, _tRect: any): any;
}
