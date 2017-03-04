#!/usr/bin/env bash -xe

cd "$(dirname $0)"

git pull --rebase

./build.sh

git push
