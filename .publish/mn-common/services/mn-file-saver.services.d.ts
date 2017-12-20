/**
 * 主要依赖file-saver.js 实现文件下载
 * @supported ES6
 */
export declare class MnFileSaverServices {
    constructor();
    /**
     * fileSaver
     * 使用ES6的特性，文本在浏览器端生成文件
     * @param {string[]} contents
     * @param {string} down_name
     * @param {string} type
     * @param options
     * @author FileSaver.js
     */
    fileSaver(contents: string[], down_name: string, type?: string, options?: any): void;
    /**
     * blobSaver
     * 二进制文件流下载
     * @param {Blob[]} contents
     * @param {string} down_name
     * @param {string} type
     * @param options
     * @author FileSaver.js
     */
    blobSaver(contents: Blob[], down_name: string, type?: string, options?: any): void;
    csvData(data: any[]): any;
}
