/**
 * API endpoint to fetch and extract schema markup from a URL
 * This handles CORS issues when fetching external URLs from the browser
 */
export default async function handler(req, res) {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }
  
  try {
    // Validate URL format
    const validUrl = new URL(url);
    
    // Fetch the HTML content from the URL
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Party.net Schema Validator/1.0'
      }
    });
    
    if (!response.ok) {
      return res.status(response.status).json({ 
        error: `Failed to fetch URL: ${response.statusText}` 
      });
    }
    
    const html = await response.text();
    
    // Extract JSON-LD schema from HTML
    const schemaRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
    const schemas = [];
    let match;
    
    while ((match = schemaRegex.exec(html)) !== null) {
      try {
        const schemaJson = JSON.parse(match[1]);
        schemas.push(schemaJson);
      } catch (parseError) {
        console.error('Error parsing schema:', parseError);
      }
    }
    
    if (schemas.length === 0) {
      return res.status(200).json({ 
        message: 'No JSON-LD schema found on this page',
        schemas: [] 
      });
    }
    
    return res.status(200).json({ schemas });
  } catch (error) {
    console.error('Error in fetch-schema API:', error);
    return res.status(500).json({ error: error.message });
  }
}
