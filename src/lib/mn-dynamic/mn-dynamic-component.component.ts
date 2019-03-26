import {
    Component,
    Input, Output,
    ViewContainerRef,
    ComponentRef,
    ViewChild,
    ComponentFactoryResolver, OnChanges, SimpleChanges, OnDestroy, EventEmitter
} from '@angular/core';

import {MnDynamicServices} from './mn-dynamic-component.service';

import * as mu from 'mzmu';

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
@Component({
    selector: 'mn-dynamic-component',
    template: `
        <ng-template #container></ng-template>
    `
})
export class MnDynamicComponentComponent implements OnChanges, OnDestroy {

    @ViewChild('container', {read: ViewContainerRef}) _vcRef;

    @Input() inputs: any;
    @Input() outputs: any;
    @Input() component: any;

    @Output() outevt: any = new EventEmitter<any>();

    dynamicComponent: any;
    componentRef: ComponentRef<{}>;
    instance: any;

    constructor(// private _vcRef: ViewContainerRef,
        private _cfr: ComponentFactoryResolver,
        private _serv: MnDynamicServices) {

    }

    create(component: any, inputs: any, outputs: any): void {
        this.ngOnDestroy();

        if (!component) {
            component = MnUnknownDynamicComponent;
        }

        const factory = this._cfr.resolveComponentFactory(component);
        this.componentRef = this._vcRef.createComponent(factory);
        this.instance = <DynamicComponent> this.componentRef.instance;
        this.setInputs(inputs);
        this.setOutputs(outputs);

    }

    /**
     * 模拟传递
     * @param inputs
     */
    setInputs(inputs): void {
        mu.each(inputs, (v, k) => {
            this.instance[k] = v;
        });
    }

    /**
     * 模拟传递
     * @param outputs
     */
    setOutputs(outputs): void {
        mu.each(outputs, (fn) => {
            this.instance[fn] && this.instance[fn].subscribe(event => {
                this.outevt.emit({
                    fn,
                    event
                });

            });
        });
    }

    ngOnChanges(changes: SimpleChanges) {

        mu.exist(changes['component'], () => {

            if (typeof this.component === 'string') {
                this.dynamicComponent = this._serv.getComponent(this.component);
            } else {
                this.dynamicComponent = this.component;
            }

            this.create(this.dynamicComponent, this.inputs, this.outputs);
        });

        // console.debug(changes);

        /**
         * 模拟 ngOnChanges
         */
        mu.exist(changes['inputs'], () => {
            if (this.dynamicComponent && this.instance) {
                this.setInputs(this.inputs);
                this.instance.ngOnChanges && this.instance.ngOnChanges(mu.map(this.inputs, (v, k) => {
                    return {
                        currentValue: v
                    };
                }));
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

/**
 * Base Dynamic Component
 * 注值
 */
export abstract class DynamicComponent {
    context: any;
}

/**
 * unknown component
 */
@Component({
    selector: 'mn-unknown-component',
    template: `
        <div title="unknown-component">unknown-component</div>`
})
export class MnUnknownDynamicComponent extends DynamicComponent {
}


