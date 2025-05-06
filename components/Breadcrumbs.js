import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/breadcrumbs.module.css';

export default function Breadcrumbs({ customCrumbs }) {
  const router = useRouter();
  const { pathname, query } = router;
  
  // Generate breadcrumbs based on the current path
  const generateBreadcrumbs = () => {
    // If custom breadcrumbs are provided, use those
    if (customCrumbs) {
      return customCrumbs;
    }
    
    // Default breadcrumbs
    const crumbs = [
      { name: 'Home', path: '/', position: 1 }
    ];
    
    // Add category if present in the path
    if (pathname.includes('/categories/')) {
      const categoryMap = {
        'birthday': 'Birthday Parties',
        'wedding': 'Wedding Celebrations',
        'holiday': 'Holiday Events',
        'budget': 'Budget-Friendly Parties',
        'corporate': 'Corporate Events',
        'outdoor': 'Outdoor Parties'
      };
      
      const category = query.category;
      if (category && categoryMap[category]) {
        crumbs.push({
          name: categoryMap[category],
          path: `/categories/${category}`,
          position: 2
        });
      }
    }
    
    // Add post title if on a post page
    if (pathname.includes('/posts/') && query.id) {
      // For post pages, we need to get the title from the page props
      // This will be handled by the parent component passing customCrumbs
      // But we still add a placeholder for the structure
      if (!customCrumbs) {
        crumbs.push({
          name: 'Article',
          path: `/posts/${query.id}`,
          position: crumbs.length + 1,
          isCurrentPage: true
        });
      }
    }
    
    return crumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  return (
    <nav aria-label="Breadcrumb" className={styles.breadcrumbContainer}>
      <ol 
        className={styles.breadcrumbList}
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
      >
        {breadcrumbs.map((crumb, index) => (
          <li 
            key={crumb.path}
            className={styles.breadcrumbItem}
            itemProp="itemListElement" 
            itemScope 
            itemType="https://schema.org/ListItem"
          >
            {crumb.isCurrentPage ? (
              <span itemProp="name" className={styles.currentPage}>
                {crumb.name}
              </span>
            ) : (
              <Link href={crumb.path} itemProp="item" className={styles.breadcrumbLink}>
                <span itemProp="name">{crumb.name}</span>
              </Link>
            )}
            <meta itemProp="position" content={crumb.position.toString()} />
            {index < breadcrumbs.length - 1 && (
              <span className={styles.separator} aria-hidden="true">›</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
