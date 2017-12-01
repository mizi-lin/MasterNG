#!/usr/bin/env bash

echo $npm_config_argv

ss=`node -pe 'JSON.parse(process.env.npm_config_argv).original'`

commit=`node -pe 'JSON.parse(process.env.npm_config_argv).original[3]'`

version=`node -pe 'JSON.parse(process.env.npm_config_argv).original[4]'`

echo $ss $commit $version

git add .


git commit -am "$commit"

if [ $? eq 1 ]; then
    echo 'error'
