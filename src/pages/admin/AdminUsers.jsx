import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Link } from 'react-router-dom';

const AdminUsers = () => {
    const { users, loading } = useAdmin();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter(user =>
        user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div style={{ color: 'var(--text-color)' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '30px', fontFamily: 'Oswald, sans-serif' }}>Users</h1>

            {/* Search Bar */}
            <div style={{ marginBottom: '30px' }}>
                <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '15px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '8px',
                        color: 'var(--text-color)',
                        fontSize: '1rem',
                        outline: 'none'
                    }}
                />
            </div>

            {/* Users Table */}
            <div style={{
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '16px',
                border: '1px solid var(--glass-border)',
                overflow: 'hidden'
            }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'left' }}>
                            <th style={{ padding: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>ID</th>
                            <th style={{ padding: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Name</th>
                            <th style={{ padding: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Email</th>
                            <th style={{ padding: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Role</th>
                            <th style={{ padding: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Joined</th>
                            <th style={{ padding: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map(user => (
                                <tr key={user.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                    <td style={{ padding: '20px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                                        {user.id.slice(0, 8)}...
                                    </td>
                                    <td style={{ padding: '20px', fontWeight: 'bold' }}>{user.full_name || 'N/A'}</td>
                                    <td style={{ padding: '20px' }}>{user.email}</td>
                                    <td style={{ padding: '20px' }}>
                                        <span style={{
                                            padding: '5px 10px',
                                            borderRadius: '20px',
                                            fontSize: '0.8rem',
                                            background: user.role === 'admin' ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                                            color: user.role === 'admin' ? '#ffd700' : '#fff'
                                        }}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td style={{ padding: '20px', color: 'var(--text-muted)' }}>
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </td>
                                    <td style={{ padding: '20px' }}>
                                        <Link
                                            to={`/admin/users/${user.id}`}
                                            style={{
                                                padding: '8px 16px',
                                                background: 'var(--accent-primary)',
                                                color: '#000',
                                                borderRadius: '6px',
                                                textDecoration: 'none',
                                                fontWeight: 'bold',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ padding: '50px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    No users found matching "{searchTerm}"
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
