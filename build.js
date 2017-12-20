const fs = require('fs');
const path = require('path');
const ncp = require('ncp');
const rimraf = require('rimraf');
const ng2Inline = require('./build-inliner');

const inline = (dir) => {
    let files = fs.readdirSync(dir);

    files.forEach((file) => {
        const src = path.join(dir, file);

        if(fs.statSync(src)
                .isDirectory()) {
            inline(src);
        }
        else if(src.endsWith('.component.ts')) {
            ng2Inline(fs.readFileSync(src, 'utf-8'), {
                base: dir
            }, dir)
                .then((file) => {
                    fs.writeFileSync(src, file);
                });
        }
    });
};

console.log('oOoooOOoooO 删除可能存在的temp');
rimraf.sync('__pre_publish', fs);

console.log('ooOoooOOooO 删除可能存在的publish');
rimraf.sync('.publish', fs);

console.log('oooOooOOooO 复制lib为__pre_publish, 作为编译文件的主体');

ncp('src/lib', '__pre_publish', (err) => {
    if(err) {
        return console.error(err);
    }
    console.log('ooooOoOOooO 编译sass文件以及html, 替换Component中的urls');
    inline(path.resolve('./__pre_publish/'));
});