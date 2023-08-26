import { media } from "../media";

media.map((m) =>
  m.kind === "img"
    ? `
<img
loading="lazy"
src="${m.desktop.src}"
srcset="${m.desktop.src} ${m.desktop.width}w, ${m.mobile.src} ${m.mobile.width}w"
sizes="(max-width: 960px) ${m.mobile.width}px, ${m.desktop.width}px"
style="min-height: ${m.mobile.height};"
/>
`
    : `
<Video desktop="${m.desktopSrc}" mobile="${m.mobileSrc}" />
`,
);
