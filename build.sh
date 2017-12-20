#!/usr/bin/env bash

readonly currentDir=$(cd $(dirname $0); pwd)
cd ${currentDir}

node ./build.js

echo 'oooooOoOooO create publish'
mkdir .publish

echo 'ooooooOoOoO use ngc compiler'
$(npm bin)/ngc -p ./build.json

echo 'oooooooOooO copy store && package.json'
cp -R ./src/lib/assets/ ./.publish/assets/
cp -R package.json README.md ./.publish

echo 'ooooooooOoO clean temp'
rm -rf ./__pre_publish

