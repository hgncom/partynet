import Head from 'next/head';

export default function SchemaMarkup({ postData }) {
  if (!postData) return null;
  
  // Create image schema if featured image exists
  let imageSchema = null;
  if (postData.featuredImage) {
    imageSchema = {
      '@context': 'https://schema.org',
      '@type': 'ImageObject',
      contentUrl: postData.featuredImage,
      name: postData.featuredImageAlt || postData.title,
      description: postData.featuredImageAlt || `Featured image for ${postData.title}`,
      creditText: postData.author || 'Party.net',
      creator: {
        '@type': 'Person',
        name: postData.author || 'Party Planning Expert'
      },
      copyrightNotice: `© ${new Date().getFullYear()} Party.net`,
      license: 'https://partynet.netlify.app/terms'
    };
  }
  
  // Create the Article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: postData.title,
    description: postData.excerpt,
    image: postData.featuredImage,
    datePublished: postData.date,
    dateModified: postData.lastModified || postData.date,
    author: {
      '@type': 'Person',
      name: postData.author || 'Party Planning Expert'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Party.net',
      logo: {
        '@type': 'ImageObject',
        url: 'https://partynet.netlify.app/images/party-default.jpg'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://partynet.netlify.app/posts/${postData.id}`
    },
    // Add keywords for better topic relevance
    keywords: postData.tags ? postData.tags.join(', ') : 'party planning, party ideas'
  };
  
  // Create BreadcrumbList schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://partynet.netlify.app/'
      },
      // If we have tags that match categories, add the category
      ...(postData.tags && postData.tags.some(tag => 
        ['birthday', 'wedding', 'holiday', 'budget', 'corporate', 'outdoor'].some(cat => 
          tag.toLowerCase().includes(cat)
        )
      ) ? [{
        '@type': 'ListItem',
        position: 2,
        name: postData.tags.find(tag => 
          ['birthday', 'wedding', 'holiday', 'budget', 'corporate', 'outdoor'].some(cat => 
            tag.toLowerCase().includes(cat)
          )
        ),
        item: `https://partynet.netlify.app/categories/${postData.tags.find(tag => 
          ['birthday', 'wedding', 'holiday', 'budget', 'corporate', 'outdoor'].some(cat => 
            tag.toLowerCase().includes(cat)
          )
        ).toLowerCase().split(' ')[0]}`
      }] : []),
      {
        '@type': 'ListItem',
        position: postData.tags && postData.tags.some(tag => 
          ['birthday', 'wedding', 'holiday', 'budget', 'corporate', 'outdoor'].some(cat => 
            tag.toLowerCase().includes(cat)
          )
        ) ? 3 : 2,
        name: postData.title,
        item: `https://partynet.netlify.app/posts/${postData.id}`
      }
    ]
  };
  
  return (
    <Head>
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      {/* Image Schema - only if featured image exists */}
      {imageSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
        />
      )}
      
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </Head>
  );
}
