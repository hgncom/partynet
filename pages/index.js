import Head from 'next/head';
import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';
import Layout from '../components/layout';
import HeroSection from '../components/HeroSection';
import Date from '../components/date';

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>Party.net - Your Ultimate Guide to Parties & Celebrations</title>
        <meta name="description" content="Discover the best party ideas, planning tips, and celebration inspiration at Party.net - your go-to resource for creating unforgettable events." />
        <meta name="keywords" content="party ideas, event planning, celebrations, party themes, party planning guide" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeroSection />

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
