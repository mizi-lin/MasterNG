#!/usr/bin/env bash

_commit=`node -pe 'JSON.parse(process.env.npm_config_argv).original[3] || "fixed or changes"'`

git add .

git commit -am "$_commit"

if [ $? -eq 1 ]; then
    echo 'committed && exit'
fi

git pull

git push