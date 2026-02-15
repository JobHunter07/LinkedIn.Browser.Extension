import { Heart, Star, Chrome, Twitter, Linkedin, Instagram, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <div className="nnl-cp-section nnl-cp-footer">
            <div className="nnl-cp-desc">
                <div className="nnl-cp-social-text">
                    Made by <a href="https://github.com/karan51ngh" target="_blank" rel="noopener noreferrer">@karan51ngh</a> with <Heart size={12} color="#ec4899" fill="#ec4899" strokeWidth={2} />
                </div>
            </div>
            <div className="nnl-cp-footer-content">
                {/* Project Actions (Pills) */}
                <div className="nnl-cp-pills">
                    <a
                        className="nnl-cp-pill"
                        href="https://github.com/karan51ngh/no-noise-linkedin"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Star this repo on GitHub"
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
                    >
                        <Chrome size={14} strokeWidth={2} />
                        <span>Review</span>
                    </a>
                </div>

                <div className="nnl-cp-divider"></div>
                <div className="nnl-cp-social">
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
                        >
                            <Icon size={18} strokeWidth={2} />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
