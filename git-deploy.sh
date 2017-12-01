#!/usr/bin/env bash

echo $process.env

git add .

git commit -am 'pre deploy'

git pull

git push