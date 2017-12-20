import { ViewContainerRef, Compiler, ComponentFactory, ComponentRef, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
export declare class ExtraModules {
    items: any[];
}
export declare function createComponentFactory(compiler: Compiler, template: string, extraModules: any): Promise<ComponentFactory<any>>;
export declare class MnDynamicTemplateDirective implements OnDestroy, OnChanges {
    private _vcRef;
    private _compiler;
    private _extraModules;
    template: string;
    context: any;
    instance: any;
    _cmpRef: ComponentRef<any>;
    constructor(_vcRef: ViewContainerRef, _compiler: Compiler, _extraModules: ExtraModules);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
}
