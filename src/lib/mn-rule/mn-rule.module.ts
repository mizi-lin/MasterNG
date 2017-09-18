import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MnRuleServices} from './mn-rule.services';
import {MnRuleDirective} from './mn-rule.directive';


@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        MnRuleDirective
    ],
    exports: [
        MnRuleDirective
    ],
    providers: [
        MnRuleServices
    ]
})
export class MnRuleModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MnRuleModule
        };
    }
}
