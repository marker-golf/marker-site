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
    const catPriority = { "Getting Started": 0, "Running Events": 1 };
    return collectionApi
      .getFilteredByGlob("src/tutorials/*.md")
      .filter((item) => item.data.cardDescription)
      .sort((a, b) => {
        const catDiff =
          (catPriority[a.data.category] ?? 99) -
          (catPriority[b.data.category] ?? 99);
        if (catDiff !== 0) return catDiff;
        return (a.data.order ?? 0) - (b.data.order ?? 0);
      });
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
