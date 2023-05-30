module.exports = function(eleventyConfig) {
  // Output directory: _site

  eleventyConfig.addCollection("artProjects", function (collectionApi) {
    return collectionApi.getFilteredByTag("art").sort(function (projectA, projectB) {
      // sort projects by weight (highest first)
      return projectB.data.weight - projectA.data.weight
    })
  })

  eleventyConfig.addCollection("otherPages", function (collectionApi) {
    return collectionApi.getFilteredByTag("other").sort(function (projectA, projectB) {
      // sort projects by weight (highest first)
      return projectB.data.weight - projectA.data.weight
    })
  })

  // Copy `images/` to `_site/images`
  eleventyConfig.addPassthroughCopy("src/images");

  // Copy `css/fonts/` to `_site/css/fonts`
  // Keeps the same directory structure.
  eleventyConfig.addPassthroughCopy("src/fonts");
  
  // Copy css files to `_site/css`
  eleventyConfig.addPassthroughCopy("src/*.css");
};