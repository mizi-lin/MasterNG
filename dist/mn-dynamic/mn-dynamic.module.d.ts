import { ModuleWithProviders } from '@angular/core';
/**
 * MnDynamicModule
 * 该模块包含
 * 1. MnDynamicTemplateDirective 动态载入template
 * 2. MnDynamicComponentComponent 动态载入Component
 * 3 todo 动态载入Router
 */
export declare class MnDynamicModule {
    static forRoot(modules?: any[]): ModuleWithProviders;
}
