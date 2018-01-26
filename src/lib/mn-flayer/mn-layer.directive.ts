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
export class MnLayerContext {
    public $implicit: any = null;
    public mnLayer: any = null;
}

@Directive({selector: '[mnLayer]'})
export class MnLayerDirective implements OnInit, AfterViewInit {

    @Input('mnLayerModule') _module;
    @Input('mnLayerId') _layerId;

    _position: any;

    @Input('mnLayerPosition')
    set position_(p: string) {
        p = p || 'top center';
        p = p.toLowerCase().replace(/\s{2,}/, '');
        p = p === 'left' ? 'left middle'
            : p === 'top' ? 'top center'
                : p === 'right' ? 'right middle'
                    : p === 'bottom' ? 'bottom center'
                        : p;

        mu.run(p.split(' '), (ps) => {
            if (ps.length < 2) {
                console.error('position error');
                return;
            }
            this._position = mu.map(ps, (pos, index) => {
                return pos + index.toString();
            });
        });

    }

    @Input('mnLayerSourceRef') _sRef;
    @Input('mnLayerHideEvt') _hide_evt;

    @Input()
    set mnLayerStatus(status) {
        if (status === 'show') {
            this._show();
        } else if (status === 'hide' && !this._showed) {
            this._clear = setTimeout(() => {
                this._hide();
            }, 300);
        }
    }

    @Output('mnResult') result: any = new EventEmitter<any>();

    _clear: any;
    _showed: boolean = false;
    _layer: any;

    private _context: MnLayerContext = new MnLayerContext();
    private _viewRef: EmbeddedViewRef<MnLayerContext>;

    constructor(private _render: Renderer2,
                private _ms: MnLayerContainerService,
                private _vcRef: ViewContainerRef,
                private _tempRef: TemplateRef<MnLayerContext>) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.result.emit({
            hide: () => this._hide(),
            show: () => this._show()
        });
    }

    _createLayerElement() {
        let layer = this._ms.createLayerElement(this._module, this._layerId);
        this._layer = layer;

        // 绑定事件
        this._render.listen(layer, 'mouseover', () => {
            this._showed = true;
            clearTimeout(this._clear);
        });

        if (mu.or(this._module, 'mnTooltip', 'mnDropDown')) {
            // 移出下拉框，隐藏下拉框
            // this._render.listen(layer, 'mouseleave', () => {
            //     this._clear = setTimeout(() => {
            //         this._hide();
            //         this._showed = false;
            //     }, 500);
            // });
        }

        // 绑定隐藏事件
        mu.run(this._hide_evt, () => {
            this._render.listen(layer, this._hide_evt, () => {
                this._hide();
                this._showed = false;
            });
        });
    }

    // 显示下拉框
    _show(): void {
        if (this._clear) {
            clearTimeout(this._clear);
        }

        if (!this._layer) {
            this._createLayerElement();
        }

        if (!this._viewRef) {
            this._viewRef = this._vcRef.createEmbeddedView(this._tempRef, this._context);
        }

        this._render.addClass(this._layer, 'mnc-hide');

        mu.each(this._viewRef.rootNodes, (_node) => {
            this._layer.appendChild(_node);
        });

        // 设置浮动层位置
        this._adjustPosition(this._layer, () => {
            this._render.addClass(this._layer, 'mnc-show');
            this._render.removeClass(this._layer, 'mnc-hide');
        });

        // const _el = this._viewRef.nativeElement;

    }

    // 隐藏下拉框
    // 移除下拉内容
    _hide(): void {
        this._vcRef.clear();
        this._viewRef = null;
        this._showed = false;

        if (this._layer) {
            this._render.addClass(this._layer, 'mnc-hide');
            this._render.removeClass(this._layer, 'mnc-show');
        }
    }

    /**
     * 设置浮动层显示位置
     * @private
     */
    _adjustPosition(layer: any, fn?: any) {
        setTimeout(() => {
            mu.run(this._position, () => {
                const _layerBody = layer.firstElementChild;
                const _sRect = this._sRef.nativeElement.getBoundingClientRect();
                const _tRect = _layerBody.getBoundingClientRect();

                // console.log('::::::sRect', _sRect);
                // console.log('::::::_tRect', _tRect);

                let position: any = {};
                position.left0 = {left: this.adjustLeft(_sRect.left - _tRect.width, _tRect)};
                position.right0 = {left: this.adjustLeft(_sRect.right, _tRect)};
                position.top0 = {top: this.adjustTop(_sRect.top - _tRect.height - 5 - 8, _tRect)};
                position.bottom0 = {top: this.adjustTop(_sRect.bottom, _tRect)};
                position.left1 = {left: this.adjustLeft(_sRect.left, _tRect)};
                position.right1 = {left: this.adjustLeft(_sRect.right - _tRect.width, _tRect)};
                position.top1 = {top: this.adjustTop(_sRect.top, _tRect)};
                position.bottom1 = {top: this.adjustTop(_sRect.bottom + _tRect.height, _tRect)};
                position.center1 = {left: this.adjustLeft(_sRect.left + (_sRect.width / 2) - (_tRect.width / 2), _tRect)};
                position.center0 = position.center1;
                position.middle1 = {top: this.adjustTop(_sRect.top + (_sRect.height / 2) - (_tRect.height / 2), _tRect)};
                position.middle0 = position.middle1;

                let _map = {};

                mu.each(this._position, (key, index) => {
                    _map = mu.extend(_map, position[key]);
                    this._render.addClass(_layerBody, 'mnc-' + key);
                });

                // 确认相对位置
                mu.run(_map, () => {
                    mu.each(_map, (value, key) => {
                        this._render.setStyle(this._layer, key, value + 'px');
                    });
                });

                // call back
                fn && fn();
            });
        }, 100);
    }

    adjustLeft(left, _tRect) {
        let _adjust = 16;
        let _window_width = window.innerWidth;
        let _width = _tRect.width;

        if (left < _adjust) {
            return _adjust;
        } else if ((left + _width) > _window_width) {
            return _window_width - _width - _adjust;
        } else {
            return left;
        }
    }

    adjustTop(top, _tRect) {
        let _adjust = 16;
        let _window_height = window.innerHeight;
        let _height = _tRect.height;

        if (top < _adjust) {
            return _adjust;
        } else if ((top + _height) > _window_height) {
            return _window_height - _height - _adjust;
        } else {
            return top;
        }
    }
}

