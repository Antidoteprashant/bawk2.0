import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Flashback = () => {
    const sectionRef = useRef(null);
    const stripRef = useRef(null);
    const row1Ref = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // Header Reveal
            const headerLine = sectionRef.current.querySelector('.header-reveal .text-reveal-line');
            if (headerLine) {
                gsap.to(headerLine, {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power4.out"
                });
            }

            // Continuous Marquee Animation
            const width = row1Ref.current.scrollWidth;
            gsap.to(row1Ref.current, {
                xPercent: -50,
                ease: "none",
                duration: 40,
                repeat: -1
            });

            // Reveal items inside the marquee as the section comes into view
            // (Subtle staggered reveal even though they are scrolling)
            const cards = row1Ref.current.querySelectorAll('.flash-item');
            gsap.from(cards, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%"
                },
                y: 100,
                opacity: 0,
                rotateX: -20,
                stagger: 0.1,
                duration: 1.2,
                ease: "power3.out"
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const memories = [
        { year: "2022", title: "Genesis", color: "#333" },
        { year: "2023", title: "Momentum", color: "#444" },
        { year: "2024", title: "Peak", color: "#555" },
        { year: "2025", title: "Horizon", color: "#666" },
        { year: "Legacy", title: "Forever", color: "#777" }
    ];

    const marqueeItems = [...memories, ...memories];

    return (
        <section id="flashback" ref={sectionRef} style={{
            minHeight: '60vh',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '100px 0',
        }}>

            <div style={{ paddingLeft: '5vw', marginBottom: '2rem' }}>
                <h2 className="glow-text header-reveal text-reveal-mask" style={{ fontSize: '3rem', color: 'var(--text-main)' }}>
                    <span className="text-reveal-line">Archive</span>
                </h2>
            </div>

            {/* Moving Strip Wrapper */}
            <div ref={stripRef} style={{ width: '100%', overflow: 'hidden' }}>
                <div ref={row1Ref} style={{
                    display: 'flex',
                    gap: '20px',
                    width: 'max-content',
                    paddingLeft: '20px'
                }}>
                    {marqueeItems.map((mem, i) => (
                        <div key={i} className="flash-item glass-panel" style={{
                            width: '350px',
                            height: '250px',
                            flexShrink: 0,
                            position: 'relative',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid var(--glass-border)',
                            background: 'var(--glass-bg)'
                        }}>
                            {/* No complex text masking inside moving elements to avoid perf issues, just standard fade/opacity on container is enough for "Entrance" */}
                            <h3 style={{ fontSize: '4rem', fontWeight: 900, color: 'rgba(255,255,255,0.05)', position: 'absolute' }}>{mem.year}</h3>
                            <p style={{ zIndex: 1, fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 600 }}>{mem.title}</p>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default Flashback;
