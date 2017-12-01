#!/usr/bin/env bash

echo $npm_package_repository_type

git add .

git commit -am 'pre deploy'

git pull

git push