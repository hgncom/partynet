import Head from 'next/head';
import Layout from '../components/layout';
import styles from '../styles/contact.module.css';

export default function Contact() {
  return (
    <Layout>
      <Head>
        <title>Contact Us | Party.net</title>
        <meta name="description" content="Get in touch with the Party.net team. We'd love to hear from you about party planning, collaborations, or any questions you might have." />
      </Head>

      <section className={styles.hero}>
        <h1>Contact Us</h1>
        <p className={styles.subtitle}>We'd love to hear from you</p>
      </section>

      <div className={styles.container}>
        <section className={styles.contactInfo}>
          <div className={styles.infoCard}>
            <h2>General Inquiries</h2>
            <p>Have a question about party planning or need advice for your upcoming event?</p>
            <a href="mailto:hello@party.net" className={styles.email}>hello@party.net</a>
          </div>

          <div className={styles.infoCard}>
            <h2>Collaborations</h2>
            <p>Interested in working with us? We're open to partnerships with brands and event professionals.</p>
            <a href="mailto:partners@party.net" className={styles.email}>partners@party.net</a>
          </div>

          <div className={styles.infoCard}>
            <h2>Follow Us</h2>
            <p>Stay updated with our latest party ideas and planning tips on social media.</p>
            <div className={styles.socialLinks}>
              <a href="https://instagram.com/partynet" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Instagram</a>
              <a href="https://pinterest.com/partynet" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Pinterest</a>
              <a href="https://facebook.com/partynet" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Facebook</a>
            </div>
          </div>
        </section>

        <section className={styles.contactForm}>
          <h2>Send Us a Message</h2>
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" name="name" required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Your Message</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>

            <button type="submit" className={styles.submitButton}>Send Message</button>
          </form>
        </section>
      </div>

      <section className={styles.faq}>
        <h2>Frequently Asked Questions</h2>
        
        <div className={styles.faqItem}>
          <h3>Do you offer party planning services?</h3>
          <p>Currently, Party.net is an informational resource only. We don't directly plan events, but our articles and guides are designed to help you plan your own successful celebrations.</p>
        </div>
        
        <div className={styles.faqItem}>
          <h3>Can I contribute an article to Party.net?</h3>
          <p>We occasionally accept guest contributions from event professionals and experienced party planners. Please email us at partners@party.net with your credentials and article pitch.</p>
        </div>
        
        <div className={styles.faqItem}>
          <h3>How quickly will I receive a response to my inquiry?</h3>
          <p>We aim to respond to all messages within 2 business days. For urgent inquiries, please mention this in your subject line.</p>
        </div>
        
        <div className={styles.faqItem}>
          <h3>Do you feature party vendors or venues?</h3>
          <p>We occasionally highlight exceptional vendors and venues in our articles. If you'd like to be considered, please reach out through our partnerships email.</p>
        </div>
      </section>
    </Layout>
  );
}
