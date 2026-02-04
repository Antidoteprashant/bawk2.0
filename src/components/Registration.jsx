import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Registration = () => {
    const comp = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        college: '',
        category: 'Solo'
    });

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {

            // Text Reveals
            const textLines = comp.current.querySelectorAll('.text-reveal-line');
            gsap.to(textLines, {
                scrollTrigger: {
                    trigger: '.reg-form-container',
                    start: "top 80%"
                },
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.1,
                ease: "power4.out"
            });

            // Form Fields Reveal
            gsap.from('.input-wrapper', {
                scrollTrigger: {
                    trigger: '.reg-form-container',
                    start: "top 75%"
                },
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.5 // Wait for text
            });

            // Button
            gsap.from('.submit-btn', {
                scrollTrigger: {
                    trigger: '.reg-form-container',
                    start: "top 75%"
                },
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: "back.out(1.7)",
                delay: 1.0
            });

        }, comp);

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.email) {
            // Success Animation
            const tl = gsap.timeline();
            tl.to('.reg-form', { opacity: 0, scale: 0.95, duration: 0.4, ease: "power2.in" })
                .to('.success-message', { opacity: 1, scale: 1, display: 'flex', duration: 0.6, ease: "elastic.out(1, 0.75)" });

            console.log("Registered:", formData);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        color: 'var(--text-main)',
        fontSize: '1rem',
        outline: 'none',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        backdropFilter: 'blur(10px)'
    };

    return (
        <section id="register" ref={comp} className="flex-center" style={{ minHeight: '100vh', padding: '100px 20px', position: 'relative' }}>

            {/* Background Decor for "Free Glass" feel */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '120%', height: '120%', background: 'radial-gradient(circle at 50% 50%, rgba(127, 212, 255, 0.05) 0%, transparent 60%)', zIndex: -1, pointerEvents: 'none' }}></div>

            <div className="reg-form-container" style={{
                width: '100%',
                maxWidth: '480px',
                position: 'relative',
                zIndex: 10
            }}>

                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-1px', lineHeight: 1.2 }}>
                        <span className="text-reveal-mask">
                            {/* Nested spans to group text if needed, or just one line */}
                            <span className="text-reveal-line">Join the <span style={{ color: 'var(--accent-primary)', textShadow: '0 0 30px var(--accent-glow)' }}>Elite.</span></span>
                        </span>
                    </h2>

                    <div style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '10px' }}>

                        <span className="text-reveal-mask">
                            <span className="text-reveal-line">Secure your spot in history.</span>
                        </span>

                    </div>
                </div>

                <div className="success-message" style={{ display: 'none', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '400px', opacity: 0, transform: 'scale(0.9)' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✨</div>
                    <h3 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#fff' }}>You're In.</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Ticket sent to {formData.email}</p>
                </div>

                <form className="reg-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    <div className="input-wrapper">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            style={inputStyle}
                            onChange={handleChange}
                            required
                            onFocus={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                e.target.style.borderColor = 'var(--accent-primary)';
                                e.target.style.boxShadow = '0 0 20px var(--accent-glow)';
                            }}
                            onBlur={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.03)';
                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    <div className="input-wrapper">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            style={inputStyle}
                            onChange={handleChange}
                            required
                            onFocus={(e) => {
                                e.target.style.background = 'rgba(127, 212, 255, 0.08)';
                                e.target.style.borderColor = 'var(--accent-primary)';
                                e.target.style.boxShadow = '0 0 20px var(--accent-glow)';
                            }}
                            onBlur={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.03)';
                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    <div className="input-wrapper">
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            style={inputStyle}
                            onChange={handleChange}
                            required
                            onFocus={(e) => {
                                e.target.style.background = 'rgba(127, 212, 255, 0.08)';
                                e.target.style.borderColor = 'var(--accent-primary)';
                                e.target.style.boxShadow = '0 0 20px var(--accent-glow)';
                            }}
                            onBlur={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.03)';
                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    <div className="input-wrapper">
                        <input
                            type="text"
                            name="college"
                            placeholder="College / Organization"
                            style={inputStyle}
                            onChange={handleChange}
                            required
                            onFocus={(e) => {
                                e.target.style.background = 'rgba(127, 212, 255, 0.08)';
                                e.target.style.borderColor = 'var(--accent-primary)';
                                e.target.style.boxShadow = '0 0 20px var(--accent-glow)';
                            }}
                            onBlur={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.03)';
                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    <div className="input-wrapper">
                        <select
                            name="category"
                            style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
                            onChange={handleChange}
                            onFocus={(e) => {
                                e.target.style.background = 'rgba(127, 212, 255, 0.08)';
                                e.target.style.borderColor = 'var(--accent-primary)';
                                e.target.style.boxShadow = '0 0 20px var(--accent-glow)';
                            }}
                            onBlur={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.03)';
                                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            <option value="Solo" style={{ color: '#000' }}>Event Category: Solo Speed</option>
                            <option value="Team" style={{ color: '#000' }}>Event Category: Dual Strike</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="submit-btn"
                        style={{
                            width: '100%',
                            padding: '22px',
                            marginTop: '20px',
                            borderRadius: '16px',
                            border: 'none',
                            background: '#ffffff',
                            color: '#000000',
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: '0 5px 20px rgba(255, 255, 255, 0.15)',
                            position: 'relative',
                            overflow: 'hidden',
                            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.02)';
                            e.target.style.boxShadow = '0 0 40px var(--accent-glow)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.boxShadow = '0 5px 20px rgba(255, 255, 255, 0.15)';
                        }}
                        onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'}
                        onMouseUp={(e) => e.target.style.transform = 'scale(1.02)'}
                    >
                        Confirm Registration
                    </button>

                </form>
            </div>
        </section>
    );
};

export default Registration;
