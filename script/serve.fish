#!/usr/bin/env fish

set BUNDLER $argv[1]

set DIST_DIR = "dist/test-"$BUNDLER

if test $argv[2] = "copy-html"
	cp test/index.html $DIST_DIR/
	mkdir -p $DIST_DIR/verbose/
	cp test/verbose/index.html $DIST_DIR/verbose/
end

open "http://localhost:8000/test-"$BUNDLER/
caddy file-server --listen :8000 --browse --root dist
