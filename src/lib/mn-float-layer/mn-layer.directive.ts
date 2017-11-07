import {
    AfterViewInit,
    Directive, ElementRef, EmbeddedViewRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, Renderer2, TemplateRef,
    ViewContainerRef
} from '@angular/core';
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
export class MnLayerDirective implements OnInit, AfterViewInit {

    @Input('mnLayerModule') _module;

    // set mnLayerModule(module) {
    //     if (module) {
    //         // this._layer.classList.add(module + '-panel');
    //     }
    // }

    @Input('mnLayerStyle') _styles;

    @Input('mnLayerHideEvt') _hide_evt;

    @Input()
    set mnLayerStatus(status) {
        if (status === 'show') {
            this._show();
            this._setStyle(this._styles);
        } else if (status === 'hide' && !this._showed) {
            this._clear = setTimeout(() => {
                this._hide();
            }, 300);
        }
    }

    @Output('mnResult') result: any = new EventEmitter<any>();

    _clear: any;
    _showed: boolean = false;

    _setStyle(styles) {
        mu.map(styles, (val, key) => {
            this._render.setStyle(this._layer, key, val);
        });
    }

    _layer: HTMLElement;

    private _context: MnLayerContext = new MnLayerContext();
    private _viewRef: EmbeddedViewRef<MnLayerContext>;

    constructor(private _render: Renderer2,
                private _mlcs: MnLayerContainerService,
                private _vcRef: ViewContainerRef,
                private _tempRef: TemplateRef<MnLayerContext>) {
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.result.emit({
            hide: () => this._hide(),
            show: () => this._show
        });
    }

    private _createLayerElement() {
        let layer = document.createElement('div');
        layer.id = `mnc-layer-${nextUniqueId++}`;
        layer.classList.add('mnc-layer');
        mu.run(this._module, module => layer.classList.add(`mnc-${module}-layer`));
        this._mlcs.getContainer().appendChild(layer);
        this._layer = layer;

        // 绑定事件
        this._render.listen(layer, 'mouseover', () => {
            this._showed = true;
            clearTimeout(this._clear);
        });

        // this._render.listen(layer, 'mouseleave', () => {
        //     this._clear = setTimeout(() => {
        //         this._hide();
        //         this._showed = false;
        //     }, 500);
        // });

        // 绑定隐藏事件
        mu.run(this._hide_evt, () => {
            this._render.listen(layer, this._hide_evt, () => {
                this._hide();
                this._showed = false;
            });
        });
    }

    // 显示下拉框
    private _show(): void {

        if (this._clear) {
            clearTimeout(this._clear);
        }

        if (!this._layer) {
            this._createLayerElement();
        }

        if (!this._viewRef) {
            this._viewRef = this._vcRef.createEmbeddedView(this._tempRef, this._context);
        }

        mu.each(this._viewRef.rootNodes, (_node) => {
            this._layer.appendChild(_node);
        });
    }

    // 隐藏下拉框
    // 移除下拉内容
    private _hide(): void {
        this._vcRef.clear();
        this._viewRef = null;
        this._showed = false;
    }
}

