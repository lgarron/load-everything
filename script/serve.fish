#!/usr/bin/env fish

set BUNDLER $argv[1]
set COPY_ARG $argv[2]

set DIST_DIR "dist/test-"$BUNDLER

if test "$COPY_ARG" = "copy-html"
  echo "copying!"
  mkdir -p $DIST_DIR/verbose/
  cp test/index.html $DIST_DIR/
  cp test/verbose/index.html $DIST_DIR/verbose/
end

open "http://localhost:8000/test-"$BUNDLER/
npx http-server --port 8000 dist
