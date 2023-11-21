# ninofiliu.com

Personal website

Astro + Netlify

Local dev

```sh
# once
pnpm install
# on media update
source ./build-media-files.sh
tsx ./build-media-index.ts
# always
pnpm run dev
```

Deploy

```sh
# once
pnpm add -g netlify-cli
ntl login
ntl link
# always
pnpm run build
ntl deploy -d dist
```

TODO

- [ ] SEO
- [ ] article UI
- [ ] articles: first contact
- [ ] articles: but the flesh is weak
- [ ] articles: room xyft
- [ ] articles: as if my phone cares about museums
- [ ] articles: sacrifice
- [ ] articles: body heat
