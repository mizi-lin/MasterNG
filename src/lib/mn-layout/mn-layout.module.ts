import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MnRowComponent} from './mn-row.component';
import {MnColComponent} from './mn-col.component';
import {MnGutterComponent} from './mn-gutter.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MnRowComponent,
        MnColComponent,
        MnGutterComponent
    ],
    exports: [
        MnRowComponent,
        MnColComponent,
        MnGutterComponent
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
