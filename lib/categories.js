// Import getSortedPostsData with a safeguard for client-side rendering
import { getSortedPostsData } from './posts';

// Helper function to check if we're on the server
const isServer = typeof window === 'undefined';

// Define our main categories with SEO-optimized metadata
export const categories = {
  'birthday': {
    title: 'Birthday Party Ideas & Planning Tips',
    description: 'Discover creative birthday party ideas, themes, and planning tips for all ages. From kids\'s birthdays to milestone celebrations, find everything you need for an unforgettable birthday party.',
    keywords: ['birthday party', 'birthday celebration', 'birthday themes', 'birthday planning'],
    image: 'https://images.unsplash.com/photo-1583875762487-5f8f7c718d14?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'Colorful birthday party setup with balloons, cake, and decorations'
  },
  'wedding': {
    title: 'Wedding Celebration Planning & Ideas',
    description: 'Plan your perfect wedding celebration with our comprehensive guides and creative ideas. From engagement parties to receptions, discover tips for venues, decor, and creating memorable moments.',
    keywords: ['wedding celebration', 'wedding planning', 'wedding reception', 'wedding ideas'],
    image: 'https://images.unsplash.com/photo-1548088615-0795daa548c9?q=80&w=3269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'Elegant wedding celebration with beautiful floral arrangements'
  },
  'holiday': {
    title: 'Holiday Party Planning & Seasonal Celebrations',
    description: 'Create memorable holiday celebrations with our seasonal party planning guides. From Christmas and New Year\'s to summer holiday events, find decoration ideas, menu planning, and hosting tips.',
    keywords: ['holiday party', 'seasonal celebration', 'holiday planning', 'festive events'],
    image: 'https://images.unsplash.com/photo-1501556466850-7c9fa1fccb4c?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'Festive holiday party scene with decorative lights'
  },
  'budget': {
    title: 'Budget-Friendly Party Ideas & Money-Saving Tips',
    description: 'Host amazing parties without breaking the bank with our budget-friendly celebration guides. Discover affordable decoration ideas, DIY projects, and smart planning tips for cost-effective events.',
    keywords: ['budget party', 'affordable celebration', 'cheap party ideas', 'party on a budget'],
    image: 'https://plus.unsplash.com/premium_photo-1681589453747-53fd893fa420?q=80&w=3269&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'Budget-friendly party setup with simple decorations'
  },
  'corporate': {
    title: 'Corporate Event Planning & Professional Gatherings',
    description: 'Plan successful corporate events and professional gatherings that achieve business objectives while engaging attendees. Find tips for team building, client appreciation events, and business functions.',
    keywords: ['corporate event', 'business gathering', 'professional event', 'company party'],
    image: 'https://plus.unsplash.com/premium_photo-1661497675847-2075003562fd?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'Professional corporate event setup with elegant table arrangements'
  },
  'outdoor': {
    title: 'Outdoor Party Ideas & Garden Event Planning',
    description: 'Create stunning outdoor celebrations with our garden party and outdoor event planning guides. Discover ideas for decorations, weather-proofing, and seasonal outdoor entertaining.',
    keywords: ['outdoor party', 'garden event', 'outdoor celebration', 'backyard party'],
    image: 'https://plus.unsplash.com/premium_photo-1664471481559-5bad8c5b122f?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'Elegant outdoor garden party setting with table decorations'
  }
};

// Get all category slugs
export function getAllCategorySlugs() {
  return Object.keys(categories).map(category => {
    return {
      params: {
        category: category
      }
    };
  });
}

// Get category data by slug
export function getCategoryData(slug) {
  return categories[slug] || null;
}

// Get all categories with their data
export function getAllCategories() {
  // This function is safe for both server and client as it uses the static categories object
  return Object.keys(categories).map(id => ({
    id,
    ...categories[id]
  }));
}

// Get posts by category
export function getPostsByCategory(category) {
  // Only fetch posts on the server side or if we have mock data for client
  let allPosts = [];
  
  if (isServer) {
    allPosts = getSortedPostsData();
  } else {
    // For client-side, we could use a cached version or fetch from an API
    // This is a fallback to prevent errors during client-side rendering
    console.warn('getPostsByCategory called on client side - using empty dataset');
  }
  
  return allPosts.filter(post => {
    // Check if the post has tags
    if (!post.tags) return false;
    
    // Map common tag variations to our category slugs
    const tagMappings = {
      'birthday': ['birthday', 'birthday party', 'kids party'],
      'wedding': ['wedding', 'wedding celebration', 'reception'],
      'holiday': ['holiday', 'holiday party', 'seasonal celebration'],
      'budget': ['budget', 'budget party', 'affordable celebration'],
      'corporate': ['corporate', 'corporate event', 'business gathering', 'professional event'],
      'outdoor': ['outdoor', 'garden party', 'outdoor events', 'seasonal parties']
    };
    
    // Get the relevant tags for this category
    const relevantTags = tagMappings[category] || [];
    
    // Check if any of the post's tags match the relevant tags for this category
    return post.tags.some(tag => {
      // Ensure tag is a string
      const tagStr = String(tag || '').toLowerCase();
      return relevantTags.some(rt => String(rt).toLowerCase() === tagStr);
    });
  });
}
