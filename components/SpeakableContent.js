import React from 'react';

/**
 * SpeakableContent component for implementing speakable schema markup
 * This helps with voice search optimization and Google Assistant features
 */
export default function SpeakableContent({ 
  cssSelector = '#article-content', 
  speakableIntro,
  speakableSummary
}) {
  // Create the speakable schema
  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'speakable': {
      '@type': 'SpeakableSpecification',
      'cssSelector': [cssSelector]
    },
    'url': typeof window !== 'undefined' ? window.location.href : ''
  };
  
  // If specific speakable sections are provided, use them instead of CSS selector
  if (speakableIntro || speakableSummary) {
    const speakableParts = [];
    
    if (speakableIntro) {
      speakableParts.push({
        '@type': 'WebPageElement',
        'isAccessibleForFree': 'True',
        'cssSelector': '.speakable-intro',
        'text': speakableIntro
      });
    }
    
    if (speakableSummary) {
      speakableParts.push({
        '@type': 'WebPageElement',
        'isAccessibleForFree': 'True',
        'cssSelector': '.speakable-summary',
        'text': speakableSummary
      });
    }
    
    speakableSchema.speakable = speakableParts;
  }

  return (
    <>
      {speakableIntro && (
        <div className="speakable-intro" style={{ marginBottom: '1.5rem' }}>
          {speakableIntro}
        </div>
      )}
      
      {speakableSummary && (
        <div className="speakable-summary" style={{ marginTop: '1.5rem' }}>
          {speakableSummary}
        </div>
      )}
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
    </>
  );
}
