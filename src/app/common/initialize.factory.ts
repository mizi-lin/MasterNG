import {InitializeService} from './initialize.service';
import {MnI18nServices} from '../../lib/mn-i18n';

export function InitializeFactory(
    initServ: InitializeService,
    i18nServ: MnI18nServices
) {
    return () => {
        initServ.initApp();
        i18nServ.setConfig({
            lang: 'en',
            prefix: '/assets/i18n'
        });
    };
}
