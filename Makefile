.PHONY: default
default: test-browser

DEPLOY_SOURCE_PATH = ./
DEPLOY_SITE_PATH   = loadeverything.net/
DEPLOY_SFTP_PATH   = "lgarron@towns.dreamhost.com:~/${DEPLOY_SITE_PATH}"

.PHONY: deploy
deploy:
	bun x @cubing/deploy

node_modules:
	npm install

.PHONY: test-browser
test-browser: node_modules
	npx http-server --port 8000 test

.PHONY: test-node
test-node: node_modules
	node --experimental-import-meta-resolve ./test/entry.js

.PHONY: test-deno
test-deno: node_modules
	deno run --allow-read ./test/entry.js

.PHONY: test-bun
test-bun: node_modules
	bun run ./test/entry.js

.PHONY: test-esbuild
test-esbuild: node_modules
	npx esbuild --bundle --format=esm --target=es2020 --external:node:* --outdir=dist/test-esbuild test/entry.js test/entry-verbose.js
	-deno run --allow-read ./dist/test-esbuild/entry.js
	./script/serve.bash esbuild copy-html

.PHONY: test-vite
test-vite: node_modules
	npx vite build --config vite.config.ts
	./script/serve.bash vite

.PHONY: test-parcel
test-parcel: node_modules
	# Note: Parcel claims to write `dist/test-parcel/verbose/index.html` but actually doesn't. 🤷
	npx parcel build --public-url . --dist-dir "dist/test-parcel" test/index.html test/verbose/index.html
	./script/serve.bash parcel

.PHONY: test-rollup
test-rollup: node_modules
	npx rollup test/entry.js --format esm -d dist/test-rollup
	./script/serve.bash rollup copy-html

.PHONY: test-webpack
test-webpack: node_modules
	npx webpack
	./script/serve.bash webpack copy-html

.PHONY: test-swcpack
test-swcpack: node_modules
	npx spack --config ./script/swcpack/spack.config.js
	./script/serve.bash swcpack copy-html

.PHONY: test-bun-build
test-bun-build: node_modules
	bun build --format esm --outdir=dist/test-bun-build test/entry.js test/entry-verbose.js
	./script/serve.bash bun-build copy-html

.PHONY: clean
clean:
	rm -rf ./parce-cache ./dist
