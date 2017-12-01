import { ComponentRef, ComponentFactoryResolver, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { MnDynamicServices } from './mn-dynamic-component.service';
/**
 * mn-dynamic-component
 * 动态加载Component
 *
 * 1. 动态加载的Component必须在ngModule中在enterComponent在声明
 *
 * @NgModule({
 *    entryComponents: [
 *       DynamicSample1Component
 *    ]
 * })
 *
 * 2. 需要动态加载的Component, 若需要预传值, 则需要继承 DynamicComponent
 * export class DynamicSample1Component extends DynamicComponents {
 *      ...
 * }
 *
 * 3. 预传值为 context: any
 *
 */
export declare class MnDynamicComponentComponent implements OnChanges, OnDestroy {
    private _cfr;
    private _serv;
    _vcRef: any;
    inputs: any;
    outputs: any;
    component: any;
    outevt: any;
    dynamicComponent: any;
    componentRef: ComponentRef<{}>;
    instance: any;
    constructor(_cfr: ComponentFactoryResolver, _serv: MnDynamicServices);
    create(component: any, inputs: any, outputs: any): void;
    /**
     * 模拟传递
     * @param inputs
     */
    setInputs(inputs: any): void;
    /**
     * 模拟传递
     * @param outputs
     */
    setOutputs(outputs: any): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
}
/**
 * Base Dynamic Component
 * 注值
 */
export declare abstract class DynamicComponent {
    context: any;
}
/**
 * unknown component
 */
export declare class MnUnknownDynamicComponent extends DynamicComponent {
}
