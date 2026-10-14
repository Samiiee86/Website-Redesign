/* Painterly landscape plates borrowed from entire.io, used behind the
   highlighted bento tiles. */
const E = (file: string) => `https://entire.io/_w/${file}`;

export const scenery = {
  ridge: E("hero-top-D9o4evRP.avif"),
  lake: E("hero-mid-BewB-DV-.avif"),
  planet: E("hero-bot-B37PNb0H.avif"),
  clouds: E("feature-01-RKAJKoBI.png"),
  sky: E("feature-02-Cpwybz0m.png"),
  dusk: E("feature-03-B6uRmYW3.png"),
  comet: E("feature-04-DHOlaEtM.png"),
  /* local plates uploaded by Sameer */
  shore: "/img/shore.webp",
  meadow: "/img/meadow.webp",
  alplake: "/img/alplake.webp",
  hills: "/img/hills.webp",
  treetop: "/img/treetop.webp",
  wetland: "/img/wetland.webp",
  dunes: "/img/dunes.webp",
  valley: "/img/valley.webp",
  mist: "/img/mist.webp",
};
