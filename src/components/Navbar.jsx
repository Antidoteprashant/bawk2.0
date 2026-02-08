import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

import { supabase } from '../supabase';

const Navbar = () => {
    const navRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { getCartCount } = useCart();
    const [user, setUser] = useState(null);

    useLayoutEffect(() => {
        // Auth Listener
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        // GSAP Animation
        const ctx = gsap.context(() => {
            gsap.from(navRef.current, {
                y: -100,
                opacity: 0,
                duration: 1,
                ease: "power4.out",
                delay: 0.5
            });
        }, navRef);
        return () => ctx.revert();
    }, []);

    const handleNavigation = (id, path) => {
        if (location.pathname !== path) {
            navigate(path);
            // If navigating to home with an anchor, we might need a delay or effect to scroll
            // For now, simpler is generic navigation. 
            // If we need to scroll to section after nav, we'd use a useEffect in Home.
            if (id && path === '/') {
                setTimeout(() => {
                    const element = document.getElementById(id);
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else {
            if (id) {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    };

    const navLinks = [
        { name: 'Home', id: 'hero', path: '/' },
        { name: 'Brief', id: 'details', path: '/' },
        { name: 'Categories', id: null, path: '/categories' }, // No ID, just route
        { name: 'Track Order', id: null, path: '/track-order' },
    ];

    return (
        <nav ref={navRef} style={{
            position: 'fixed',
            top: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            width: 'fit-content',
            minWidth: '650px',
            maxWidth: '95%',
            padding: '18px 40px',
            borderRadius: '100px',
            background: 'rgba(20, 20, 20, 0.7)', // Darker, premium glass base
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            gap: '30px'
        }}>
            {/* Logo / Brand */}
            <div
                onClick={() => handleNavigation('hero', '/')}
                style={{
                    cursor: 'pointer',
                    fontWeight: 800,
                    fontSize: '1.4rem',
                    color: '#fff',
                    letterSpacing: '-1px',
                    fontFamily: 'var(--font-heading)'
                }}>
                bawk.
            </div>

            {/* Links and Actions Container */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '35px' }}>

                {/* Navigation Links */}
                <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => handleNavigation(link.id, link.path)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: location.pathname === link.path && (!link.id || (link.id === 'hero' && window.scrollY < 500)) ? '#fff' : 'rgba(255,255,255,0.6)',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                fontWeight: 500,
                                transition: 'all 0.3s ease',
                                textTransform: 'uppercase',
                                letterSpacing: '1.5px',
                                position: 'relative'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.color = '#fff';
                                e.target.style.textShadow = '0 0 10px rgba(255,255,255,0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = location.pathname === link.path ? '#fff' : 'rgba(255,255,255,0.6)';
                                e.target.style.textShadow = 'none';
                            }}
                        >
                            {link.name}
                        </button>
                    ))}
                </div>

                <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)' }}></div>

                {/* Right Side Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                    {/* Cart Badge */}
                    <div
                        style={{ position: 'relative', cursor: 'pointer' }}
                        onClick={() => navigate('/cart')}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ color: '#fff', transition: 'transform 0.2s', filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.2))' }}
                        >
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                        {getCartCount() > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-6px',
                                right: '-8px',
                                background: '#fff',
                                color: '#000',
                                borderRadius: '50%',
                                width: '16px',
                                height: '16px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '0.65rem',
                                fontWeight: '900',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                            }}>
                                {getCartCount()}
                            </span>
                        )}
                    </div>

                    {/* User Info / Logout */}
                    {user ? (
                        <button
                            onClick={async () => {
                                await supabase.auth.signOut();
                                navigate('/');
                            }}
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: '#fff',
                                padding: '6px 16px',
                                borderRadius: '30px',
                                cursor: 'pointer',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                letterSpacing: '0.5px',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(255,255,255,0.15)';
                                e.target.style.borderColor = '#fff';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'rgba(255,255,255,0.05)';
                                e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                            }}
                        >
                            LOGOUT
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            style={{
                                background: '#fff',
                                border: 'none',
                                color: '#000',
                                padding: '8px 20px',
                                borderRadius: '30px',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                fontWeight: '800',
                                transition: 'all 0.3s ease',
                                letterSpacing: '0.5px',
                                boxShadow: '0 0 20px rgba(255,255,255,0.2)'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'scale(1.05)';
                                e.target.style.boxShadow = '0 0 25px rgba(255,255,255,0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'scale(1)';
                                e.target.style.boxShadow = '0 0 20px rgba(255,255,255,0.2)';
                            }}
                        >
                            LOGIN
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
