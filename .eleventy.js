const { DateTime } = require("luxon"); // Import the DateTime object from the Luxon library for date manipulation.

module.exports = function (eleventyConfig) {
  // Copy the assets folder to the output directory (_site/assets)
  eleventyConfig.addPassthroughCopy("src/assets");

  // Watch the CSS files in the assets folder for changes to trigger a rebuild
  eleventyConfig.addWatchTarget("src/assets/css");

  // Create a collection named "posts" that combines static Markdown files and dynamic posts from Strapi
  eleventyConfig.addCollection("posts", function (collectionApi) {
    // Get all the static posts from the Markdown files in src/posts/*.md
    let staticPosts = collectionApi.getFilteredByGlob("src/posts/*.md");

    // Get the dynamic posts fetched from Strapi (via _data/posts.js)
    let dynamicPosts = require("_data/posts.js")();

    // Combine both arrays (static and dynamic posts)
    let allPosts = staticPosts.concat(dynamicPosts);

    // Sort the combined posts by date (from most recent to oldest)
    return allPosts.sort((a, b) => {
      // If a post has a 'date' property, use it for sorting
      return new Date(b.date || b.attributes.publishedAt) - new Date(a.date || a.attributes.publishedAt);
    });
  });

  // Add a custom filter named "date" for formatting dates using Luxon
  eleventyConfig.addFilter("date", (dateObj, format = "MMMM dd, yyyy") => {
    if (dateObj === "now") {
      dateObj = new Date();
    }
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(format);
  });

  // Return the configuration object for Eleventy
  return {
    dir: {
      input: "src", 
      includes: "includes", 
      layouts: "layouts", 
      output: "_site" 
    },
    templateFormats: ["njk", "md", "html"], 
    htmlTemplateEngine: "njk", 
    markdownTemplateEngine: "njk", 
  };
};
