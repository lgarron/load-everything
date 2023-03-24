DEPLOY_SOURCE_PATH = ./
DEPLOY_SITE_PATH   = garron.net/temp/load-everything/
DEPLOY_SFTP_PATH   = "lgarron@towns.dreamhost.com:~/${DEPLOY_SITE_PATH}"

.PHONY: deploy
deploy:
	rsync -avz \
		--exclude .DS_Store \
		--exclude .git \
		${DEPLOY_SOURCE_PATH} \
		${DEPLOY_SFTP_PATH}
	echo "\nDone deploying. Go to https://${DEPLOY_SITE_PATH}\n"

.PHONY: test-browser
test-browser:
	open http://localhost:8000; caddy file-server --listen :8000 --browse --root test

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
	npx vite test

.PHONY: test-parcel
test-parcel:
	npx parcel test/index.html

