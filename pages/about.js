import Head from 'next/head';
import Layout from '../components/layout';
import styles from '../styles/about.module.css';

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About Party.net | Your Celebration Resource</title>
        <meta name="description" content="Learn about Party.net, your ultimate resource for party planning, event ideas, and celebration inspiration. Discover our mission to help you create memorable moments." />
      </Head>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>About Party.net</h1>
          <p className={styles.tagline}>Creating memorable celebrations, one party at a time</p>
        </div>
      </section>

      <section className={styles.mission}>
        <h2>Our Mission</h2>
        <p>
          At Party.net, we believe that celebrations are more than just events—they're opportunities to create lasting memories, strengthen relationships, and mark life's important moments. Our mission is to provide you with the inspiration, guidance, and practical advice you need to create meaningful celebrations, regardless of your budget, experience level, or occasion.
        </p>
        <p>
          We're committed to making party planning accessible, enjoyable, and stress-free, so you can focus on what really matters: connecting with the people you care about and creating joyful experiences.
        </p>
      </section>

      <section className={styles.story}>
        <h2>Our Story</h2>
        <div className={styles.storyContent}>
          <div className={styles.storyText}>
            <p>
              Party.net began in 2025 with a simple observation: planning celebrations should be as enjoyable as the events themselves. After years of organizing everything from intimate dinner parties to large-scale corporate events, our founder recognized that many people find party planning overwhelming rather than exciting.
            </p>
            <p>
              Drawing on extensive experience in event planning, hospitality, and digital content creation, we assembled a team of celebration experts passionate about sharing their knowledge. Together, we've created a resource hub that combines practical planning tools with creative inspiration to help you become a confident host.
            </p>
            <p>
              What started as a small blog has grown into a comprehensive celebration resource, but our core values remain the same: accessibility, creativity, and a genuine desire to help people connect through memorable gatherings.
            </p>
          </div>
          <div className={styles.storyImage}>
            <img src="/images/about-team.jpg" alt="The Party.net team" />
          </div>
        </div>
      </section>

      <section className={styles.values}>
        <h2>Our Values</h2>
        <div className={styles.valueGrid}>
          <div className={styles.valueCard}>
            <h3>Inclusivity</h3>
            <p>We believe celebrations should bring people together. Our content embraces diverse traditions, accommodates various needs, and recognizes that meaningful gatherings come in many forms.</p>
          </div>
          <div className={styles.valueCard}>
            <h3>Practicality</h3>
            <p>While we love beautiful inspiration, we're committed to providing advice that works in real life. Our tips consider different budgets, time constraints, and skill levels.</p>
          </div>
          <div className={styles.valueCard}>
            <h3>Creativity</h3>
            <p>We encourage thoughtful innovation in celebrations, helping you express your unique style and create distinctive experiences for your guests.</p>
          </div>
          <div className={styles.valueCard}>
            <h3>Quality</h3>
            <p>From our thoroughly researched articles to our carefully curated ideas, we prioritize excellence in everything we share with our community.</p>
          </div>
        </div>
      </section>

      <section className={styles.team}>
        <h2>Meet Our Team</h2>
        <div className={styles.teamGrid}>
          <div className={styles.teamMember}>
            <img src="/images/team-alex.jpg" alt="Alex Chen" />
            <h3>Alex Chen</h3>
            <p className={styles.title}>Founder & Creative Director</p>
            <p>With over 15 years of experience in event planning, Alex brings professional expertise and creative vision to Party.net.</p>
          </div>
          <div className={styles.teamMember}>
            <img src="/images/team-jordan.jpg" alt="Jordan Williams" />
            <h3>Jordan Williams</h3>
            <p className={styles.title}>Content Strategist</p>
            <p>Jordan's background in digital media and personal passion for entertaining inform our approachable content style.</p>
          </div>
          <div className={styles.teamMember}>
            <img src="/images/team-taylor.jpg" alt="Taylor Rodriguez" />
            <h3>Taylor Rodriguez</h3>
            <p className={styles.title}>Culinary Expert</p>
            <p>As a trained chef with a specialty in catering, Taylor ensures our food and beverage advice is both delicious and doable.</p>
          </div>
          <div className={styles.teamMember}>
            <img src="/images/team-morgan.jpg" alt="Morgan Lee" />
            <h3>Morgan Lee</h3>
            <p className={styles.title}>Design Specialist</p>
            <p>Morgan's eye for aesthetics and background in interior design helps our readers create beautiful celebration environments.</p>
          </div>
        </div>
      </section>

      <section className={styles.expertise}>
        <h2>Our Expertise</h2>
        <p>
          The Party.net team brings together specialists from various celebration-related fields. Our contributors include professional event planners, caterers, designers, photographers, and entertainers who share their industry insights in accessible ways.
        </p>
        <p>
          We also collaborate with cultural consultants to ensure our content about heritage celebrations is authentic and respectful. Our articles undergo a thorough editorial process to ensure accuracy, practicality, and inclusivity.
        </p>
        <p>
          While we pride ourselves on our expertise, we're also lifelong learners. We regularly attend industry events, test new products and techniques, and refine our recommendations based on reader feedback.
        </p>
      </section>

      <section className={styles.contact}>
        <h2>Connect With Us</h2>
        <p>
          We love hearing from our community! Whether you have a question, suggestion, or just want to share photos from a celebration you planned using our resources, we'd be delighted to connect.
        </p>
        <div className={styles.contactMethods}>
          <div className={styles.contactMethod}>
            <h3>Email</h3>
            <p><a href="mailto:hello@party.net">hello@party.net</a></p>
          </div>
          <div className={styles.contactMethod}>
            <h3>Social Media</h3>
            <div className={styles.socialLinks}>
              <a href="https://instagram.com/partynetofficial" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://pinterest.com/partynet" target="_blank" rel="noopener noreferrer">Pinterest</a>
              <a href="https://facebook.com/partynet" target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
