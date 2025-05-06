/**
 * Utility functions for Party.net
 */

/**
 * Safely check if a tag includes a category
 * @param {any} tag - The tag to check
 * @param {string} category - The category to look for
 * @returns {boolean} - Whether the tag includes the category
 */
export function tagIncludes(tag, category) {
  if (!tag || typeof tag !== 'string') {
    return false;
  }
  return tag.toLowerCase().includes(category.toLowerCase());
}

/**
 * Safely convert a tag to lowercase
 * @param {any} tag - The tag to convert
 * @returns {string} - The lowercase tag or empty string
 */
export function safeTagToLower(tag) {
  if (!tag || typeof tag !== 'string') {
    return '';
  }
  return tag.toLowerCase();
}

/**
 * Safely check if any tag in an array includes a category
 * @param {Array} tags - Array of tags
 * @param {Array} categories - Array of categories
 * @returns {boolean} - Whether any tag includes any category
 */
export function anyTagIncludesAnyCategory(tags, categories) {
  if (!Array.isArray(tags) || !Array.isArray(categories)) {
    return false;
  }
  
  return tags.some(tag => {
    if (!tag || typeof tag !== 'string') {
      return false;
    }
    
    return categories.some(cat => {
      if (!cat || typeof cat !== 'string') {
        return false;
      }
      
      return tag.toLowerCase().includes(cat.toLowerCase());
    });
  });
}

/**
 * Find the first tag that includes any of the categories
 * @param {Array} tags - Array of tags
 * @param {Array} categories - Array of categories
 * @returns {string|null} - The matching tag or null
 */
export function findTagMatchingCategory(tags, categories) {
  if (!Array.isArray(tags) || !Array.isArray(categories)) {
    return null;
  }
  
  const matchingTag = tags.find(tag => {
    if (!tag || typeof tag !== 'string') {
      return false;
    }
    
    return categories.some(cat => {
      if (!cat || typeof cat !== 'string') {
        return false;
      }
      
      return tag.toLowerCase().includes(cat.toLowerCase());
    });
  });
  
  return matchingTag || null;
}
