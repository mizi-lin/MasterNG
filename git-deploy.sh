#!/usr/bin/env bash

echo $npm_config_argv

_commit=`node -pe 'JSON.parse(process.env.npm_config_argv).original[3] || "fixed changes"'`

git add .

git commit -am "$_commit"

if [ $? -eq 1 ]; then
    echo 'has been commit && exit'
fi




