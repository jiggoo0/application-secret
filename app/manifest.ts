/** @format */

import type { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#0f172a",
    lang: siteConfig.locale,
    icons: [
      {
        src: siteConfig.assets.favicon,
        sizes: "16x16",
        type: "image/x-icon",
      },
      {
        src: siteConfig.assets.appleTouch,
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: siteConfig.assets.ogImage,
        sizes: "1200x630",
        type: "image/webp",
        purpose: "any",
      },
    ],
  }
}
