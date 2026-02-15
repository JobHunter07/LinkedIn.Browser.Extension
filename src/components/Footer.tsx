import { Heart, Star, Chrome, Twitter, Linkedin, Instagram, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <div className="nnl-cp-section" style={{ paddingTop: 16, paddingBottom: 4 }}>
            <div className="nnl-cp-desc" style={{ textAlign: 'center', padding: '0 0 10px', fontSize: '12px' }}>
                <div className="nnl-cp-social-text">
                    Made by <a href="https://github.com/karan51ngh" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', fontWeight: 600 }}>@karan51ngh</a> with <Heart size={12} color="#ec4899" fill="#ec4899" strokeWidth={2} />
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                {/* Project Actions (Pills) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <a
                        className="nnl-cp-pill"
                        href="https://github.com/karan51ngh/no-noise-linkedin"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Star this repo on GitHub"
                        style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', backgroundColor: '#f3f4f6', borderRadius: '100px', textDecoration: 'none', fontSize: '11px', fontWeight: 600 }}
                    >
                        <Star size={14} fill="currentColor" strokeWidth={2} />
                        <span>Star</span>
                    </a>
                    <a
                        className="nnl-cp-pill"
                        href="https://chromewebstore.google.com/detail/nonoise-linkedin/hbcjelfhlljdepmifggbmhnklhmdmldn/reviews"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Write a review on Chrome Web Store"
                        style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', backgroundColor: '#f3f4f6', borderRadius: '100px', textDecoration: 'none', fontSize: '11px', fontWeight: 600 }}
                    >
                        <Chrome size={14} strokeWidth={2} />
                        <span>Review</span>
                    </a>
                </div>

                <div style={{ width: '1px', height: '18px', backgroundColor: '#e5e7eb' }}></div>
                <div className="nnl-cp-social" style={{ margin: 0, gap: '10px' }}>
                    {[
                        { Icon: Twitter, href: 'https://twitter.com/karan5ingh', Title: 'X / Twitter' },
                        { Icon: Linkedin, href: 'https://www.linkedin.com/in/karan51ngh', Title: 'LinkedIn' },
                        { Icon: Instagram, href: 'https://www.instagram.com/karan51ngh', Title: 'Instagram' },
                        { Icon: Mail, href: 'karansingh9535@gmail.com', Title: 'Email' },
                    ].map(({ Icon, href, Title }, i) => (
                        <a
                            key={i}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={Title}
                            title={Title}
                            style={{ display: 'flex', alignItems: 'center' }}
                        >
                            <Icon size={18} strokeWidth={2} />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
