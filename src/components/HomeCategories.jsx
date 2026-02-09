import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const HomeCategories = () => {
    const { categories } = useAdmin();
    const container = useRef(null);
    const scrollContainer = useRef(null);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (categories.length === 0) return;

        let ctx = gsap.context(() => {
            gsap.from('.home-category-card', {
                x: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 80%"
                }
            });
        }, container);

        return () => ctx.revert();
    }, [categories]);

    if (categories.length === 0) return null;

    return (
        <section ref={container} style={{
            padding: '80px 0',
            background: 'var(--bg-color)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                marginBottom: '40px',
                textAlign: 'left',
                paddingLeft: '20px', // Align with scroll container padding
                paddingRight: '20px',
                textTransform: 'uppercase',
                letterSpacing: '-1px',
                color: '#fff',
                maxWidth: '1400px',
                margin: '0 auto 40px auto'
            }}>
                Categories
            </h2>

            {/* Horizontal Scroll Container */}
            <div ref={scrollContainer} className="hide-scrollbar" style={{
                display: 'flex',
                gap: '20px',
                overflowX: 'auto',
                padding: '0 20px 40px 20px', // Bottom padding for shadow/hover space
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
            }}>
                {categories.map((cat, i) => (
                    <div key={cat.id} className="home-category-card glass-panel" style={{
                        minWidth: '280px',
                        width: '300px',
                        height: '450px', // Tall portrait cards for showcase feel
                        flexShrink: 0,
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        borderRadius: '20px',
                        scrollSnapAlign: 'start',
                        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                    }}
                        onClick={() => navigate(`/categories/${cat.slug || cat.id}`)}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-10px)';
                            e.currentTarget.style.boxShadow = `0 20px 40px rgba(255, 255, 255, 0.15)`;
                            e.currentTarget.querySelector('.cat-bg').style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.querySelector('.cat-bg').style.transform = 'scale(1)';
                        }}
                    >
                        {/* Background Image */}
                        <div className="cat-bg" style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundImage: `url(${cat.cover_image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                            filter: 'brightness(0.7)'
                        }} />

                        {/* Content Overlay */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            height: '50%',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                            zIndex: 1
                        }} />

                        {/* Text Content */}
                        <div style={{
                            position: 'absolute',
                            bottom: '30px',
                            left: '20px',
                            zIndex: 2,
                            paddingRight: '20px'
                        }}>
                            <h3 style={{
                                fontSize: '1.8rem',
                                color: '#fff',
                                marginBottom: '8px',
                                textTransform: 'uppercase',
                                fontWeight: 800,
                                lineHeight: 1.1,
                                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                            }}>{cat.name}</h3>
                            <button style={{
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.5)',
                                color: '#fff',
                                padding: '8px 16px',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                cursor: 'pointer',
                                marginTop: '10px'
                            }}>
                                Explore
                            </button>
                        </div>
                    </div>
                ))}

                {/* Spacer at the end */}
                <div style={{ minWidth: '20px' }} />
            </div>

            {/* Injected Style for hiding scrollbar */}
            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default HomeCategories;
