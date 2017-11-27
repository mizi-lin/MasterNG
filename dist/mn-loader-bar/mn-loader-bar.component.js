"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mn_loader_bar_services_1 = require("./mn-loader-bar.services");
var MnLoaderBarComponent = (function () {
    function MnLoaderBarComponent(_ref, _render, _lbs) {
        var _this = this;
        this._ref = _ref;
        this._render = _render;
        this._lbs = _lbs;
        this._position = this.position || 'relative';
        this.loaderStyle = {};
        this.done = new core_1.EventEmitter();
        this._width = 0;
        this._height = 3;
        this.here = 0;
        this.width = this._width;
        this.height = this._height;
        this.on = 0;
        // 若loader不作用，则删除
        if (!this._lbs.config.loader) {
            setTimeout(function () {
                var elm_ = _this._ref.nativeElement;
                elm_.parentElement.removeChild(elm_);
            }, 0);
            return;
        }
        setTimeout(function () {
            mu.run(_this.loader, function (ref) {
                var el = mu.prop(ref, 'elementRef.nativeElement') || mu.prop(ref, 'nativeElement');
                el.appendChild(_ref.nativeElement);
            });
            /**
             * 设置父元素的style.position
             * 以及自身style.position
             */
            var parent = _ref.nativeElement.parentElement;
            if (!mu.or(parent.style.position, 'absolute', 'fixed')) {
                _render.setStyle(parent, 'position', 'relative');
                _this._position = _this.position === 'fixed' ? 'fixed' : 'absolute';
            }
        }, 1);
    }
    Object.defineProperty(MnLoaderBarComponent.prototype, "zIndex", {
        set: function (value) {
            var _this = this;
            mu.exist(value, function () { return _this._render.setStyle(_this._ref.nativeElement, 'zIndex', value); });
        },
        enumerable: true,
        configurable: true
    });
    MnLoaderBarComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (!this._lbs.config.loader) {
            return;
        }
        mu.exist(changes['progress'], function () {
            mu.run(_this.width >= 100, function () {
                _this.width = _this._width;
                _this.height = _this._height;
            });
            setTimeout(function () {
                _this.go(_this.progress);
            }, 100);
        });
    };
    MnLoaderBarComponent.prototype.move = function () {
        var _this = this;
        var dist = this.width - this.here;
        if (dist < 0.1 && dist > -0.1) {
            this.width = this.here;
            this.on = 0;
            if (this.width >= 100) {
                this.height = 0;
                setTimeout(function () {
                    _this.done.emit({});
                }, 300);
            }
        }
        else {
            this.width = this.width - dist / 4;
            setTimeout(function () {
                _this.go();
            }, 16);
        }
    };
    MnLoaderBarComponent.prototype.go = function (num) {
        num = num > 100 ? 0 : num;
        if (num >= 0) {
            this.here = num;
            if (!this.on) {
                this.on = 1;
                this.move();
            }
        }
        else if (this.on) {
            this.move();
        }
    };
    return MnLoaderBarComponent;
}());
MnLoaderBarComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'mn-loader-bar',
                styles: [':host {  display: block;  width: 100%;  z-index: 9;  line-height: 0;  top: 0;  left: 0;  font-size: 0;}:host > .bar {  transition: height .3s;  background: #108ee9;}'],
                template: "\n        <div [style.width.%]=\"width\"\n             [style.height.px]=\"height\"\n             [ngStyle]=\"loaderStyle\"\n             class=\"bar\">\n        </div>\n    "
            },] },
];
/** @nocollapse */
MnLoaderBarComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer2, },
    { type: mn_loader_bar_services_1.MnLoaderBarServices, },
]; };
MnLoaderBarComponent.propDecorators = {
    'position': [{ type: core_1.Input },],
    'loader': [{ type: core_1.Input },],
    '_position': [{ type: core_1.HostBinding, args: ['style.position',] },],
    'target': [{ type: core_1.Input },],
    'progress': [{ type: core_1.Input },],
    'where': [{ type: core_1.Input },],
    'loaderStyle': [{ type: core_1.Input },],
    'zIndex': [{ type: core_1.Input, args: ['mnZIndex',] },],
    'done': [{ type: core_1.Output },],
};
exports.MnLoaderBarComponent = MnLoaderBarComponent;
//# sourceMappingURL=mn-loader-bar.component.js.map