import styles from './HeroSection.module.css';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>Welcome to Party.net</h1>
        <p className={styles.description}>
          Your ultimate destination for party ideas, planning tips, and celebration inspiration.
        </p>
        <Link href="/categories/birthday" className={styles.ctaButton}>
          Get Inspired!
        </Link>
      </div>
      <div className={styles.confetti} aria-hidden="true">
        {/* Simple animated confetti using SVGs or CSS */}
        <span className={styles.confettiPiece}></span>
        <span className={styles.confettiPiece}></span>
        <span className={styles.confettiPiece}></span>
        <span className={styles.confettiPiece}></span>
        <span className={styles.confettiPiece}></span>
      </div>
    </section>
  );
}
