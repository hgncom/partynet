import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import HeroSection from '../components/HeroSection';
import OptimizedImage from '../components/OptimizedImage';
import WebsiteSchema from '../components/WebsiteSchema';
import SeoPerformanceHead from '../components/SeoPerformanceHead';
import LocalBusinessSchema from '../components/LocalBusinessSchema';
import EnhancedFAQSchema from '../components/EnhancedFAQSchema';
import { getSortedPostsData } from '../lib/posts';
import { getAllCategories } from '../lib/categories';
import styles from '../styles/home.module.css';

export default function Home({ allPostsData, categories }) {
  // Common FAQs for the homepage
  const homepageFaqs = [
    {
      question: "What services does Party.net offer?",
      answer: "Party.net provides comprehensive party planning resources including themes, decoration ideas, invitation templates, catering suggestions, and step-by-step planning guides for all types of celebrations."
    },
    {
      question: "How far in advance should I start planning my party?",
      answer: "For small gatherings, we recommend starting 4-6 weeks in advance. For larger events like weddings or milestone celebrations, begin planning 3-6 months ahead to ensure venue availability and proper preparation time."
    },
    {
      question: "Does Party.net offer personalized party planning services?",
      answer: "Yes! In addition to our free resources, we offer personalized consultation services where our expert planners can help design your perfect event based on your specific needs and budget."
    },
    {
      question: "How can I find party ideas for a specific theme?",
      answer: "You can browse our extensive category pages or use our search function to find ideas for specific themes. Each theme includes decoration suggestions, food ideas, activity recommendations, and more."
    }
  ];

  // Featured posts for the homepage
  const featuredPosts = allPostsData.slice(0, 6);
  
  return (
    <Layout home>
      <Head>
        <title>Party.net - Your Ultimate Party Planning Resource</title>
        <meta name="description" content="Discover expert party planning ideas, themes, decorations, and step-by-step guides for birthdays, weddings, and special occasions. Create memorable celebrations with Party.net." />
        <meta name="keywords" content="party planning, birthday parties, wedding planning, event themes, party decorations, celebration ideas" />
        <link rel="canonical" href="https://partynet.netlify.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Party.net - Your Ultimate Guide to Parties & Celebrations" />
        <meta name="twitter:description" content="Discover the best party ideas, planning tips, and celebration inspiration at Party.net - your go-to resource for creating unforgettable events." />
        <meta name="twitter:image" content="https://partynet.netlify.app/images/party-default.jpg" />
      </Head>
      
      {/* Add Website Schema for better search engine understanding */}
      <WebsiteSchema />
      <LocalBusinessSchema />
      
      <HeroSection categories={categories} />

      <section className="featured-categories">
        <h2>Explore Party Categories</h2>
        <div className="category-grid">
          <div className="category-card">
            <h3>Birthday Parties</h3>
            <p>Creative ideas for milestone celebrations</p>
          </div>
          <div className="category-card">
            <h3>Wedding Celebrations</h3>
            <p>From engagement to reception</p>
          </div>
          <div className="category-card">
            <h3>Holiday Events</h3>
            <p>Seasonal celebrations done right</p>
          </div>
          <div className="category-card">
            <h3>Corporate Gatherings</h3>
            <p>Professional events with personality</p>
          </div>
        </div>
      </section>

      <section className="latest-posts">
        <h2>Latest Articles</h2>
        <ul className="post-list">
          {allPostsData.map(({ id, date, title, excerpt }) => (
            <li className="post-item" key={id}>
              <Link href={`/posts/${id}`} className="post-link">
                <h3>{title}</h3>
                <p className="post-excerpt">{excerpt}</p>
                <small className="post-date">
                  <Date dateString={date} />
                </small>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="newsletter">
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter for the latest party trends and tips.</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Your email address" required />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
