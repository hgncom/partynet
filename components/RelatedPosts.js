import Link from 'next/link';
import styles from './RelatedPosts.module.css';

export default function RelatedPosts({ related }) {
  if (!related || related.length === 0) return null;
  return (
    <section className={styles.relatedSection}>
      <h3 className={styles.heading}>Related Articles</h3>
      <ul className={styles.relatedList}>
        {related.map((post) => (
          <li key={post.id} className={styles.relatedItem}>
            <Link href={`/posts/${post.id}`} className={styles.relatedLink}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
