import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HtmlOutlet} from './dynamic-html.directive';
import {DynamicComponentDirective, UnknownDynamicComponent} from './dynamic-component.directive';
import {DynamicService} from './dynamic-component.service';

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
        HtmlOutlet,
        UnknownDynamicComponent,
        DynamicComponentDirective
    ],

    exports: [
        HtmlOutlet,
        // UnknownDynamicComponent,
        DynamicComponentDirective
    ],

    entryComponents: [
        UnknownDynamicComponent
    ],

    providers: [
        DynamicService
    ]
})
export class DynamicModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: DynamicModule
        };
    }
}