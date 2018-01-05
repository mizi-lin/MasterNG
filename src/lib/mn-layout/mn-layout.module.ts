import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MnRowComponent} from './mn-row.component';
import {MnColComponent} from './mn-col.component';
import {MnGutterComponent} from './mn-gutter.component';
import {MnPrependComponent} from './mn-prepend.component';
import {MnAppendComponent} from './mn-append.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MnRowComponent,
        MnColComponent,
        MnGutterComponent,
        MnPrependComponent,
        MnAppendComponent
    ],
    exports: [
        MnRowComponent,
        MnColComponent,
        MnGutterComponent,
        MnPrependComponent,
        MnAppendComponent
    ],
    providers: [
        MnRowComponent
    ]
})
export class MnLayoutModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MnLayoutModule
        };
    }
}
