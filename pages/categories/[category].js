import Head from 'next/head';
import Link from 'next/link';
import { getSortedPostsData } from '../../lib/posts';
import Layout from '../../components/layout';
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
        <meta property="og:url" content={`https://party.net/categories/${categoryData.slug}`} />
        
        {/* Canonical Tag */}
        <link rel="canonical" href={`https://party.net/categories/${categoryData.slug}`} />
        
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
                      <img src={featuredImage} alt={title} />
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
  // Define the categories we have
  const categories = ['birthday', 'wedding', 'holiday', 'corporate', 'garden', 'budget'];
  
  const paths = categories.map((category) => ({
    params: { category },
  }));
  
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const allPosts = getSortedPostsData();
  
  // Category data mapping
  const categoryDataMap = {
    birthday: {
      slug: 'birthday',
      title: 'Birthday Party Ideas',
      description: 'Discover creative and fun birthday party ideas for all ages. From themes and decorations to activities and food, find everything you need to plan the perfect birthday celebration.',
      image: '/images/birthday-planning-guide.jpg',
      tags: ['birthday party', 'birthday', 'party planning', 'celebration']
    },
    wedding: {
      slug: 'wedding',
      title: 'Wedding Celebration Ideas',
      description: 'Create a memorable wedding celebration with our comprehensive planning guides. From engagement parties to the reception, discover tips for venues, decor, timelines, and personal touches.',
      image: '/images/wedding-celebration-guide.jpg',
      tags: ['wedding', 'wedding celebration', 'wedding planning', 'reception']
    },
    holiday: {
      slug: 'holiday',
      title: 'Holiday Event Ideas',
      description: 'Plan memorable holiday celebrations year-round with our seasonal party guides. From winter festivities to summer holiday gatherings, find ideas for decorations, menus, and activities.',
      image: '/images/holiday-party-planning.jpg',
      tags: ['holiday', 'holiday party', 'seasonal celebration', 'party planning']
    },
    corporate: {
      slug: 'corporate',
      title: 'Corporate Gathering Ideas',
      description: 'Transform standard business functions into memorable corporate events with personality. From team-building to client appreciation, discover professional event planning strategies.',
      image: '/images/corporate-event-planning.jpg',
      tags: ['corporate', 'corporate event', 'business gathering', 'professional event']
    },
    garden: {
      slug: 'garden',
      title: 'Garden Party Ideas',
      description: 'Create magical outdoor celebrations with our garden party ideas and tips. Learn how to host beautiful outdoor events in any season, with advice on decor, food, and weather planning.',
      image: '/images/garden-party-guide.jpg',
      tags: ['garden party', 'outdoor events', 'party planning', 'seasonal parties']
    },
    budget: {
      slug: 'budget',
      title: 'Budget-Friendly Party Ideas',
      description: 'Plan amazing parties without breaking the bank. Our budget-friendly party ideas help you create memorable celebrations with smart planning, DIY decor, and affordable entertainment.',
      image: '/images/budget-party-guide.jpg',
      tags: ['budget party', 'affordable celebration', 'party planning', 'DIY party']
    }
  };
  
  // Get the category data
  const categoryData = categoryDataMap[params.category];
  
  // Filter posts by category tags
  const categoryPosts = allPosts.filter(post => {
    if (!post.tags) return false;
    return post.tags.some(tag => categoryData.tags.includes(tag));
  });
  
  return {
    props: {
      categoryData,
      posts: categoryPosts,
    },
  };
}
