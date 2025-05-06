import fs from 'fs';
import path from 'path';

// Path to our comments JSON file
const commentsFilePath = path.join(process.cwd(), 'data', 'comments.json');

// Helper function to ensure the comments file exists
const ensureCommentsFile = () => {
  const dataDir = path.join(process.cwd(), 'data');
  
  // Ensure data directory exists
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // Ensure comments file exists
  if (!fs.existsSync(commentsFilePath)) {
    fs.writeFileSync(commentsFilePath, JSON.stringify({}), 'utf8');
  }
};

// Helper to read comments
const getComments = () => {
  ensureCommentsFile();
  try {
    const fileContents = fs.readFileSync(commentsFilePath, 'utf8');
    return JSON.parse(fileContents || '{}');
  } catch (error) {
    console.error('Error reading comments file:', error);
    return {};
  }
};

// Helper to write comments
const saveComments = (comments) => {
  ensureCommentsFile();
  try {
    fs.writeFileSync(commentsFilePath, JSON.stringify(comments, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing to comments file:', error);
    throw new Error('Failed to save comments');
  }
};

export default function handler(req, res) {
  // Basic auth check - in a real app, use a proper authentication system
  const { authorization } = req.headers;
  
  if (!authorization || authorization !== `Bearer ${process.env.ADMIN_API_KEY}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  // GET request - fetch all comments (including unapproved)
  if (req.method === 'GET') {
    try {
      const allComments = getComments();
      
      // Format comments for admin view
      const formattedComments = Object.entries(allComments).flatMap(([postId, comments]) => 
        comments.map(comment => ({
          ...comment,
          postId
        }))
      ).sort((a, b) => new Date(b.date) - new Date(a.date));
      
      return res.status(200).json(formattedComments);
    } catch (error) {
      console.error('Error fetching comments for admin:', error);
      return res.status(500).json({ message: 'Failed to fetch comments' });
    }
  }
  
  // PUT request - approve/reject a comment
  if (req.method === 'PUT') {
    const { commentId, postId, approved } = req.body;
    
    if (!commentId || !postId || approved === undefined) {
      return res.status(400).json({ message: 'Comment ID, post ID, and approval status are required' });
    }
    
    try {
      const allComments = getComments();
      
      // Check if the post and comment exist
      if (!allComments[postId]) {
        return res.status(404).json({ message: 'Post not found' });
      }
      
      const commentIndex = allComments[postId].findIndex(c => c.id === commentId);
      
      if (commentIndex === -1) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      
      // Update the comment's approval status
      allComments[postId][commentIndex].approved = approved;
      
      // Save the updated comments
      saveComments(allComments);
      
      return res.status(200).json({ message: `Comment ${approved ? 'approved' : 'rejected'} successfully` });
    } catch (error) {
      console.error('Error updating comment approval:', error);
      return res.status(500).json({ message: 'Failed to update comment' });
    }
  }
  
  // DELETE request - delete a comment
  if (req.method === 'DELETE') {
    const { commentId, postId } = req.query;
    
    if (!commentId || !postId) {
      return res.status(400).json({ message: 'Comment ID and post ID are required' });
    }
    
    try {
      const allComments = getComments();
      
      // Check if the post and comment exist
      if (!allComments[postId]) {
        return res.status(404).json({ message: 'Post not found' });
      }
      
      const commentIndex = allComments[postId].findIndex(c => c.id === commentId);
      
      if (commentIndex === -1) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      
      // Remove the comment
      allComments[postId].splice(commentIndex, 1);
      
      // If no comments left for this post, clean up the entry
      if (allComments[postId].length === 0) {
        delete allComments[postId];
      }
      
      // Save the updated comments
      saveComments(allComments);
      
      return res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.error('Error deleting comment:', error);
      return res.status(500).json({ message: 'Failed to delete comment' });
    }
  }
  
  // Method not allowed for other HTTP methods
  return res.status(405).json({ message: 'Method not allowed' });
}
