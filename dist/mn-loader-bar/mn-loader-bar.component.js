"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mu = require("mzmu");
var MnLoaderBarComponent = (function () {
    function MnLoaderBarComponent(_ref, _render) {
        var _this = this;
        this._ref = _ref;
        this._render = _render;
        this._position = this.position || 'relative';
        this.done = new core_1.EventEmitter();
        this._width = 0;
        this._height = 3;
        this.here = 0;
        this.width = this._width;
        this.height = this._height;
        this.on = 0;
        setTimeout(function () {
            var parent = _ref.nativeElement.parentElement;
            if (!mu.or(parent.style.position, 'absolute', 'fixed')) {
                _render.setStyle(parent, 'position', 'relative');
                _this._position = _this.position === 'fixed' ? 'fixed' : 'absolute';
            }
        }, 1);
    }
    MnLoaderBarComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        mu.exist(changes['progress'], function () {
            mu.run(_this.width >= 100, function () {
                _this.width = _this._width;
                _this.height = _this._height;
            });
            _this.go(_this.progress);
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
                styles: [':host {  display: block;  width: 100%;  z-index: 9999;  line-height: 0;  top: 0;  left: 0;  font-size: 0;}:host > .bar {  transition: height .3s;  background: #108ee9;}'],
                template: "\n        <div [style.width.%]=\"width\"\n             [style.height.px]=\"height\"\n             class=\"bar\">\n        </div>\n    "
            },] },
];
/** @nocollapse */
MnLoaderBarComponent.ctorParameters = function () { return [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer2, },
]; };
MnLoaderBarComponent.propDecorators = {
    'position': [{ type: core_1.Input },],
    '_position': [{ type: core_1.HostBinding, args: ['style.position',] },],
    'target': [{ type: core_1.Input },],
    'progress': [{ type: core_1.Input },],
    'where': [{ type: core_1.Input },],
    'done': [{ type: core_1.Output },],
};
exports.MnLoaderBarComponent = MnLoaderBarComponent;
//# sourceMappingURL=mn-loader-bar.component.js.map