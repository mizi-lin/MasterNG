import '../assets/jquery.file-download.js';
import { Http } from '@angular/http';
import { MnFileSaverServices } from '../mn-common/services/mn-file-saver.services';
export declare class MnFileDownloadDirective {
    private _http;
    private _fileSaverServ;
    req: any;
    download: any;
    click($event: any): void;
    constructor(_http: Http, _fileSaverServ: MnFileSaverServices);
}
