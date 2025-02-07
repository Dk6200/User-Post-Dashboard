// app/page.js (Next.js 13+ with App Router)
import { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Home.css';

export default function Home() {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => setUsers(res.data))
            .catch(err => setError('Failed to fetch users'))
            .finally(() => setLoading(false));
    }, []);

    const fetchPosts = (userId) => {
        setLoading(true);
        setSelectedUser(userId);
        axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then(res => setPosts(res.data))
            .catch(err => setError('Failed to fetch posts'))
            .finally(() => setLoading(false));
    };

    return (
        <div className="container">
            <div className="sidebar">
                <h2>Users</h2>
                {loading && <p className="loading">Loading...</p>}
                {error && <p className="error">{error}</p>}
                {users.map(user => (
                    <div key={user.id} className="user-card" onClick={() => fetchPosts(user.id)}>
                        <h4>{user.name}</h4>
                        <p>{user.email}</p>
                    </div>
                ))}
            </div>
            <div className="content">
                <h2>Posts</h2>
                {selectedUser ? (
                    loading ? <p className="loading">Loading posts...</p> : posts.length ? (
                        posts.map(post => (
                            <div key={post.id} className="post-card">
                                <h3 className="post-title">{post.title}</h3>
                                <p className="post-body">{post.body}</p>
                            </div>
                        ))
                    ) : <p className="no-posts">No posts available</p>
                ) : <p className="no-posts">Select a user to view posts</p>}
            </div>
        </div>
    );
}
