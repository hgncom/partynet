import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Path to our comments JSON file
const commentsFilePath = path.join(process.cwd(), 'data', 'comments.json');

// Helper function to ensure the comments file exists
const ensureCommentsFile = () => {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    
    // Ensure data directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Ensure comments file exists
    if (!fs.existsSync(commentsFilePath)) {
      fs.writeFileSync(commentsFilePath, JSON.stringify({}), 'utf8');
    }
    return true;
  } catch (error) {
    console.error('Error ensuring comments file exists:', error);
    return false;
  }
};

// Helper to read comments
const getComments = () => {
  if (!ensureCommentsFile()) {
    console.warn('Could not ensure comments file exists, returning empty object');
    return {};
  }
  
  try {
    const fileContents = fs.readFileSync(commentsFilePath, 'utf8');
    // Handle empty file case
    if (!fileContents || fileContents.trim() === '') {
      return {};
    }
    
    try {
      return JSON.parse(fileContents);
    } catch (parseError) {
      console.error('Error parsing comments JSON:', parseError);
      // If JSON is invalid, return empty object rather than crashing
      return {};
    }
  } catch (error) {
    console.error('Error reading comments file:', error);
    return {};
  }
};

// Helper to write comments
const saveComments = (comments) => {
  if (!ensureCommentsFile()) {
    throw new Error('Could not ensure comments file exists');
  }
  
  try {
    // Validate that comments is a proper object before saving
    if (typeof comments !== 'object' || comments === null) {
      throw new Error('Invalid comments data structure');
    }
    
    // Format with pretty-printing for readability
    fs.writeFileSync(commentsFilePath, JSON.stringify(comments, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing to comments file:', error);
    throw new Error('Failed to save comment: ' + error.message);
  }
};

export default function handler(req, res) {
  // GET request - fetch comments for a post
  if (req.method === 'GET') {
    const { postId } = req.query;
    
    if (!postId) {
      return res.status(400).json({ message: 'Post ID is required' });
    }
    
    try {
      const allComments = getComments();
      
      // Ensure we have a valid object
      if (typeof allComments !== 'object' || allComments === null) {
        console.error('Invalid comments data structure returned from getComments()');
        return res.status(200).json([]);
      }
      
      // Get comments for this post, defaulting to empty array
      const postComments = Array.isArray(allComments[postId]) ? allComments[postId] : [];
      
      // Return approved comments only, sorted by date (newest first)
      const approvedComments = postComments
        .filter(comment => comment && comment.approved === true) // Explicitly check for true
        .sort((a, b) => {
          // Safely handle date comparison
          try {
            return new Date(b.date || 0) - new Date(a.date || 0);
          } catch (e) {
            return 0; // If dates can't be compared, don't change order
          }
        });
      
      return res.status(200).json(approvedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      // Return empty array instead of error to prevent client-side crashes
      return res.status(200).json([]);
    }
  }
  
  // POST request - add a new comment
  if (req.method === 'POST') {
    const { name, email, content, postId, date } = req.body;
    
    // Validate required fields
    if (!name || !email || !content || !postId) {
      return res.status(400).json({ message: 'Name, email, content, and postId are required' });
    }
    
    try {
      const allComments = getComments();
      
      // Create a new comment object
      const newComment = {
        id: uuidv4(),
        name,
        email,
        content,
        date: date || new Date().toISOString(),
        approved: false, // Comments require approval by default
      };
      
      // Initialize the post's comments array if it doesn't exist
      if (!allComments[postId]) {
        allComments[postId] = [];
      }
      
      // Add the new comment
      allComments[postId].push(newComment);
      
      // Save all comments
      saveComments(allComments);
      
      // Return the comment without the email for privacy
      const { email: _, ...commentWithoutEmail } = newComment;
      
      return res.status(201).json({
        ...commentWithoutEmail,
        message: 'Comment submitted successfully and is awaiting moderation',
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      return res.status(500).json({ message: 'Failed to add comment' });
    }
  }
  
  // Method not allowed for other HTTP methods
  return res.status(405).json({ message: 'Method not allowed' });
}
