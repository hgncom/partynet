import styles from './ArticleMeta.module.css';
import Date from './date';

export default function ArticleMeta({ date, author, tags }) {
  return (
    <div className={styles.meta}>
      <span className={styles.date}><Date dateString={date} /></span>
      {author && <span className={styles.author}>By {author}</span>}
      {tags && tags.length > 0 && (
        <span className={styles.tags}>
          {tags.map((tag) => (
            <span className={styles.tag} key={tag}>{tag}</span>
          ))}
        </span>
      )}
    </div>
  );
}
