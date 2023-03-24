DEPLOY_SOURCE_PATH = ./
DEPLOY_SITE_PATH   = garron.net/temp/load-everything/
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
	open http://localhost:8000/; caddy file-server --listen :8000 --browse --root test

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
	npx esbuild --bundle --format=esm --target=es2020 --outdir=dist/test-esbuild test/entry.js
	deno run --allow-read ./dist/test-esbuild/entry.js

.PHONY: test-vite
test-vite:
	npx vite build --config vite.config.ts
	open http://localhost:8000/test-vite/; caddy file-server --listen :8000 --browse --root dist
	# npx vite test

.PHONY: test-parcel
test-parcel:
	npx parcel build --public-url . --dist-dir "dist/test-parcel" test/index.html
	open http://localhost:8000/test-parcel/; caddy file-server --listen :8000 --browse --root dist

.PHONY: test-rollup
test-rollup:
	npx rollup test/entry.js --format esm -d dist/test-rollup
	cp test/index.html dist/test-rollup/
	open http://localhost:8000/test-rollup/; caddy file-server --listen :8000 --browse --root dist

.PHONY: test-webpack
test-webpack:
	npx webpack
	cp test/index.html dist/test-webpack/
	open http://localhost:8000/test-webpack/; caddy file-server --listen :8000 --browse --root dist

.PHONY: test-swcpack
test-swcpack:
	npx spack --config ./script/swcpack/spack.config.js
	cp test/index.html dist/test-swcpack/
	open http://localhost:8000/test-swcpack/; caddy file-server --listen :8000 --browse --root dist

.PHONY: clean
clean:
	rm -rf ./parce-cache ./dist
