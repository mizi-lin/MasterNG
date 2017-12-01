#!/usr/bin/env bash

echo $npm_config_argv

commit=`node -pe 'JSON.parse(process.env.npm_config_argv).original[3]'`

echo $commit

git add .

git commit -am '$commit'