
import { X, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

type HeaderProps = {
    closePanel: () => void;
};

export default function Header({ closePanel }: HeaderProps) {
    const [isDark, setIsDark] = useState(false);
    return (
        <div className="nnl-cp-header">
            <button
                type="button"
                onClick={() => setIsDark(!isDark)}
                className="nnl-cp-header-btn nnl-cp-theme-toggle"
                aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
                title={isDark ? "Light mode" : "Dark mode"}
            >
                {isDark ? (
                    <Sun size={14} strokeWidth={2.5} />
                ) : (
                    <Moon size={14} strokeWidth={2.5} />
                )}
            </button>
            <div className="nnl-cp-title">
                <span className="brand">No Noise LinkedIn</span>
                <span className="panel">Control Panel</span>
            </div>
            <button
                type="button"
                onClick={closePanel}
                className="nnl-cp-header-btn nnl-cp-close"
                aria-label="Close panel"
                title="Close"
            >
                <X size={14} strokeWidth={2.5} />
            </button>
        </div>
    );
}
