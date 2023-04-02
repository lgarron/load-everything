DEPLOY_SOURCE_PATH = ./
DEPLOY_SITE_PATH   = loadeverything.net/
DEPLOY_SFTP_PATH   = "lgarron@towns.dreamhost.com:~/${DEPLOY_SITE_PATH}"

.PHONY: deploy
deploy:
	rsync -avz \
		--exclude .DS_Store \
		--exclude .git \
		--exclude .parcel-cache \
		--exclude node_modules \
		${DEPLOY_SOURCE_PATH} \
		${DEPLOY_SFTP_PATH}
	echo "\nDone deploying. Go to https://${DEPLOY_SITE_PATH}\n"

.PHONY: test-browser
test-browser:
	npx http-server --port 8000 test

.PHONY: test-node
test-node:
	node --experimental-import-meta-resolve ./test/entry.js

.PHONY: test-deno
test-deno:
	deno run --allow-read ./test/entry.js

.PHONY: test-bun
test-bun:
	bun run ./test/entry.js

.PHONY: test-esbuild
test-esbuild:
	npx esbuild --bundle --format=esm --target=es2020 --outdir=dist/test-esbuild test/entry.js test/entry-verbose.js
	-deno run --allow-read ./dist/test-esbuild/entry.js
	./script/serve.bash esbuild copy-html

.PHONY: test-vite
test-vite:
	npx vite build --config vite.config.ts
	./script/serve.bash vite

.PHONY: test-parcel
test-parcel:
	# Note: Parcel claims to write `dist/test-parcel/verbose/index.html` but actually doesn't. 🤷
	npx parcel build --public-url . --dist-dir "dist/test-parcel" test/index.html test/verbose/index.html
	./script/serve.bash parcel

.PHONY: test-rollup
test-rollup:
	npx rollup test/entry.js --format esm -d dist/test-rollup
	./script/serve.bash rollup copy-html

.PHONY: test-webpack
test-webpack:
	npx webpack
	./script/serve.bash webpack copy-html

.PHONY: test-swcpack
test-swcpack:
	npx spack --config ./script/swcpack/spack.config.js
	./script/serve.bash swcpack copy-html

.PHONY: clean
clean:
	rm -rf ./parce-cache ./dist
