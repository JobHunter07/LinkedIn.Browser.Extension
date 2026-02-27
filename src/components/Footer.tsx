import { Heart, Star } from 'lucide-react';
import xIcon from '../../images/brand-svgs/x.svg';
import linkedinIcon from '../../images/brand-svgs/linkedin.svg';
import instagramIcon from '../../images/brand-svgs/instagram.svg';
import protonmailIcon from '../../images/brand-svgs/protonmail.svg';
import chromeIcon from '../../images/brand-svgs/googlechrome.svg';
import firefoxIcon from '../../images/brand-svgs/firefoxbrowser.svg';

const SvgIcon = ({ src, size, title }: { src: string; size: number; title: string }) => {
    const maskUrl = src.startsWith('data:') || src.startsWith('http') || src.startsWith('chrome-extension:')
        ? src
        : chrome.runtime.getURL(src);
    return (
        <span
            className="nnl-cp-svg-icon"
            title={title}
            role="img"
            aria-label={title}
            style={{
                width: size,
                height: size,
                WebkitMaskImage: `url("${maskUrl}")`,
                maskImage: `url("${maskUrl}")`,
            }}
        />
    );
};

export default function Footer() {
    const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
    return (
        <div className="nnl-cp-section nnl-cp-footer">
            <div className="nnl-cp-footer-content">
                {/* Project Actions (Pills) */}
                <div className="nnl-cp-pills">
                    <a
                        className="nnl-cp-pill"
                        href="https://github.com/JobHunter07/LinkedIn.Browser.Extension"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Star this repo on GitHub"
                    >
                        <Star size={16} fill="currentColor" strokeWidth={2.5} />
                        <span>Star</span>
                    </a>
                    <a
                        className="nnl-cp-pill"
                        href="https://feedback.jobhunter07.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Provide your feedback"
                    >
                        {isFirefox ? (<SvgIcon src={firefoxIcon} size={16} title="Firefox" />) : (<SvgIcon src={chromeIcon} size={16} title="Chrome" />)}
                        <span>Provide your feedback</span>
                    </a>
                </div>

                <div className="nnl-cp-divider"></div>
                <div className="nnl-cp-social">
                    {[
                        { icon: linkedinIcon, href: 'https://www.linkedin.com/company/jobhunter07', title: 'LinkedIn' },
                        { icon: protonmailIcon, href: 'mailto:extension@jobhunter07.com', title: 'Email' },
                        { icon: xIcon, href: 'https://x.com/jobhunter07', title: 'X / Twitter' },
                    ].map(({ icon, href, title }, i) => (
                        <a
                            key={i}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={title}
                            title={title}
                        >
                            <SvgIcon src={icon} size={16} title={title} />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
