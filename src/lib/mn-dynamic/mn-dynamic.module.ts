import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MnDynamicTemplateDirective, ExtraModules} from './mn-dynamic-template.directive';
import {MnDynamicService} from './mn-dynamic-component.service';
import {MnDynamicComponentComponent, MnUnknownDynamicComponent} from './mn-dynamic-component.component';

/**
 * MnDynamicModule
 * 该模块包含
 * 1. MnDynamicTemplateDirective 动态载入template
 * 2. MnDynamicComponentComponent 动态载入Component
 * 3 todo 动态载入Router
 */
@NgModule({
    imports: [
        CommonModule
    ],

    declarations: [
        MnDynamicTemplateDirective,
        MnUnknownDynamicComponent,
        MnDynamicComponentComponent
    ],

    exports: [
        MnDynamicTemplateDirective,
        // MnUnknownDynamicComponent,
        MnDynamicComponentComponent
    ],

    entryComponents: [
        MnUnknownDynamicComponent
    ],

    providers: [
        MnDynamicService
    ]
})
export class MnDynamicModule {
    static forRoot(modules: any[] = []): ModuleWithProviders {
        return {
            ngModule: MnDynamicModule,
            providers: [
                {
                    provide: ExtraModules,
                    useValue: {items: modules}
                }
            ]
        };
    }
}
