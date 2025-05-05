import styles from './ArticleBanner.module.css';

export default function ArticleBanner({ src, alt }) {
  if (!src) return null;
  return (
    <div className={styles.banner}>
      <img src={src} alt={alt} className={styles.image} />
    </div>
  );
}
