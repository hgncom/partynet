import React, { useState, useEffect } from 'react';
import styles from './Comments.module.css';
import { formatDistanceToNow } from 'date-fns';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', email: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showComments, setShowComments] = useState(true);

  // Fetch comments for this post
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments?postId=${postId}`);
        
        // Even if the response is not OK, we'll handle it gracefully
        // This could happen if the comments file doesn't exist yet
        if (!response.ok) {
          console.warn('Comments API returned non-OK response:', response.status);
          setComments([]);
          return;
        }
        
        const data = await response.json();
        setComments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching comments:', err);
        // Set empty array on error instead of leaving comments undefined
        setComments([]);
      }
    };

    fetchComments();
  }, [postId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    // Basic validation
    if (!newComment.name.trim() || !newComment.email.trim() || !newComment.content.trim()) {
      setError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newComment.email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }
    
    // Content length validation
    if (newComment.content.trim().length < 3) {
      setError('Your comment is too short');
      setIsSubmitting(false);
      return;
    }
    
    if (newComment.content.trim().length > 2000) {
      setError('Your comment is too long (maximum 2000 characters)');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newComment,
          postId,
          date: new Date().toISOString(),
        }),
      });
      
      let responseData;
      try {
        responseData = await response.json();
      } catch (jsonError) {
        console.error('Error parsing response JSON:', jsonError);
        throw new Error('Failed to parse server response');
      }
      
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to submit comment');
      }

      // For display purposes, create a pending comment object
      const pendingComment = {
        ...responseData,
        isPending: true
      };
      
      // Add the new comment to the list
      setComments(prev => [pendingComment, ...prev]);
      
      // Reset the form
      setNewComment({ name: '', email: '', content: '' });
      setSuccess('Your comment has been submitted and is awaiting moderation.');
      
    } catch (err) {
      setError(err.message || 'An error occurred while submitting your comment. Please try again.');
      console.error('Error submitting comment:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleComments = () => {
    setShowComments(prev => !prev);
  };

  return (
    <section className={styles.commentsSection} itemScope itemType="https://schema.org/Comment">
      <h2 className={styles.commentsHeading}>
        <button 
          onClick={toggleComments} 
          className={styles.toggleButton}
          aria-expanded={showComments}
        >
          Comments ({comments.length}) {showComments ? '▼' : '►'}
        </button>
      </h2>
      
      {showComments && (
        <>
          <form onSubmit={handleSubmit} className={styles.commentForm}>
            <h3 className={styles.formHeading}>Leave a Comment</h3>
            
            {error && <div className={styles.errorMessage}>{error}</div>}
            {success && <div className={styles.successMessage}>{success}</div>}
            
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newComment.name}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email * (will not be published)</label>
              <input
                type="email"
                id="email"
                name="email"
                value={newComment.email}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="content" className={styles.label}>Comment *</label>
              <textarea
                id="content"
                name="content"
                value={newComment.content}
                onChange={handleInputChange}
                className={styles.textarea}
                rows="4"
                required
              />
            </div>
            
            <div className={styles.formDisclaimer}>
              <p>Your email address will not be published. Required fields are marked with *</p>
              <p>By submitting this comment, you agree to our <a href="/privacy-policy">Privacy Policy</a>.</p>
            </div>
            
            <button 
              type="submit" 
              className={styles.submitButton} 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Post Comment'}
            </button>
          </form>
          
          <div className={styles.commentsList}>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div 
                  key={comment.id || index} 
                  className={`${styles.commentItem} ${comment.isPending ? styles.pendingComment : ''}`} 
                  itemProp="comment"
                >
                  {comment.isPending && (
                    <div className={styles.pendingBadge}>Awaiting Approval</div>
                  )}
                  <div className={styles.commentHeader}>
                    <span className={styles.commentAuthor} itemProp="author">{comment.name}</span>
                    <span className={styles.commentDate} itemProp="dateCreated">
                      {comment.date ? formatDistanceToNow(new Date(comment.date), { addSuffix: true }) : 'Just now'}
                    </span>
                  </div>
                  <div className={styles.commentContent} itemProp="text">
                    {comment.content}
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noComments}>Be the first to comment on this article!</p>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Comments;
