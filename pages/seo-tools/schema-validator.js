import { useState } from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import CanonicalUrl from '../../components/CanonicalUrl';
import styles from '../../styles/schema-validator.module.css';

export default function SchemaValidator() {
  const [url, setUrl] = useState('');
  const [schemaData, setSchemaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const validateSchema = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSchemaData(null);
    
    try {
      // Use a CORS proxy if needed
      const response = await fetch(`/api/fetch-schema?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
      } else if (data.schemas && data.schemas.length > 0) {
        setSchemaData(data.schemas);
      } else {
        setError('No JSON-LD schema found on this page.');
      }
    } catch (fetchError) {
      setError(`Error fetching URL: ${fetchError.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout>
      <Head>
        <title>Schema Markup Validator | Party.net</title>
        <meta name="description" content="Test and validate your schema markup for SEO" />
        <meta name="robots" content="noindex" />
      </Head>
      <CanonicalUrl />
      
      <div className={styles.container}>
        <h1 className={styles.title}>Schema Markup Validator</h1>
        <p className={styles.description}>
          Enter a URL to validate its schema markup. This tool will extract and display any JSON-LD schema found on the page.
        </p>
        
        <form onSubmit={validateSchema} className={styles.form}>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL (e.g., https://partynet.netlify.app/posts/ultimate-birthday-party-planning-guide)"
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Validating...' : 'Validate Schema'}
          </button>
        </form>
        
        {error && (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        )}
        
        {schemaData && (
          <div className={styles.results}>
            <h2>Found {schemaData.length} Schema Markup{schemaData.length !== 1 ? 's' : ''}</h2>
            
            {schemaData.map((schema, index) => (
              <div key={index} className={styles.schemaItem}>
                <h3>Schema #{index + 1}: {schema['@type'] || 'Unknown Type'}</h3>
                <pre className={styles.codeBlock}>
                  <code>{JSON.stringify(schema, null, 2)}</code>
                </pre>
              </div>
            ))}
            
            <div className={styles.validationLinks}>
              <h3>Additional Validation</h3>
              <p>For more thorough validation, try these tools:</p>
              <ul>
                <li>
                  <a 
                    href="https://validator.schema.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Schema.org Validator
                  </a>
                </li>
                <li>
                  <a 
                    href="https://search.google.com/test/rich-results" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Google Rich Results Test
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
