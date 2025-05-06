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
  if (tag === null || tag === undefined || typeof tag !== 'string') {
    return false;
  }
  if (category === null || category === undefined || typeof category !== 'string') {
    return false;
  }
  try {
    return String(tag).toLowerCase().includes(String(category).toLowerCase());
  } catch (e) {
    console.error('Error in tagIncludes:', e);
    return false;
  }
}

/**
 * Safely convert a tag to lowercase
 * @param {any} tag - The tag to convert
 * @returns {string} - The lowercase tag or empty string
 */
export function safeTagToLower(tag) {
  if (tag === null || tag === undefined || typeof tag !== 'string') {
    return '';
  }
  try {
    return String(tag).toLowerCase();
  } catch (e) {
    console.error('Error in safeTagToLower:', e);
    return '';
  }
}

/**
 * Safely check if any tag in an array includes a category
 * @param {Array} tags - Array of tags
 * @param {Array} categories - Array of categories
 * @returns {boolean} - Whether any tag includes any category
 */
export function anyTagIncludesAnyCategory(tags, categories) {
  // Check if tags is a valid array
  if (!tags || !Array.isArray(tags) || tags.length === 0) {
    return false;
  }
  
  // Check if categories is a valid array
  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return false;
  }
  
  try {
    return tags.some(tag => {
      if (tag === null || tag === undefined || typeof tag !== 'string') {
        return false;
      }
      
      return categories.some(cat => {
        if (cat === null || cat === undefined || typeof cat !== 'string') {
          return false;
        }
        
        try {
          return String(tag).toLowerCase().includes(String(cat).toLowerCase());
        } catch (e) {
          console.error('Error in anyTagIncludesAnyCategory inner loop:', e);
          return false;
        }
      });
    });
  } catch (e) {
    console.error('Error in anyTagIncludesAnyCategory:', e);
    return false;
  }
}

/**
 * Find the first tag that includes any of the categories
 * @param {Array} tags - Array of tags
 * @param {Array} categories - Array of categories
 * @returns {string|null} - The matching tag or null
 */
export function findTagMatchingCategory(tags, categories) {
  // Check if tags is a valid array
  if (!tags || !Array.isArray(tags) || tags.length === 0) {
    return null;
  }
  
  // Check if categories is a valid array
  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return null;
  }
  
  try {
    const matchingTag = tags.find(tag => {
      if (tag === null || tag === undefined) {
        return false;
      }
      
      // Ensure tag is a string
      const tagStr = typeof tag === 'string' ? tag : String(tag);
      
      return categories.some(cat => {
        if (cat === null || cat === undefined) {
          return false;
        }
        
        // Ensure category is a string
        const catStr = typeof cat === 'string' ? cat : String(cat);
        
        try {
          return tagStr.toLowerCase().includes(catStr.toLowerCase());
        } catch (e) {
          console.error('Error in findTagMatchingCategory inner loop:', e);
          return false;
        }
      });
    });
    
    return matchingTag || null;
  } catch (e) {
    console.error('Error in findTagMatchingCategory:', e);
    return null;
  }
}
