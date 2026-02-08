import React from 'react';

const Footer = () => {

    return (
        <footer style={{
            backgroundColor: 'var(--bg-color)',
            color: 'var(--text-main)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '80px 5% 40px',
            fontFamily: 'var(--font-body)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Glow Effect */}
            <div style={{
                position: 'absolute',
                top: '0',
                left: '20%',
                width: '60%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                opacity: 0.5
            }} />

            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '60px',
                marginBottom: '80px'
            }}>
                {/* Brand Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    <div style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '2rem',
                        fontWeight: '800',
                        letterSpacing: '-1px',
                        background: 'linear-gradient(to right, #fff, #888)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        width: 'fit-content'
                    }}>
                        bawk.
                    </div>
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.95rem',
                        lineHeight: '1.6',
                        maxWidth: '300px'
                    }}>
                        Elevating your digital lifestyle with premium curated goods.
                        Designed for those who appreciate the finer details.
                    </p>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        {['Instagram', 'Twitter', 'LinkedIn'].map((social) => (
                            <a key={social} href="#" style={{
                                color: 'var(--text-main)',
                                opacity: 0.6,
                                transition: 'all 0.3s ease',
                                fontSize: '0.9rem',
                                textDecoration: 'none',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                fontSize: '0.75rem',
                                border: '1px solid rgba(255,255,255,0.2)',
                                padding: '8px 16px',
                                borderRadius: '20px'
                            }}
                                onMouseEnter={(e) => {
                                    e.target.style.opacity = '1';
                                    e.target.style.borderColor = '#fff';
                                    e.target.style.background = 'rgba(255,255,255,0.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.opacity = '0.6';
                                    e.target.style.borderColor = 'rgba(255,255,255,0.2)';
                                    e.target.style.background = 'transparent';
                                }}>
                                {social}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Shop Column */}
                <div>
                    <h4 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1rem',
                        fontWeight: '600',
                        letterSpacing: '1.5px',
                        marginBottom: '30px',
                        textTransform: 'uppercase',
                        color: 'var(--text-main)'
                    }}>Shop</h4>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {['All Products', 'New Arrivals', 'Best Sellers', 'Accessories'].map((item) => (
                            <li key={item}>
                                <a href="#" style={{
                                    color: 'var(--text-muted)',
                                    textDecoration: 'none',
                                    fontSize: '0.95rem',
                                    transition: 'all 0.3s ease',
                                    display: 'inline-block'
                                }}
                                    onMouseEnter={(e) => {
                                        e.target.style.color = 'var(--text-main)';
                                        e.target.style.transform = 'translateX(5px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = 'var(--text-muted)';
                                        e.target.style.transform = 'translateX(0)';
                                    }}>
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Support Column */}
                <div>
                    <h4 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1rem',
                        fontWeight: '600',
                        letterSpacing: '1.5px',
                        marginBottom: '30px',
                        textTransform: 'uppercase',
                        color: 'var(--text-main)'
                    }}>Support</h4>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {['Help Center', 'Shipping & Returns', 'Privacy Policy', 'Terms of Service'].map((item) => (
                            <li key={item}>
                                <a href="#" style={{
                                    color: 'var(--text-muted)',
                                    textDecoration: 'none',
                                    fontSize: '0.95rem',
                                    transition: 'all 0.3s ease',
                                    display: 'inline-block'
                                }}
                                    onMouseEnter={(e) => {
                                        e.target.style.color = 'var(--text-main)';
                                        e.target.style.transform = 'translateX(5px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = 'var(--text-muted)';
                                        e.target.style.transform = 'translateX(0)';
                                    }}>
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Newsletter Column */}
                <div>
                    <h4 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1rem',
                        fontWeight: '600',
                        letterSpacing: '1.5px',
                        marginBottom: '20px',
                        textTransform: 'uppercase',
                        color: 'var(--text-main)'
                    }}>Stay in the loop</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '25px', lineHeight: '1.5' }}>
                        Subscribe to receive exclusive offers and updates.
                    </p>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="email"
                            placeholder="Email address"
                            style={{
                                width: '100%',
                                padding: '15px 50px 15px 20px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '4px',
                                color: '#fff',
                                outline: 'none',
                                transition: 'all 0.3s ease',
                                fontSize: '0.95rem'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.4)'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                        <button style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'transparent',
                            border: 'none',
                            color: '#fff',
                            cursor: 'pointer',
                            fontSize: '1.2rem',
                            padding: '5px',
                            transition: 'transform 0.3s ease'
                        }}
                            onMouseEnter={(e) => e.target.style.transform = 'translateY(-50%) translateX(3px)'}
                            onMouseLeave={(e) => e.target.style.transform = 'translateY(-50%) translateX(0)'}
                        >
                            →
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div style={{
                borderTop: '1px solid rgba(255,255,255,0.05)',
                paddingTop: '40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
                <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem',
                    margin: 0
                }}>
                    © {new Date().getFullYear()} BAWK. All rights reserved.
                </p>

                {/* Payment Methods Placeholder */}
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    {['VISA', 'AMEX', 'PAYPAL', 'MASTERCARD'].map(method => (
                        <span key={method} style={{
                            fontSize: '0.7rem',
                            fontWeight: '700',
                            color: 'var(--text-muted)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            letterSpacing: '1px'
                        }}>
                            {method}
                        </span>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
