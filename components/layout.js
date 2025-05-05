import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/layout.module.css';

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Party.net - Your ultimate guide to parties and celebrations"
        />
        <meta name="og:title" content="Party.net" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="google-site-verification" content="sN6PbI5xAl9w5Mw0202LwMrmGDZCBbkcr6UgdWLYupI" />
      </Head>
      
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logo} aria-label="Party.net Home">
            <span className={styles.logoText} role="img" aria-label="Party Popper">🎉</span> Party.net
          </Link>
          <nav className={styles.navigation} aria-label="Main Navigation">
            <ul className={styles.navList}>
              <li><Link href="/" className={styles.navLink}>Home</Link></li>
              <li><Link href="/categories/birthday" className={styles.navLink}>Birthday</Link></li>
              <li><Link href="/categories/wedding" className={styles.navLink}>Wedding</Link></li>
              <li><Link href="/categories/holiday" className={styles.navLink}>Holiday</Link></li>
              <li><Link href="/about" className={styles.navLink}>About</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className={styles.main}>{children}</main>
      
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>Party.net</h3>
            <p>Your ultimate guide to parties and celebrations</p>
          </div>
          
          <div className={styles.footerSection}>
            <h3>Categories</h3>
            <ul>
              <li><Link href="/categories/birthday">Birthday Parties</Link></li>
              <li><Link href="/categories/wedding">Wedding Celebrations</Link></li>
              <li><Link href="/categories/holiday">Holiday Events</Link></li>
              <li><Link href="/categories/corporate">Corporate Gatherings</Link></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h3>Connect</h3>
            <ul>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} Party.net. All rights reserved.</p>
        </div>
      </footer>
      
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}
