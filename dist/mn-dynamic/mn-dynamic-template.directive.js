"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mu = require("mzmu");
/**
 * 每一个 Component 和 Directive 的实例都必须对应一个 Host（宿主），
 * 在 Web 平台上，也就是 DOM Element（或者说 DOM Node）。
 * 由于 Angular 的 View 层是比 DOM API 更高的抽象，所以其实并没有完全的一一对应。
 * 比如对于非 template 的 Host 而言，
 * ViewContainerRef 和 ElementRef 实际上都对应的宿主 Element，
 * 只是对应不同的 Role（职责），
 * ViewContainerRef 对应于 Element 的容器身份，
 * !!! 确切地说是 Element 所处的位置空间的容器身份（比如 append 操作的主体，但注意添加的内容会和宿主同级），
 * 而 ElementRef 对应 Element 的控件身份（比如 className、value 这些属性）。
 * 而对于宿主为 template 的情况，因为语义上的特殊性，ElementRef 往往没有意义，
 * 从而提供一个额外的身份——TemplateRef，通过接受动态的 Context 来实现复杂的实例化。
 * 而不论是 Component，还是 TemplateRef，实例化之后都会得到 ViewRef（先别纠结 HostView 和 EmbeddedView 的区别），
 * ViewRef 对应的当然也还是 DOM Element（也可能是一组 Element，针对 ng-container 的情况），
 * 当然这里的身份是相对容器而言的客体（例如 append 操作所接受的参数）。
 */
/**
 * TemplateRef
 * <ng-template #tpl></ng-template>
 * @ViewChild('tpl') tpl: TemplateRef<any>
 *
 * 用于表示内嵌的 template 模板元素，
 * 通过 TemplateRef 实例，我们可以方便创建内嵌视图(Embedded Views)，
 * 且可以轻松地访问到通过 ElementRef 封装后的 nativeElement。
 * 需要注意的是组件视图中的 template 模板元素，经过渲染后会被替换成 comment 元素。
 * -
 * 只能通过构造函数直接注入，并不经过注入器
 */
/**
 * ViewContainerRef
 * <ng-template #tpl></ng-template>
 * @ViewChild('tpl', { read: ViewContainerRef }) tpl: ViewContainerRef
 *
 * 用于表示一个视图容器，可添加一个或多个视图。
 * 通过 ViewContainerRef 实例，
 * 我们可以基于 TemplateRef 实例创建内嵌视图，
 * 并能指定内嵌视图的插入位置，也可以方便对视图容器中已有的视图进行管理。
 * 简而言之，ViewContainerRef 的主要作用是创建和管理内嵌视图或组件视图。
 * -
 * 只能通过构造函数直接注入，并不经过注入器
 * -
 * ViewContainerRef 提供了一些动态内容操作的 API，
 * 比如 createEmbeddedView 和 createComponent，
 * 能够通过 Component 或者 Template 来实例化得到 ViewRef，
 * 以及 insert、move、indexOf、remove、detach、clear、get 等方法来提供抽象的视图层操作（类似于 DOM 操作）。
 * 因为是抽象的，所以不论是在浏览器中，原生 App 还是服务器端都能运行（配合不同 Renderer）。
 * !!!至于后面加 Ref 的一般就是提供 API 供用户操作的类型
 */
/**
 * ViewRef
 * 用于表示 Angular View(视图)，视图是可视化的 UI 界面
 *
 * // @angular/core/src/linker/view_ref.d.ts
 * export declare abstract class ViewRef {
 *   destroyed: boolean;
 *   abstract onDestroy(callback: Function): any;
 * }
 */
/**
 * EmbeddedViewRef
 * EmbeddedViewRef 继承于 ViewRef，
 * 用于表示 <template> 模板元素中定义的 UI 元素。
 *
 * // @angular/core/src/linker/view_ref.d.ts
 * export declare abstract class EmbeddedViewRef<C> extends ViewRef {
 *   context: C;
 *   rootNodes: any[]; // 保存<template>模板中定义的元素
 *   abstract destroy(): void; // 用于销毁视图
 * }
 */
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var ExtraModules = (function () {
    function ExtraModules() {
    }
    return ExtraModules;
}());
exports.ExtraModules = ExtraModules;
function createComponentFactory(compiler, template, extraModules) {
    // const compMetadata = new Component({
    //     selector: 'dynamic-html',
    //     template: template
    // });
    // const cmpClass = class DynamicTemplateComponent {
    // };
    // const decoratedCmp = Component(compMetadata)(cmpClass);
    console.debug('::::::::::::', extraModules);
    var _DecoratedCmp = (function () {
        function _DecoratedCmp() {
        }
        return _DecoratedCmp;
    }());
    _DecoratedCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'decorated-cmp',
                    template: template
                },] },
    ];
    /** @nocollapse */
    _DecoratedCmp.ctorParameters = function () { return []; };
    var DynamicHtmlModule = (function () {
        function DynamicHtmlModule() {
        }
        return DynamicHtmlModule;
    }());
    DynamicHtmlModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        platform_browser_1.BrowserModule,
                        router_1.RouterModule
                    ].concat(extraModules.items),
                    entryComponents: [
                        _DecoratedCmp
                    ],
                    exports: [
                        _DecoratedCmp
                    ],
                    declarations: [_DecoratedCmp]
                },] },
    ];
    /** @nocollapse */
    DynamicHtmlModule.ctorParameters = function () { return []; };
    return compiler.compileModuleAndAllComponentsAsync(DynamicHtmlModule).then(function (moduleWithComponentFactory) {
        return moduleWithComponentFactory.componentFactories.find(function (x) { return x.componentType === _DecoratedCmp; });
    });
}
exports.createComponentFactory = createComponentFactory;
var MnDynamicTemplateDirective = (function () {
    function MnDynamicTemplateDirective(_vcRef, _compiler, _extraModules) {
        this._vcRef = _vcRef;
        this._compiler = _compiler;
        this._extraModules = _extraModules;
        console.debug('oooooOooOoooOOooOoooo', _extraModules);
    }
    MnDynamicTemplateDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        mu.exist(changes['template'], function () {
            var template = _this.template;
            if (!template)
                return;
            if (_this._cmpRef) {
                _this._cmpRef.destroy();
            }
            createComponentFactory(_this._compiler, template, _this._extraModules).then(function (factory) {
                var injector = core_1.ReflectiveInjector.fromResolvedProviders([], _this._vcRef.parentInjector);
                _this._cmpRef = _this._vcRef.createComponent(factory, 0, injector, []);
                _this.instance = _this._cmpRef.instance;
                mu.each(_this.context || [], function (v, k) {
                    _this.instance[k] = v;
                });
            });
        });
        mu.exist(changes['context'], function () {
            mu.run(_this.instance, function () {
                mu.each(_this.context, function (v, k) {
                    _this.instance[k] = v;
                });
            });
        });
    };
    MnDynamicTemplateDirective.prototype.ngOnDestroy = function () {
        if (this._cmpRef) {
            this._cmpRef.destroy();
        }
    };
    return MnDynamicTemplateDirective;
}());
MnDynamicTemplateDirective.decorators = [
    { type: core_1.Directive, args: [{ selector: 'dynamic-template' },] },
];
/** @nocollapse */
MnDynamicTemplateDirective.ctorParameters = function () { return [
    { type: core_1.ViewContainerRef, },
    { type: core_1.Compiler, },
    { type: ExtraModules, },
]; };
MnDynamicTemplateDirective.propDecorators = {
    'template': [{ type: core_1.Input },],
    'context': [{ type: core_1.Input },],
};
exports.MnDynamicTemplateDirective = MnDynamicTemplateDirective;
//# sourceMappingURL=mn-dynamic-template.directive.js.map