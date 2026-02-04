import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const EventDetails = () => {
    const container = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {

            // Header Reveal
            const headerLines = container.current.querySelectorAll('.detail-header .text-reveal-line');
            gsap.to(headerLines, {
                scrollTrigger: {
                    trigger: '.detail-header',
                    start: "top 80%",
                },
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.1,
                ease: "power4.out"
            });

            // Cards Reveal
            const cards = container.current.querySelectorAll('.detail-card');
            gsap.fromTo(cards,
                { y: 50, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: '.cards-container',
                        start: "top 85%",
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out"
                }
            );

            // Text inside cards (delayed slightly after card appears)
            cards.forEach((card, i) => {
                const lines = card.querySelectorAll('.text-reveal-line');
                if (lines.length > 0) {
                    gsap.to(lines, {
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                        },
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        delay: 0.2 + (i * 0.1), // Stagger based on card index too
                        stagger: 0.05,
                        ease: "power3.out"
                    });
                }
            });

        }, container);

        return () => ctx.revert();
    }, []);

    const details = [
        {
            title: "The Arena",
            desc: "An intense digital battlefield where speed meets strategy. Prove you have the quickest hands in the west."
        },
        {
            title: "Who Can Join?",
            desc: "Open to all college students. Solo participation. No prerequisites—just raw reaction time and wit."
        },
        {
            title: "The Format",
            desc: "3 Rounds: Qualifiers, Semi-Finals (Knockout), and the Grand Finale. Only the top 10 survive."
        }
    ];

    return (
        <section id="details" ref={container} className="flex-center" style={{
            minHeight: '100vh',
            padding: '100px 20px',
            flexDirection: 'column',
            position: 'relative',
        }}>
            <div className="detail-header" style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '800px' }}>
                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '20px', color: 'var(--text-main)', lineHeight: 1.2 }}>
                    <span className="text-reveal-mask">
                        <span className="text-reveal-line">What is <span className="text-gradient">Quick Snatch?</span></span>
                    </span>
                </h2>

                <div style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    <span className="text-reveal-mask">
                        <span className="text-reveal-line">It's not just a contest; it's a reflex revolution.</span>
                    </span>
                    <span className="text-reveal-mask">
                        <span className="text-reveal-line">We challenge your cognitive speed and motor skills</span>
                    </span>
                    <span className="text-reveal-mask">
                        <span className="text-reveal-line">in a series of custom-built digital challenges.</span>
                    </span>
                </div>
            </div>

            <div className="cards-container" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '30px',
                width: '100%',
                maxWidth: '1200px'
            }}>
                {details.map((item, i) => (
                    <div key={i} className="detail-card glass-panel" style={{
                        padding: '40px',
                        textAlign: 'left',
                        transition: 'transform 0.3s ease, border-color 0.3s ease'
                    }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: 'var(--accent-primary)', overflow: 'hidden' }}>
                            <span className="text-reveal-mask">
                                <span className="text-reveal-line">0{i + 1}. {item.title}</span>
                            </span>
                        </h3>
                        <div style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>
                            <span className="text-reveal-mask">
                                <span className="text-reveal-line">{item.desc}</span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default EventDetails;
