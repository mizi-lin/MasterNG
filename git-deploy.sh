#!/usr/bin/env bash

echo $process

git add .

git commit -am 'pre deploy'

git pull

git push