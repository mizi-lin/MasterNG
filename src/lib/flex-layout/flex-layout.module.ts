import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RowComponent} from './row.component';
import {ColComponent} from './col.component';
import {MnFillComponent} from './mn-fill.compent';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        RowComponent,
        ColComponent,
        MnFillComponent
    ],
    exports: [
        RowComponent,
        ColComponent,
        MnFillComponent
    ],
    providers: [
    ]
})
export class FlexLayoutModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: FlexLayoutModule
        };
    }
}