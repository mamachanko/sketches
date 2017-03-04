#!/usr/bin/env bash -xe

cd "$(dirname $0)"

./build.sh

cf push -f manifest.yml
