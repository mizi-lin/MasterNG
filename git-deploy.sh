#!/usr/bin/env bash

echo $process.env.npm_config_arg

git add .

git commit -am 'pre deploy'

git pull

git push