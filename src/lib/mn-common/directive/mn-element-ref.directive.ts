import {Directive, ElementRef, EventEmitter, Output} from '@angular/core';

/**
 *  模板引用变量 ( #var )
 *  Template reference variables
 *
 *  在ngx template中，使用 # 可以声明变量，（ref- 为前缀可以在DOM中与#功能一致 <div #abc></div> <div ref-abc></div>）
 *  若使用在dom中，可以引用该DOM所代表的 ng的组件，指令或component, 若DOM无ng功能，则获得DOM的ElementRef
 *
 *  但在使用#或ref-时，优先获得ng功能组件信息，而DOM的ElementRef不能获取
 *  而此组件的功能是获得该DOM的ElementRef
 *
 *  <my-comp mn-element #var2="element"></my-comp>
 *  <p>{{var2.nativeElement}}</p>
 *
 *  若查找子DOM, 使用 viewChild || viewContent 等构造函数
 */

@Directive({
    selector: '[mn-element], [mnElement]',
    exportAs: 'element'
})
export class MnElementRefDirective {
    public elementRef: ElementRef;
    constructor(_ref: ElementRef) {
        this.elementRef = _ref;
    }
}
