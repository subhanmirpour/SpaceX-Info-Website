const { DateTime } = require("luxon"); // Import the DateTime object from the Luxon library for date manipulation.

module.exports = function (eleventyConfig) {
  // Copy the assets folder to the output directory (_site/assets)
  eleventyConfig.addPassthroughCopy("src/assets");

  // Watch the CSS files in the assets folder for changes to trigger a rebuild
  eleventyConfig.addWatchTarget("src/assets/css");

  // Create a collection named "posts" that filters and sorts Markdown files by date
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => {
      // Sort the posts in descending order based on the date
      return new Date(b.date) - new Date(a.date);
    });
  });

  // Add a custom filter named "date" for formatting dates using Luxon
  eleventyConfig.addFilter("date", (dateObj, format = "MMMM dd, yyyy") => {
    // If the dateObj is "now", create a new Date object representing the current date
    if (dateObj === "now") {
      dateObj = new Date();
    }
    // Convert the date object to the desired format using Luxon
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(format);
  });

  // Return the configuration object for Eleventy
  return {
    dir: {
      input: "src", // Directory for input files
      includes: "includes", // Directory for include files
      layouts: "layouts", // Directory for layout files
      output: "_site" // Directory for output files
    },
    templateFormats: ["njk", "md", "html"], // Supported template formats
    htmlTemplateEngine: "njk", // Template engine for HTML files
    markdownTemplateEngine: "njk", // Template engine for Markdown files
  };
};
