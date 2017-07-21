import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RowComponent} from './row.component';
import {ColComponent} from './col.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        RowComponent,
        ColComponent
    ],
    exports: [
        RowComponent,
        ColComponent
    ],
    providers: [
    ]
})
export class FlexLayoutModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: FlexLayoutModule
            // providers: [
            //     TreeviewConfig,
            //     {
            //         provide: TreeviewI18n,
            //         useClass: TreeviewI18nDefault
            //     },
            //     {
            //         provide: TreeviewEventParser,
            //         useClass: DefaultTreeviewEventParser
            //     }
            // ]
        };
    }
}