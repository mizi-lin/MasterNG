import {ModuleWithProviders, NgModule} from '@angular/core';
import {MnLayoutModule} from './mn-layout/mn-layout.module';


@NgModule({
    imports: [
        MnLayoutModule

    ],
    exports: [
        MnLayoutModule
    ]
})
export class MasterNgModule {
    static forRoot(modules: any[] = []): ModuleWithProviders {
        return {
            ngModule: MasterNgModule,
            providers: [
            ]
        };
    }
}
