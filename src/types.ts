type ImgSrc = {
  src: string;
  width: number;
  height: number;
};

export type Media =
  | {
      kind: "img";
      desktop: ImgSrc;
      mobile: ImgSrc;
    }
  | {
      kind: "video";
      desktopSrc: string;
      mobileSrc: string;
    };
