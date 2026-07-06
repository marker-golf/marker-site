export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });

  eleventyConfig.addCollection("games", function (collectionApi) {
    const catPriority = { featured: 0, classic: 1, team: 2 };
    return collectionApi
      .getFilteredByGlob("src/games/*.md")
      .filter((item) => item.data.category)
      .sort((a, b) => {
        const catDiff =
          (catPriority[a.data.category] ?? 99) -
          (catPriority[b.data.category] ?? 99);
        if (catDiff !== 0) return catDiff;
        return (a.data.order ?? 0) - (b.data.order ?? 0);
      });
  });
  eleventyConfig.addCollection("tutorials", function (collectionApi) {
    const pathPriority = { group: 0, event: 1, reference: 2 };
    return collectionApi
      .getFilteredByGlob("src/tutorials/*.md")
      .filter((item) => item.data.cardDescription)
      .sort((a, b) => {
        const pathDiff =
          (pathPriority[a.data.tutorialPath] ?? 99) -
          (pathPriority[b.data.tutorialPath] ?? 99);
        if (pathDiff !== 0) return pathDiff;
        return (a.data.tutorialOrder ?? 99) - (b.data.tutorialOrder ?? 99);
      });
  });

  // Returns tutorials for a specific path, sorted by tutorialOrder
  eleventyConfig.addFilter("tutorialsByPath", function (collection, path) {
    return (collection || [])
      .filter((t) => t.data && t.data.tutorialPath === path)
      .sort((a, b) => (a.data.tutorialOrder ?? 99) - (b.data.tutorialOrder ?? 99));
  });

  // Returns { prev, next, currentStep, totalSteps } for a tutorial within its path
  eleventyConfig.addFilter("prevNextInPath", function (collection, currentUrl, path) {
    const sorted = (collection || [])
      .filter((t) => t.data && t.data.tutorialPath === path)
      .sort((a, b) => (a.data.tutorialOrder ?? 99) - (b.data.tutorialOrder ?? 99));
    const idx = sorted.findIndex((t) => t.url === currentUrl);
    return {
      prev: idx > 0 ? sorted[idx - 1] : null,
      next: idx < sorted.length - 1 ? sorted[idx + 1] : null,
      currentStep: idx + 1,
      totalSteps: sorted.length,
    };
  });

  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    pathPrefix: process.env.PATHPREFIX ?? "/",
  };
}
