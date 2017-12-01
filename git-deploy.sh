#!/usr/bin/env bash

echo $npm_config_argv

ss=$npm_package_version

_commit=`node -pe 'JSON.parse(process.env.npm_config_argv).original[3] || "deploy new publish"'`

_version=`node -pe 'JSON.parse(process.env.npm_config_argv).original[4] || 0'`

echo $ss $_commit $_version

git add .

git commit -am "$_commit"

if [ $? -eq 1 ]; then
    echo 'has been commit && exit'
fi

npm version set masterng:'0.9.2'

echo $npm_package_version