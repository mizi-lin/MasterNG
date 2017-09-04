import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MnRowComponent} from './mn-row.component';
import {MnColComponent} from './mn-col.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        MnRowComponent,
        MnColComponent
    ],
    exports: [
        MnRowComponent,
        MnColComponent
    ],
    providers: [
    ]
})
export class MnLayoutModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MnLayoutModule
        };
    }
}
