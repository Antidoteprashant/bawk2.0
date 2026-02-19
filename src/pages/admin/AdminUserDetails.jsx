import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';

const AdminUserDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                // Fetch User Details
                const { data: userData, error: userError } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (userError) throw userError;
                setUser(userData);

                // Fetch User Orders by Email
                // Note: Orders table currently lacks user_id, so linking by email
                if (userData?.email) {
                    const { data: orderData, error: orderError } = await supabase
                        .from('orders')
                        .select('*')
                        .eq('email', userData.email)
                        .order('created_at', { ascending: false });

                    if (orderError) throw orderError;
                    setOrders(orderData || []);
                }

            } catch (error) {
                console.error("Error fetching user details:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [id]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div style={{ padding: '50px', textAlign: 'center', color: 'var(--text-color)' }}>
                <h2>User not found</h2>
                <button onClick={() => navigate('/admin/users')} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>Go Back</button>
            </div>
        );
    }

    return (
        <div style={{ color: 'var(--text-color)', maxWidth: '1200px', margin: '0 auto' }}>
            <button
                onClick={() => navigate('/admin/users')}
                style={{
                    marginBottom: '20px',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '1rem'
                }}
            >
                ← Back to Users
            </button>

            {/* User Profile Header */}
            <div style={{
                background: 'rgba(255,255,255,0.05)',
                padding: '30px',
                borderRadius: '16px',
                marginBottom: '30px',
                border: '1px solid var(--glass-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '30px'
            }}>
                <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--accent-primary), #000)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: '#fff'
                }}>
                    {user.full_name ? user.full_name.charAt(0) : user.email.charAt(0)}
                </div>
                <div>
                    <h1 style={{ fontSize: '2rem', margin: '0 0 10px 0', fontFamily: 'Oswald, sans-serif' }}>{user.full_name || 'No Name'}</h1>
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '10px 30px', color: 'var(--text-muted)' }}>
                        <div><strong>Email:</strong> {user.email}</div>
                        <div><strong>Role:</strong> {user.role}</div>
                        <div><strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}</div>
                        <div><strong>ID:</strong> <span style={{ fontFamily: 'monospace' }}>{user.id}</span></div>
                    </div>
                </div>
            </div>

            {/* Recent Orders Section */}
            <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', fontFamily: 'Oswald, sans-serif' }}>Order History</h2>
            <div style={{
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '16px',
                border: '1px solid var(--glass-border)',
                overflow: 'hidden'
            }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'left' }}>
                            <th style={{ padding: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Order ID</th>
                            <th style={{ padding: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Date</th>
                            <th style={{ padding: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Status</th>
                            <th style={{ padding: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Total</th>
                            <th style={{ padding: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Items</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map(order => (
                                <tr key={order.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                    <td style={{ padding: '20px', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                                        {order.id.slice(0, 8)}...
                                    </td>
                                    <td style={{ padding: '20px', color: 'var(--text-muted)' }}>
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </td>
                                    <td style={{ padding: '20px' }}>
                                        <span style={{
                                            padding: '5px 10px',
                                            borderRadius: '20px',
                                            fontSize: '0.8rem',
                                            background: order.status === 'Completed' ? 'rgba(0, 255, 0, 0.2)' :
                                                order.status === 'Pending' ? 'rgba(255, 165, 0, 0.2)' :
                                                    'rgba(255, 255, 255, 0.1)',
                                            color: order.status === 'Completed' ? '#0f0' :
                                                order.status === 'Pending' ? 'orange' : '#fff'
                                        }}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '20px', fontWeight: 'bold' }}>
                                        ₹{parseFloat(order.total_amount).toLocaleString()}
                                    </td>
                                    <td style={{ padding: '20px', color: 'var(--text-muted)' }}>
                                        {order.items?.length || 0} items
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ padding: '50px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    No orders found for this user.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Ads / Activity (Placeholder) */}
            <div style={{ marginTop: '40px', padding: '30px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed var(--glass-border)', textAlign: 'center', color: 'var(--text-muted)' }}>
                <h3 style={{ marginBottom: '10px' }}>User Activity & Ads</h3>
                <p>Detailed activity tracking and user-created advertisements integration coming soon.</p>
            </div>
        </div>
    );
};

export default AdminUserDetails;
