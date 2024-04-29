pnpm build
ntl deploy -d dist --prod
git tag "deploy_$(Get-Date -Format "yyyy-MM-dd_HH-mm-ss")"
git push --follow-tags