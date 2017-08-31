import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicTemplateDirective, ExtraModules} from './dynamic-template.directive';
import {DynamicService} from './dynamic-component.service';
import {DynamicComponentComponent, UnknownDynamicComponent} from './dynamic-component.component';

/**
 * DynamicModule
 * 该模块包含
 * 1. DynamicTemplateDirective 动态载入template
 * 2. DynamicComponentComponent 动态载入Component
 * 3 todo 动态载入Router
 */
@NgModule({
    imports: [
        CommonModule
    ],

    declarations: [
        DynamicTemplateDirective,
        UnknownDynamicComponent,
        DynamicComponentComponent
    ],

    exports: [
        DynamicTemplateDirective,
        // UnknownDynamicComponent,
        DynamicComponentComponent
    ],

    entryComponents: [
        UnknownDynamicComponent
    ],

    providers: [
        DynamicService
    ]
})
export class DynamicModule {
    static forRoot(modules: any[] = []): ModuleWithProviders {
        return {
            ngModule: DynamicModule,
            providers: [
                {
                    provide: ExtraModules,
                    useValue: {items: modules}
                }
            ]
        };
    }
}
