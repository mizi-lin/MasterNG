import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MnI18nPipe} from './mn-i18n.pipe';
import {MnI18nDirective} from './mn-i18n.directive';
import {MnI18nServices} from './mn-i18n.services';
import {HttpModule} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@NgModule({
    imports: [
        CommonModule,
        HttpModule
    ],
    declarations: [
        MnI18nPipe,
        MnI18nDirective
    ],
    exports: [
        MnI18nPipe,
        MnI18nDirective
    ],
    providers: [
        MnI18nServices
    ]
})
export class MnI18nModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MnI18nModule
        };
    }
}
