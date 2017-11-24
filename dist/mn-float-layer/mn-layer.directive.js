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
    function MnLayerDirective(_render, _mlcs, _vcRef, _tempRef) {
        this._render = _render;
        this._mlcs = _mlcs;
        this._vcRef = _vcRef;
        this._tempRef = _tempRef;
        this.result = new core_1.EventEmitter();
        this._showed = false;
        this._context = new MnLayerContext();
    }
    Object.defineProperty(MnLayerDirective.prototype, "mnLayerStatus", {
        set: function (status) {
            var _this = this;
            if (status === 'show') {
                this._show();
                this._setStyle(this._styles);
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
    MnLayerDirective.prototype._setStyle = function (styles) {
        var _this = this;
        mu.map(styles, function (val, key) {
            _this._render.setStyle(_this._layer, key, val);
        });
    };
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
        mu.run(this._module, function (module) { return layer.classList.add("mnc-" + module + "-layer"); });
        this._mlcs.getContainer().appendChild(layer);
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
        // mu.run(this._hide_evt, () => {
        //     this._render.listen(layer, this._hide_evt, () => {
        //         this._hide();
        //         this._showed = false;
        //     });
        // });
    };
    // 显示下拉框
    MnLayerDirective.prototype._show = function () {
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
        this._render.addClass(this._layer, 'mnc-show');
        this._render.removeClass(this._layer, 'mnc-hide');
        mu.each(this._viewRef.rootNodes, function (_node) {
            _this._layer.appendChild(_node);
        });
    };
    // 隐藏下拉框
    // 移除下拉内容
    MnLayerDirective.prototype._hide = function () {
        this._vcRef.clear();
        this._viewRef = null;
        this._showed = false;
        if (this._layer) {
            this._render.addClass(this._layer, 'mnc-hide');
            this._render.removeClass(this._layer, 'mnc-show');
        }
    };
    return MnLayerDirective;
}());
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
    '_module': [{ type: core_1.Input, args: ['mnLayerModule',] },],
    '_styles': [{ type: core_1.Input, args: ['mnLayerStyle',] },],
    '_hide_evt': [{ type: core_1.Input, args: ['mnLayerHideEvt',] },],
    'mnLayerStatus': [{ type: core_1.Input },],
    'result': [{ type: core_1.Output, args: ['mnResult',] },],
};
exports.MnLayerDirective = MnLayerDirective;
//# sourceMappingURL=mn-layer.directive.js.map