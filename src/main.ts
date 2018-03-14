import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
    enableProdMode();
}

window.onerror = (message) => {
    console.debug('ooooOooOooOooo', message);
};

try {
    platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
} catch (e) {
    console.debug(':::::::::::', e);
}

