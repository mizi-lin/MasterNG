import {Injectable} from '@angular/core';
import {saveAs} from 'file-saver/FileSaver.js';
import  mu from 'mzmu';

/**
 * 主要依赖file-saver.js 实现文件下载
 * @supported ES6
 */
@Injectable()
export class MnFileSaverServices {

    constructor() {
    }

    /**
     * fileSaver
     * 使用ES6的特性，文本在浏览器端生成文件
     * @param {string[]} contents
     * @param {string} down_name
     * @param {string} type
     * @param options
     * @author FileSaver.js
     */
    fileSaver(contents: string[], down_name: string, type: string = 'text/plain;charset=utf-8', options: any = {}): void {
        const file = new File(contents, down_name, mu.extend({type}, options));
        (<any>saveAs)(file);
    }

    /**
     * blobSaver
     * 二进制文件流下载
     * @param {Blob[]} contents
     * @param {string} down_name
     * @param {string} type
     * @param options
     * @author FileSaver.js
     */
    blobSaver(contents: Blob[], down_name: string, type: string = 'text/plain', options: any = {}): void {
        // type = application/vnd.ms-excel'
        const blob = new Blob(contents, mu.extend({type}, options));
        (<any>saveAs)(blob, down_name);
    }

    csvData(data: any[]) {
        const content = mu.map(data, (item) => mu.isArray(item) ? item.join(',') : item);
        return content.join('\n');
    }
}

