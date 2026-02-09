import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
    const navigate = useNavigate();

    const sidebarStyle = {
        width: '280px', // Wider sidebar
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid var(--glass-border)',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0
    };

    const contentStyle = {
        marginLeft: '280px', // Match new sidebar width
        padding: '50px',
        width: '100%',
        minHeight: '100vh',
        background: 'var(--bg-color)'
    };

    const linkStyle = ({ isActive }) => ({
        display: 'block',
        padding: '16px 20px', // Larger click area
        marginBottom: '10px',
        textDecoration: 'none',
        color: isActive ? '#000' : 'var(--text-muted)',
        background: isActive ? 'var(--accent-primary)' : 'transparent',
        borderRadius: '12px',
        fontWeight: isActive ? 'bold' : 'normal',
        transition: 'all 0.3s ease',
        fontSize: '1.1rem' // Larger text
    });

    return (
        <div style={{ display: 'flex' }}>
            {/* Sidebar */}
            <aside style={sidebarStyle}>
                <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#fff',
                    marginBottom: '40px',
                    letterSpacing: '-1px'
                }}>
                    bawk<span style={{ color: 'var(--accent-primary)' }}>.admin</span>
                </div>

                <nav style={{ flex: 1 }}>
                    <NavLink to="/admin" end style={linkStyle}>Dashboard</NavLink>
                    <NavLink to="/admin/orders" style={linkStyle}>Orders</NavLink>
                    <NavLink to="/admin/products" style={linkStyle}>Products</NavLink>
                    <NavLink to="/admin/categories" style={linkStyle}>Categories</NavLink>
                    <NavLink to="/admin/analytics" style={linkStyle}>Analytics</NavLink>
                </nav>

                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a
                        href="/"
                        target="_blank"
                        style={{
                            padding: '12px',
                            background: 'var(--accent-primary)',
                            color: '#000',
                            border: 'none',
                            borderRadius: '8px',
                            textAlign: 'center',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg> View Live Site
                    </a>

                    <button
                        onClick={() => navigate('/')}
                        style={{
                            padding: '12px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid var(--glass-border)',
                            color: '#fff',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={contentStyle}>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
