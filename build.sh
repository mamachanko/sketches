#!/usr/bin/env bash -xe

cd "$(dirname $0)"

yarn
yarn run build

echo 'pushstate: enabled' > dist/Staticfile
