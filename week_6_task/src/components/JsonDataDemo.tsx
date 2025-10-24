import React, { useState } from 'react';
import { api } from '../services/api';
import type { User, Post } from '../types';

// Component demonstrating JSON data fetching with async/await
const JsonDataDemo: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'posts'>('users');

  // Fetch users using async/await
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts using async/await
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getPosts();
      setPosts(data.slice(0, 10)); // Limit to 10 posts
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  // Create new post using JSON
  const createNewPost = async () => {
    setLoading(true);
    setError(null);
    try {
      const newPost = {
        title: 'My New Post',
        body: 'This is a post created using JSON and async/await',
        userId: 1
      };
      const created = await api.createPost(newPost);
      alert(`Post created with ID: ${created.id}`);
      setPosts([created, ...posts]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="demo-section">
      <h2>📄 JSON Data Fetching</h2>
      <p>Demonstrates fetching and working with JSON data from APIs</p>

      <div className="button-group">
        <button onClick={fetchUsers} disabled={loading}>
          Fetch Users (JSON)
        </button>
        <button onClick={fetchPosts} disabled={loading}>
          Fetch Posts (JSON)
        </button>
        <button onClick={createNewPost} disabled={loading}>
          Create Post (JSON)
        </button>
      </div>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">Error: {error}</div>}

      <div className="tabs">
        <button 
          className={activeTab === 'users' ? 'active' : ''} 
          onClick={() => setActiveTab('users')}
        >
          Users ({users.length})
        </button>
        <button 
          className={activeTab === 'posts' ? 'active' : ''} 
          onClick={() => setActiveTab('posts')}
        >
          Posts ({posts.length})
        </button>
      </div>

      <div className="data-display">
        {activeTab === 'users' && users.length > 0 && (
          <div className="users-list">
            {users.map(user => (
              <div key={user.id} className="card">
                <h4>{user.name}</h4>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Company:</strong> {user.company.name}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'posts' && posts.length > 0 && (
          <div className="posts-list">
            {posts.map(post => (
              <div key={post.id} className="card">
                <h4>{post.title}</h4>
                <p>{post.body}</p>
                <small>Post ID: {post.id} | User ID: {post.userId}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JsonDataDemo;
