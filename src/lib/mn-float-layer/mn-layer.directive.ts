import {Directive, ElementRef, EmbeddedViewRef, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {MnLayerContainerService} from './mn-layer-container.service';

declare const mu: any;

/**
 * 将浮层（floatLayer) 移到根目录下（body）
 * 以此更能准确的定位（position: absolute)
 */

let nextUniqueId: number = 0;

export class MnLayerContext {
    public $implicit: any = null;
    public mnLayer: any = null;
}

@Directive({selector: '[mnLayer]'})
export class MnLayerDirective implements OnInit {
    @Input()
    set mnLayerModule(module) {
        if (module) {
            this._panel.classList.add(module + '-panel');
        }
    }

    _panel: HTMLElement;

    private _context: MnLayerContext = new MnLayerContext();
    private _viewRef: EmbeddedViewRef<MnLayerContext>;

    constructor(private _mlcs: MnLayerContainerService,
                private _vcRef: ViewContainerRef,
                private _tempRef: TemplateRef<MnLayerContext>) {

        this._viewRef = this._vcRef.createEmbeddedView(this._tempRef, this._context);
        this._panel = this._createPaneElement(this._viewRef);
    }

    ngOnInit() {

    }

    private _createPaneElement(_viewRef?: any): HTMLElement {
        let pane = document.createElement('div');
        pane.id = `mn-layer-${nextUniqueId++}`;
        pane.classList.add('mn-layer-panel');
        this._mlcs.getContainer().appendChild(pane);
        if (_viewRef && _viewRef.rootNodes) {
            mu.each(this._viewRef.rootNodes, (_node) => {
                pane.appendChild(_node);
            });
        }
        return pane;
    }
}

