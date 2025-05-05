import Head from 'next/head';
import Link from 'next/link';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Layout from '../../components/layout';
import ArticleBanner from '../../components/ArticleBanner';
import ArticleMeta from '../../components/ArticleMeta';
import RelatedPosts from '../../components/RelatedPosts';
import AuthorBio from '../../components/AuthorBio';
import SchemaMarkup from '../../components/SchemaMarkup';
import styles from '../../components/ArticleContent.module.css';
import navStyles from '../../styles/post-navigation.module.css';

export default function Post({ postData }) {
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
      
      <article className={styles['blog-post']}>
        <h1 className={styles['post-title']}>{postData.title}</h1>
        <ArticleMeta date={postData.date} author={postData.author} tags={postData.tags} />
        <ArticleBanner src={postData.featuredImage} alt={postData.title} />
        <div 
          className={styles['post-content']}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />
        
        {postData.author && <AuthorBio authorName={postData.author} />}
        
        {/* Related posts section - getRelatedPosts is a stub for now */}
        <RelatedPosts related={postData.relatedPosts || []} />
      </article>
      
      <div className={navStyles['post-navigation']}>
        <div className={navStyles['share-buttons']}>
          <h3>Share this article:</h3>
          <button className={`${navStyles['share-button']} ${navStyles['facebook']}`}>Facebook</button>
          <button className={`${navStyles['share-button']} ${navStyles['twitter']}`}>Twitter</button>
          <button className={`${navStyles['share-button']} ${navStyles['pinterest']}`}>Pinterest</button>
        </div>
        
        <div className={navStyles['related-categories']}>
          <h3>Explore Related Categories:</h3>
          <div className={navStyles['category-links']}>
            {postData.tags && postData.tags.map(tag => {
              // Map tags to categories
              let categoryLink = null;
              if (tag.includes('birthday')) {
                categoryLink = <Link href="/categories/birthday" key="birthday">Birthday Party Ideas</Link>;
              } else if (tag.includes('garden') || tag.includes('outdoor')) {
                categoryLink = <Link href="/categories/garden" key="garden">Garden Party Ideas</Link>;
              } else if (tag.includes('budget') || tag.includes('affordable')) {
                categoryLink = <Link href="/categories/budget" key="budget">Budget-Friendly Party Ideas</Link>;
              }
              return categoryLink;
            }).filter(Boolean)}
          </div>
        </div>
      </div>
      
      <div className={navStyles['related-posts']}>
        <h2>You might also enjoy</h2>
        {/* Related posts would go here */}
      </div>
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
  return {
    props: {
      postData,
    },
  };
}
