"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_layer_container_service_1 = require("./mn-layer-container.service");
/**
 * 将浮层（floatLayer) 移到根目录下（body）
 * 以此更能准确的定位（position: absolute)
 */
var nextUniqueId = 0;
var MnLayerContext = (function () {
    function MnLayerContext() {
        this.$implicit = null;
        this.mnLayer = null;
    }
    return MnLayerContext;
}());
exports.MnLayerContext = MnLayerContext;
var MnLayerDirective = (function () {
    function MnLayerDirective(_render, _ms, _vcRef, _tempRef) {
        this._render = _render;
        this._ms = _ms;
        this._vcRef = _vcRef;
        this._tempRef = _tempRef;
        this.result = new core_1.EventEmitter();
        this._showed = false;
        this._context = new MnLayerContext();
    }
    Object.defineProperty(MnLayerDirective.prototype, "position_", {
        set: function (p) {
            var _this = this;
            p = p || 'top center';
            p = p.toLowerCase().replace(/\s{2,}/, '');
            p = p === 'left' ? 'left middle'
                : p === 'top' ? 'top center'
                    : p === 'right' ? 'right middle'
                        : p === 'bottom' ? 'bottom center'
                            : p;
            mu.run(p.split(' '), function (ps) {
                if (ps.length < 2) {
                    console.error('position error');
                    return;
                }
                _this._position = mu.map(ps, function (pos, index) {
                    return pos + index.toString();
                });
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MnLayerDirective.prototype, "mnLayerStatus", {
        set: function (status) {
            var _this = this;
            if (status === 'show') {
                this._show();
            }
            else if (status === 'hide' && !this._showed) {
                this._clear = setTimeout(function () {
                    _this._hide();
                }, 300);
            }
        },
        enumerable: true,
        configurable: true
    });
    MnLayerDirective.prototype.ngOnInit = function () {
    };
    MnLayerDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.result.emit({
            hide: function () { return _this._hide(); },
            show: function () { return _this._show; }
        });
    };
    MnLayerDirective.prototype._createLayerElement = function () {
        var _this = this;
        var layer = document.createElement('div');
        layer.id = "mnc-layer-" + nextUniqueId++;
        layer.classList.add('mnc-layer');
        layer.classList.add(this._module);
        this._ms.getContainer().appendChild(layer);
        this._layer = layer;
        // 绑定事件
        this._render.listen(layer, 'mouseover', function () {
            _this._showed = true;
            clearTimeout(_this._clear);
        });
        // 移出下拉框，隐藏下拉框
        this._render.listen(layer, 'mouseleave', function () {
            _this._clear = setTimeout(function () {
                _this._hide();
                _this._showed = false;
            }, 500);
        });
        // 绑定隐藏事件
        mu.run(this._hide_evt, function () {
            _this._render.listen(layer, _this._hide_evt, function () {
                _this._hide();
                _this._showed = false;
            });
        });
    };
    // 显示下拉框
    // 显示下拉框
    MnLayerDirective.prototype._show = 
    // 显示下拉框
    function () {
        var _this = this;
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
        mu.each(this._viewRef.rootNodes, function (_node) {
            _this._layer.appendChild(_node);
        });
        // 设置浮动层位置
        this._adjustPosition(this._layer, function () {
            _this._render.addClass(_this._layer, 'mnc-show');
            _this._render.removeClass(_this._layer, 'mnc-hide');
        });
        // const _el = this._viewRef.nativeElement;
    };
    // 隐藏下拉框
    // 移除下拉内容
    // 隐藏下拉框
    // 移除下拉内容
    MnLayerDirective.prototype._hide = 
    // 隐藏下拉框
    // 移除下拉内容
    function () {
        this._vcRef.clear();
        this._viewRef = null;
        this._showed = false;
        if (this._layer) {
            this._render.addClass(this._layer, 'mnc-hide');
            this._render.removeClass(this._layer, 'mnc-show');
        }
    };
    /**
     * 设置浮动层显示位置
     * @private
     */
    /**
         * 设置浮动层显示位置
         * @private
         */
    MnLayerDirective.prototype._adjustPosition = /**
         * 设置浮动层显示位置
         * @private
         */
    function (layer, fn) {
        var _this = this;
        setTimeout(function () {
            mu.run(_this._position, function () {
                var _layerBody = layer.firstElementChild;
                var _sRect = _this._sRef.nativeElement.getBoundingClientRect();
                var _tRect = _layerBody.getBoundingClientRect();
                // console.log('::::::sRect', _sRect);
                // console.log('::::::_tRect', _tRect);
                var position = {};
                position.left0 = { left: _this.adjustLeft(_sRect.left - _tRect.width, _tRect) };
                position.right0 = { left: _this.adjustLeft(_sRect.right, _tRect) };
                position.top0 = { top: _this.adjustTop(_sRect.top - _tRect.height - 5 - 8, _tRect) };
                position.bottom0 = { top: _this.adjustTop(_sRect.bottom, _tRect) };
                position.left1 = { left: _this.adjustLeft(_sRect.left, _tRect) };
                position.right1 = { left: _this.adjustLeft(_sRect.right - _tRect.width, _tRect) };
                position.top1 = { top: _this.adjustTop(_sRect.top, _tRect) };
                position.bottom1 = { top: _this.adjustTop(_sRect.bottom + _tRect.height, _tRect) };
                position.center1 = { left: _this.adjustLeft(_sRect.left + (_sRect.width / 2) - (_tRect.width / 2), _tRect) };
                position.center0 = position.center1;
                position.middle1 = { top: _this.adjustTop(_sRect.top + (_sRect.height / 2) - (_tRect.height / 2), _tRect) };
                position.middle0 = position.middle1;
                var _map = {};
                mu.each(_this._position, function (key, index) {
                    _map = mu.extend(_map, position[key]);
                    _this._render.addClass(_layerBody, 'mnc-' + key);
                });
                // 确认相对位置
                mu.run(_map, function () {
                    mu.each(_map, function (value, key) {
                        _this._render.setStyle(_this._layer, key, value + 'px');
                    });
                });
                // call back
                fn && fn();
            });
        }, 100);
    };
    MnLayerDirective.prototype.adjustLeft = function (left, _tRect) {
        var _adjust = 16;
        var _window_width = window.innerWidth;
        var _width = _tRect.width;
        if (left < _adjust) {
            return _adjust;
        }
        else if ((left + _width) > _window_width) {
            return _window_width - _width - _adjust;
        }
        else {
            return left;
        }
    };
    MnLayerDirective.prototype.adjustTop = function (top, _tRect) {
        var _adjust = 16;
        var _window_height = window.innerHeight;
        var _height = _tRect.height;
        if (top < _adjust) {
            return _adjust;
        }
        else if ((top + _height) > _window_height) {
            return _window_height - _height - _adjust;
        }
        else {
            return top;
        }
    };
    MnLayerDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[mnLayer]' },] },
    ];
    /** @nocollapse */
    MnLayerDirective.ctorParameters = function () { return [
        { type: core_1.Renderer2, },
        { type: mn_layer_container_service_1.MnLayerContainerService, },
        { type: core_1.ViewContainerRef, },
        { type: core_1.TemplateRef, },
    ]; };
    MnLayerDirective.propDecorators = {
        "_module": [{ type: core_1.Input, args: ['mnLayerModule',] },],
        "position_": [{ type: core_1.Input, args: ['mnLayerPosition',] },],
        "_sRef": [{ type: core_1.Input, args: ['mnLayerSourceRef',] },],
        "_hide_evt": [{ type: core_1.Input, args: ['mnLayerHideEvt',] },],
        "mnLayerStatus": [{ type: core_1.Input },],
        "result": [{ type: core_1.Output, args: ['mnResult',] },],
    };
    return MnLayerDirective;
}());
exports.MnLayerDirective = MnLayerDirective;
//# sourceMappingURL=mn-layer.directive.js.map