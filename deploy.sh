#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:egorpariah/vue3-blog-app.git main:gh-pages

cd -