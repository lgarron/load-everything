#!/usr/bin/env bash

set -euo pipefail

BUNDLER=${1}
COPY_ARG=${2:-""}

DIST_DIR="dist/test-${BUNDLER}"

if [ "${COPY_ARG}" = "copy-html" ]
then
  echo "copying!"
  mkdir -p ${DIST_DIR}/verbose/
  cp test/index.html ${DIST_DIR}/
  cp test/verbose/index.html ${DIST_DIR}/verbose/
fi

open "http://localhost:8000/test-"${BUNDLER}/ || echo "open http://localhost:8000/test-${BUNDLER}"
npx http-server --port 8000 dist
