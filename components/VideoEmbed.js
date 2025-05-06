import React from 'react';
import styles from '../styles/video-embed.module.css';

/**
 * VideoEmbed component for embedding YouTube videos with proper SEO attributes
 * Implements lazy loading and structured data for video content
 */
export default function VideoEmbed({ 
  videoId, 
  title, 
  description, 
  thumbnailUrl,
  uploadDate = new Date().toISOString().split('T')[0]
}) {
  // Generate schema.org VideoObject markup
  const videoSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title,
    description: description,
    thumbnailUrl: thumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    uploadDate: uploadDate,
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    potentialAction: {
      '@type': 'WatchAction',
      target: `https://www.youtube.com/watch?v=${videoId}`
    }
  };

  return (
    <div className={styles.videoContainer}>
      <div className={styles.videoWrapper}>
        <iframe
          className={styles.videoIframe}
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
      
      {title && <h3 className={styles.videoTitle}>{title}</h3>}
      {description && <p className={styles.videoDescription}>{description}</p>}
      
      {/* Add structured data for video */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
    </div>
  );
}
