import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Miguel Bonifaz - Blog",
    short_name: "mbonifaz",
    description:
      "Ingeniero de software. Escribo sobre desarrollo frontend, diseño minimalista e inteligencia artificial.",
    start_url: "/",
    display: "standalone",
    background_color: "#111111",
    theme_color: "#d97706",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
