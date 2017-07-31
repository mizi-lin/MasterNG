import {
    Component,
    Directive,
    NgModule,
    Input,
    ViewContainerRef,
    Compiler,
    ComponentFactory,
    ModuleWithComponentFactories,
    ComponentRef,
    ReflectiveInjector,
    OnInit, ElementRef, Renderer2, ComponentFactoryResolver, OnChanges, SimpleChanges, OnDestroy
} from '@angular/core';

import * as mu from 'mzmu';
import {DynamicService} from './dynamic-component.service';
declare var mu: any;


/**
 * dynamic-component
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
@Directive({
    selector: 'dynamic-component',
})
export class DynamicComponentDirective implements OnChanges, OnDestroy {
    @Input() context: any;
    @Input() name: string;
    @Input() component: any;

    dynamicComponent: any;
    componentRef: ComponentRef<{}>;
    instance: any;


    constructor(
        private _vcRef: ViewContainerRef,
        private _cfr: ComponentFactoryResolver,
        private _serv: DynamicService
    ) {

    }

    create(component: any, context: any): void {
        this.ngOnDestroy();

        if(!component){
            component = UnknownDynamicComponent;
        }

        let factory = this._cfr.resolveComponentFactory(component);
        this.componentRef = this._vcRef.createComponent(factory);
        this.instance = <DynamicComponent> this.componentRef.instance;
        this.instance.context = context;
    }

    ngOnChanges(changes: SimpleChanges) {

        mu.exist(changes['name'], () => {
            this.dynamicComponent = this._serv.getComponent(this.name);
            this.create(this.dynamicComponent, this.context);
        });

        mu.exist(changes['component'], () => {
            this.dynamicComponent = this.component;
            this.create(this.dynamicComponent, this.context);
        });

        mu.exist(changes['context'], () => {
            if(this.dynamicComponent && this.instance){
                this.instance.context = this.context;
            }
        });
    }

    ngOnDestroy(): void {
        if (this.componentRef) {
            this.componentRef.destroy();
            this.componentRef = null;
        }
    }
}

export abstract class DynamicComponent {
    context: any;
}



@Component({
    selector: 'unknown-component',
    template: `<div>Unknown component</div>`
})
export class UnknownDynamicComponent extends DynamicComponent {}


