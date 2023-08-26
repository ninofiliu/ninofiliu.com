import fs from "node:fs";
import cp from "node:child_process";
import type { Media } from "./src/types";

const media = fs
  .readdirSync("./media")
  .sort((a, b) => +a.split(".")[0]! - +b.split(".")[0]!)
  .map((base): Media => {
    if (/\.(png|jpg|webp)/.test(base)) {
      const [desktopWidth, desktopHeight] = cp
        .execSync(`identify -format "%w %h" public/desktop/${base}.webp`, {
          encoding: "utf8",
        })
        .split(" ");
      const [mobileWidth, mobileHeight] = cp
        .execSync(`identify -format "%w %h" public/mobile/${base}.webp`, {
          encoding: "utf8",
        })
        .split(" ");
      return {
        kind: "img",
        desktop: {
          src: `/desktop/${base}.webp`,
          width: +desktopWidth!,
          height: +desktopHeight!,
        },
        mobile: {
          src: `/mobile/${base}.webp`,
          width: +mobileWidth!,
          height: +mobileHeight!,
        },
      };
    }
    if (/\.(mp4|webm|mov)/.test(base)) {
      return {
        kind: "video",
        desktopSrc: `/desktop/${base}.mp4`,
        mobileSrc: `/mobile/${base}.mp4`,
      };
    }
    throw new Error(`unknown extension for ${base}`);
  });

const outPath = "./src/media.ts";
fs.writeFileSync(
  outPath,
  `// autogen from ./build-media-index.ts
import type { Media } from "./types";
export const media: Media[] = ${JSON.stringify(media, null, 2)}
`,
);
cp.execSync(`pnpm exec prettier --write ${outPath}`);
