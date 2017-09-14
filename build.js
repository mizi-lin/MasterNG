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

console.log('*******\n prebuild cleaning...');

rimraf.sync('prebuild', fs, (err) => {
    if(err) {
        return console.error(err);
    }

    console.log(':::::::\n done cleaning!');
});

console.log('*******\n cloning src 2 prebuild..');
ncp('src/lib', 'prebuild', (err) => {
    if(err) {
        return console.error(err);
    }

    console.log(':::::::\n done cloning src!');

    //
    console.log('*******\n inlining(replace style and template)...');
    inline(path.resolve('./prebuild/'));
    console.log(':::::::\n done inlining!');

    //
    console.log('*******\n ready for ngc!');
});