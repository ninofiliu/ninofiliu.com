#!/bin/sh
pnpm build
ntl deploy -d dist --prod
git tag "deploy_$(date +"%Y-%m-%d_%H-%M-%S")"
git push --follow-tags
