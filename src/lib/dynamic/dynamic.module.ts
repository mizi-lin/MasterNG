import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicTemplateDirective, ExtraModules} from './dynamic-template.directive';
import {DynamicService} from './dynamic-component.service';
import {DynamicComponentComponent, UnknownDynamicComponent} from './dynamic-component.component';

/**
 * ReqModule
 * 使ajax请求与返回分开
 * 使ajax各阶段事务专注于自己
 * NO_DATA 与 Http Processor 各自呈现
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