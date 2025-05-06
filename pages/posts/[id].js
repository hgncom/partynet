import Head from 'next/head';
import Link from 'next/link';
import { useRef } from 'react';
import { getAllPostIds, getPostData, getSortedPostsData } from '../../lib/posts';
import { tagIncludes, safeTagToLower, anyTagIncludesAnyCategory, findTagMatchingCategory } from '../../lib/utils';
import Layout from '../../components/layout';
import ArticleMeta from '../../components/ArticleMeta';
import SchemaMarkup from '../../components/SchemaMarkup';
import FAQSchema from '../../components/FAQSchema';
import TableOfContents from '../../components/TableOfContents';
import EnhancedRelatedPosts from '../../components/EnhancedRelatedPosts';
import OptimizedImage from '../../components/OptimizedImage';
import Breadcrumbs from '../../components/Breadcrumbs';
import AuthorBio from '../../components/AuthorBio';
import SocialShare from '../../components/SocialShare';
import Comments from '../../components/Comments';
import { extractFAQsServer } from '../../lib/faq-parser';
import navStyles from '../../styles/post-navigation.module.css';
import styles from '../../styles/article-layout.module.css';

export default function Post({ postData }) {
  // Create a ref for the article content to use with the Table of Contents
  const contentRef = useRef(null);
  return (
    <Layout>
      <Head>
        <title>{`${postData.title} | Party.net`}</title>
        <meta name="description" content={postData.excerpt} />
        <meta name="keywords" content={postData.tags?.join(', ')} />
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={postData.title} />
        <meta property="og:description" content={postData.excerpt} />
        <meta property="og:image" content={postData.featuredImage || '/images/party-default.jpg'} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://partynet.netlify.app/posts/${postData.id}`} />
        {/* Canonical Tag */}
        <link rel="canonical" href={`https://partynet.netlify.app/posts/${postData.id}`} />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={postData.title} />
        <meta name="twitter:description" content={postData.excerpt} />
        <meta name="twitter:image" content={postData.featuredImage || '/images/party-default.jpg'} />
      </Head>
      
      {/* Add the SchemaMarkup component */}
      <SchemaMarkup postData={postData} />
      
      {/* Add FAQ Schema for rich snippets if the post has FAQ items */}
      {postData.faqItems && postData.faqItems.length > 0 && (
        <FAQSchema faqItems={postData.faqItems} />
      )}
      
      {/* Add breadcrumbs with schema markup for better SEO */}
      <Breadcrumbs 
        customCrumbs={[
          { name: 'Home', path: '/', position: 1 },
          // Find the first tag that matches a category and use it
          ...(postData.tags && anyTagIncludesAnyCategory(postData.tags, ['birthday', 'wedding', 'holiday', 'budget', 'corporate', 'outdoor']) ? [{
            name: findTagMatchingCategory(postData.tags, ['birthday', 'wedding', 'holiday', 'budget', 'corporate', 'outdoor']) || 'Category',
            path: (() => {
              // Helper function to determine category path
              const matchingTag = findTagMatchingCategory(postData.tags, ['birthday', 'wedding', 'holiday', 'budget', 'corporate', 'outdoor']);
              const tagLower = safeTagToLower(matchingTag);
              
              if (tagLower.includes('birthday')) return '/categories/birthday';
              if (tagLower.includes('wedding')) return '/categories/wedding';
              if (tagLower.includes('holiday')) return '/categories/holiday';
              if (tagLower.includes('budget')) return '/categories/budget';
              if (tagLower.includes('corporate')) return '/categories/corporate';
              return '/categories/outdoor';
            })(),
            position: 2
          }] : []),
          { name: postData.title, path: `/posts/${postData.id}`, position: postData.tags ? 3 : 2, isCurrentPage: true }
        ]}
      />
      
      <article className={styles.articleContainer}>
        <header className={styles.articleHeader}>
          <h1 className={styles.articleTitle}>{postData.title}</h1>
          <ArticleMeta date={postData.date} author={postData.author} tags={postData.tags} />
          {postData.featuredImage && (
            <div className={styles.featuredImageContainer}>
              <OptimizedImage 
                src={postData.featuredImage} 
                alt={postData.featuredImageAlt || postData.title} 
                width={1200} 
                height={630} 
                priority={true}
              />
            </div>
          )}
        </header>
        
        <div className={styles.contentWrapper}>
          {/* Add Table of Contents for long articles */}
          <TableOfContents contentRef={contentRef} />
          
          <div 
            className={styles.postContent}
            ref={contentRef}
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
          />
        </div>
        
        {postData.author && <AuthorBio authorName={postData.author} />}
        
        {/* Enhanced Related Posts with intelligent tag matching */}
        <EnhancedRelatedPosts 
          currentPostId={postData.id} 
          currentTags={postData.tags || []} 
          allPosts={postData.allPosts || []} 
        />
      </article>
      
      <div className={navStyles['post-navigation']}>
        {/* Enhanced social sharing with proper SEO attributes */}
        <SocialShare 
          url={`https://partynet.netlify.app/posts/${postData.id}`}
          title={postData.title}
          description={postData.excerpt}
        />
        
        <div className={navStyles['related-categories']}>
          <h3>Explore Related Categories:</h3>
          <div className={navStyles['category-links']}>
            {postData.tags && postData.tags.map(tag => {
              // Map tags to categories
              let categoryLink = null;
              if (tagIncludes(tag, 'birthday')) {
                categoryLink = <Link href="/categories/birthday" key="birthday">Birthday Party Ideas</Link>;
              } else if (tagIncludes(tag, 'garden') || tagIncludes(tag, 'outdoor')) {
                categoryLink = <Link href="/categories/garden" key="garden">Garden Party Ideas</Link>;
              } else if (tagIncludes(tag, 'budget') || tagIncludes(tag, 'affordable')) {
                categoryLink = <Link href="/categories/budget" key="budget">Budget-Friendly Party Ideas</Link>;
              }
              return categoryLink;
            }).filter(Boolean)}
          </div>
        </div>
      </div>
      
      {/* Comments section */}
      <Comments postId={postData.id} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  const allPosts = getSortedPostsData();
  
  // Add all posts to the postData for related posts component
  postData.allPosts = allPosts;
  
  // Extract FAQs from the post content for schema markup
  if (postData.contentHtml) {
    postData.faqItems = extractFAQsServer(postData.contentHtml);
  }
  
  return {
    props: {
      postData,
    },
    // Revalidate every 24 hours for incremental static regeneration
    revalidate: 86400,
  };
}
