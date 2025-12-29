import { MetadataRoute } from "next";

const URL = "https://bluehatch.in"; // Replace with your actual domain

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/about",
    "/contact",
    "/fish-seeds",
    "/marketing-suite",
    "/marketplace",
    "/resources",
    "/tools-and-feeds",
  ];

  return routes.map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));
}
