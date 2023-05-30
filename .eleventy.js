const Image = require("@11ty/eleventy-img");
const glob = require("glob-promise");

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

  eleventyConfig.addCollection('images', async collectionApi => {
    let files = await glob('./src/images/kidpix/*.png');
    // console.log(files)

    let collection = files.map(imagePath => {
      return {
        path: imagePath.replace('./src',''),
        id: imagePath.replace('./src/images/kidpix/', '')
      }
    });
    // console.log(collection)
    return collection;

  });
};