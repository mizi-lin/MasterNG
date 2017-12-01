#!/usr/bin/env bash

echo $npm_config_argv

_commit=`node -pe 'JSON.parse(process.env.npm_config_argv).original[3]'`

echo $_commit

git add .

git commit -am '$_commit'