#!/usr/bin/env sh

corepack enable
corepack prepare pnpm@latest --activate
pnpm i --frozen-lockfile
pnpm build
mv -v _headers dist/
mv -v _redirects dist/

exit
