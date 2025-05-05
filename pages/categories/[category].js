import Head from 'next/head';
import Link from 'next/link';
import { getSortedPostsData } from '../../lib/posts';
import { getAllCategorySlugs, getCategoryData, getPostsByCategory } from '../../lib/categories';
import Layout from '../../components/layout';
import OptimizedImage from '../../components/OptimizedImage';
import styles from '../../styles/categories.module.css';

export default function Category({ categoryData, posts }) {
  const { title, description, image } = categoryData;
  
  return (
    <Layout>
      <Head>
        <title>{`${title} | Party.net`}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={`${title}, party ideas, party planning, ${title} inspiration`} />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={`${title} | Party.net`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image || '/images/party-default.jpg'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://partynet.netlify.app/categories/${categoryData.slug}`} />
        
        {/* Canonical Tag */}
        <link rel="canonical" href={`https://partynet.netlify.app/categories/${categoryData.slug}`} />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} | Party.net`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image || '/images/party-default.jpg'} />
      </Head>
      
      <section className={styles['category-header']}>
        <h1>{title}</h1>
        <p className={styles['category-description']}>{description}</p>
      </section>
      
      <section className={styles['category-posts']}>
        <h2>Articles in {title}</h2>
        
        {posts.length > 0 ? (
          <ul className={styles['post-list']}>
            {posts.map(({ id, date, title, excerpt, featuredImage }) => (
              <li className={styles['post-item']} key={id}>
                <Link href={`/posts/${id}`} className={styles['post-link']}>
                  {featuredImage && (
                    <div className={styles['post-thumbnail']}>
                      <OptimizedImage 
                        src={featuredImage} 
                        alt={post.featuredImageAlt || title} 
                        className={styles['thumbnail-image']}
                      />
                    </div>
                  )}
                  <div className={styles['post-content']}>
                    <h3>{title}</h3>
                    <p className={styles['post-excerpt']}>{excerpt}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No articles found in this category. Check back soon!</p>
        )}
      </section>
      
      <section className={styles['category-resources']}>
        <h2>Resources for {title}</h2>
        <div className={styles['resources-grid']}>
          <div className={styles['resource-card']}>
            <h3>Free {title} Checklist</h3>
            <p>Download our comprehensive planning checklist</p>
            <Link href="/resources" className={styles['resource-link']}>Download</Link>
          </div>
          <div className={styles['resource-card']}>
            <h3>{title} FAQ</h3>
            <p>Answers to your most common questions</p>
            <Link href="/faq" className={styles['resource-link']}>Learn More</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllCategorySlugs();
  
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Get the category data from our enhanced category system
  const categoryData = getCategoryData(params.category);
  
  if (!categoryData) {
    return {
      notFound: true
    };
  }
  
  // Add the slug to the category data
  categoryData.slug = params.category;
  
  // Get posts for this category using our new function
  const posts = getPostsByCategory(params.category);
  // Return the props
  return {
    props: {
      categoryData,
      posts,
    },
    // Revalidate every 24 hours for incremental static regeneration
    revalidate: 86400,
  };
}
