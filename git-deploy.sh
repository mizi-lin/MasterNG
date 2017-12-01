#!/usr/bin/env bash

echo $npm_config_argv

a=`node -pe 'JSON.parse(process.env.npm_config_argv).original[3]'`

echo $a

git add .

git commit -am '$a'