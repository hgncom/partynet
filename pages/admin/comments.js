import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import styles from '../../styles/admin-comments.module.css';

export default function AdminComments() {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Fetch comments when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchComments();
    }
  }, [isAuthenticated]);

  const fetchComments = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/admin/comments', {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      
      const data = await response.json();
      setComments(data);
    } catch (err) {
      console.error('Error fetching comments:', err);
      setError('Failed to load comments. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setIsAuthenticated(true);
    } else {
      setError('Please enter an API key');
    }
  };

  const handleApprove = async (commentId, postId) => {
    try {
      const response = await fetch('/api/admin/comments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          commentId,
          postId,
          approved: true
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to approve comment');
      }
      
      // Update local state
      setComments(prevComments => 
        prevComments.map(comment => 
          comment.id === commentId && comment.postId === postId 
            ? { ...comment, approved: true } 
            : comment
        )
      );
    } catch (err) {
      console.error('Error approving comment:', err);
      setError('Failed to approve comment');
    }
  };

  const handleReject = async (commentId, postId) => {
    try {
      const response = await fetch('/api/admin/comments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          commentId,
          postId,
          approved: false
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to reject comment');
      }
      
      // Update local state
      setComments(prevComments => 
        prevComments.map(comment => 
          comment.id === commentId && comment.postId === postId 
            ? { ...comment, approved: false } 
            : comment
        )
      );
    } catch (err) {
      console.error('Error rejecting comment:', err);
      setError('Failed to reject comment');
    }
  };

  const handleDelete = async (commentId, postId) => {
    if (!confirm('Are you sure you want to delete this comment? This action cannot be undone.')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/comments?commentId=${commentId}&postId=${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }
      
      // Update local state
      setComments(prevComments => 
        prevComments.filter(comment => 
          !(comment.id === commentId && comment.postId === postId)
        )
      );
    } catch (err) {
      console.error('Error deleting comment:', err);
      setError('Failed to delete comment');
    }
  };

  return (
    <Layout>
      <Head>
        <title>Comment Moderation | Party.net Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <div className={styles.adminContainer}>
        <h1 className={styles.heading}>Comment Moderation</h1>
        
        {!isAuthenticated ? (
          <div className={styles.authForm}>
            <h2>Authentication Required</h2>
            {error && <div className={styles.error}>{error}</div>}
            <form onSubmit={handleLogin}>
              <div className={styles.formGroup}>
                <label htmlFor="apiKey">Admin API Key</label>
                <input
                  type="password"
                  id="apiKey"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className={styles.input}
                  placeholder="Enter your admin API key"
                  required
                />
              </div>
              <button type="submit" className={styles.button}>Login</button>
            </form>
          </div>
        ) : (
          <div className={styles.commentsSection}>
            {error && <div className={styles.error}>{error}</div>}
            
            <div className={styles.controls}>
              <button 
                onClick={fetchComments} 
                className={styles.refreshButton}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Refresh Comments'}
              </button>
              <button 
                onClick={() => setIsAuthenticated(false)} 
                className={styles.logoutButton}
              >
                Logout
              </button>
            </div>
            
            {isLoading ? (
              <div className={styles.loading}>Loading comments...</div>
            ) : comments.length > 0 ? (
              <div className={styles.commentsList}>
                <div className={styles.statsBar}>
                  <span>Total Comments: {comments.length}</span>
                  <span>Pending: {comments.filter(c => !c.approved).length}</span>
                  <span>Approved: {comments.filter(c => c.approved).length}</span>
                </div>
                
                <h2>Pending Comments</h2>
                {comments.filter(c => !c.approved).length > 0 ? (
                  comments
                    .filter(c => !c.approved)
                    .map(comment => (
                      <div key={comment.id} className={styles.commentCard}>
                        <div className={styles.commentMeta}>
                          <span className={styles.commentAuthor}>{comment.name}</span>
                          <span className={styles.commentEmail}>{comment.email}</span>
                          <span className={styles.commentDate}>
                            {new Date(comment.date).toLocaleString()}
                          </span>
                          <Link 
                            href={`/posts/${comment.postId}`}
                            className={styles.postLink}
                            target="_blank"
                          >
                            View Post
                          </Link>
                        </div>
                        <div className={styles.commentContent}>{comment.content}</div>
                        <div className={styles.actionButtons}>
                          <button 
                            onClick={() => handleApprove(comment.id, comment.postId)}
                            className={styles.approveButton}
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleReject(comment.id, comment.postId)}
                            className={styles.rejectButton}
                          >
                            Reject
                          </button>
                          <button 
                            onClick={() => handleDelete(comment.id, comment.postId)}
                            className={styles.deleteButton}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className={styles.noComments}>No pending comments</p>
                )}
                
                <h2>Approved Comments</h2>
                {comments.filter(c => c.approved).length > 0 ? (
                  comments
                    .filter(c => c.approved)
                    .map(comment => (
                      <div key={comment.id} className={styles.commentCard}>
                        <div className={styles.commentMeta}>
                          <span className={styles.commentAuthor}>{comment.name}</span>
                          <span className={styles.commentEmail}>{comment.email}</span>
                          <span className={styles.commentDate}>
                            {new Date(comment.date).toLocaleString()}
                          </span>
                          <Link 
                            href={`/posts/${comment.postId}`}
                            className={styles.postLink}
                            target="_blank"
                          >
                            View Post
                          </Link>
                        </div>
                        <div className={styles.commentContent}>{comment.content}</div>
                        <div className={styles.actionButtons}>
                          <button 
                            onClick={() => handleReject(comment.id, comment.postId)}
                            className={styles.rejectButton}
                          >
                            Unapprove
                          </button>
                          <button 
                            onClick={() => handleDelete(comment.id, comment.postId)}
                            className={styles.deleteButton}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className={styles.noComments}>No approved comments</p>
                )}
              </div>
            ) : (
              <div className={styles.noComments}>No comments found</div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
