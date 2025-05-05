import React from 'react';
import Image from 'next/image';
import styles from './AuthorBio.module.css';

const authorData = {
  'Party Planning Expert': {
    name: 'Sarah Mitchell',
    role: 'Senior Event Planner',
    credentials: 'Certified Event Planner with 12+ years of experience',
    bio: 'Sarah has planned over 500 events ranging from intimate gatherings to large-scale celebrations. She specializes in creating memorable experiences that balance creativity with practical execution.',
    image: '/images/author-sarah.jpg',
    expertise: ['Birthday Celebrations', 'Wedding Planning', 'Corporate Events', 'Holiday Gatherings']
  }
};

export default function AuthorBio({ authorName }) {
  const author = authorData[authorName] || authorData['Party Planning Expert'];
  
  return (
    <div className={styles.authorBio}>
      <div className={styles.authorImageContainer}>
        {author.image && (
          <div className={styles.authorImage}>
            <Image 
              src={author.image} 
              alt={author.name} 
              width={80} 
              height={80}
              className={styles.roundedImage}
            />
          </div>
        )}
      </div>
      <div className={styles.authorInfo}>
        <h3 className={styles.authorName}>{author.name}</h3>
        <p className={styles.authorRole}>{author.role}</p>
        <p className={styles.authorCredentials}>{author.credentials}</p>
        <p className={styles.authorBioText}>{author.bio}</p>
        {author.expertise && (
          <div className={styles.expertiseAreas}>
            <span className={styles.expertiseLabel}>Areas of Expertise:</span>
            <ul className={styles.expertiseList}>
              {author.expertise.map((area, index) => (
                <li key={index} className={styles.expertiseItem}>{area}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
