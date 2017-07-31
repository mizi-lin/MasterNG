import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

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
    ],
    exports: [
    ],
    providers: [
    ]
})
export class ReqModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ReqModule
        };
    }
}