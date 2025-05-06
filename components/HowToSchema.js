import React from 'react';
import styles from '../styles/how-to-schema.module.css';

/**
 * HowToSchema component for step-by-step instructions with structured data
 * Improves chances of getting rich snippets for tutorials and recipes
 */
export default function HowToSchema({
  title,
  description,
  image,
  totalTime = "PT2H", // ISO 8601 duration format
  estimatedCost = {
    currency: "USD",
    value: "50"
  },
  supply = [],
  tool = [],
  steps = [],
  yield: recipeYield
}) {
  if (!steps || steps.length === 0) return null;
  
  // Create the HowTo schema
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description: description,
    image: image,
    totalTime: totalTime,
    estimatedCost: {
      '@type': 'MonetaryAmount',
      ...estimatedCost
    },
    supply: supply.map(item => ({
      '@type': 'HowToSupply',
      name: item
    })),
    tool: tool.map(item => ({
      '@type': 'HowToTool',
      name: item
    })),
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      url: `#step-${index + 1}`,
      name: step.title || `Step ${index + 1}`,
      itemListElement: {
        '@type': 'HowToDirection',
        text: step.directions
      },
      image: step.image
    }))
  };
  
  // Add yield for recipes
  if (recipeYield) {
    howToSchema.recipeYield = recipeYield;
  }
  
  return (
    <div className={styles.howToContainer}>
      <h2 className={styles.howToTitle}>{title}</h2>
      
      {description && <p className={styles.howToDescription}>{description}</p>}
      
      {/* Materials and Tools */}
      <div className={styles.materialsToolsContainer}>
        {supply.length > 0 && (
          <div className={styles.materialsContainer}>
            <h3 className={styles.sectionTitle}>Materials Needed:</h3>
            <ul className={styles.materialsList}>
              {supply.map((item, index) => (
                <li key={`supply-${index}`} className={styles.materialItem}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        
        {tool.length > 0 && (
          <div className={styles.toolsContainer}>
            <h3 className={styles.sectionTitle}>Tools Needed:</h3>
            <ul className={styles.toolsList}>
              {tool.map((item, index) => (
                <li key={`tool-${index}`} className={styles.toolItem}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Steps */}
      <div className={styles.stepsContainer}>
        <h3 className={styles.sectionTitle}>Instructions:</h3>
        <ol className={styles.stepsList}>
          {steps.map((step, index) => (
            <li key={`step-${index}`} id={`step-${index + 1}`} className={styles.stepItem}>
              {step.title && <h4 className={styles.stepTitle}>{step.title}</h4>}
              <div className={styles.stepContent}>
                {step.image && (
                  <div className={styles.stepImageContainer}>
                    <img 
                      src={step.image} 
                      alt={step.title || `Step ${index + 1}`} 
                      className={styles.stepImage}
                    />
                  </div>
                )}
                <div 
                  className={styles.stepDirections}
                  dangerouslySetInnerHTML={{ __html: step.directions }}
                />
              </div>
            </li>
          ))}
        </ol>
      </div>
      
      {/* Add structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </div>
  );
}
