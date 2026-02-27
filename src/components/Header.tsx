import { X, Moon, Sun } from 'lucide-react';

type HeaderProps = {
    closePanel: () => void;
    theme: 'LIGHT' | 'DARK';
    toggleTheme: () => void;
};

export default function Header({ closePanel, theme, toggleTheme }: HeaderProps) {
    const isDark = theme === 'DARK';

    return (
        <div className="nnl-cp-header">
            <button
                type="button"
                onClick={toggleTheme}
                className="nnl-cp-header-btn nnl-cp-theme-toggle"
                aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
                title={isDark ? "Light mode" : "Dark mode"}
            >
                {isDark ? (
                    <Moon size={18} strokeWidth={2} />
                ) : (
                    <Sun size={18} strokeWidth={2} />
                )}
            </button>
            <div className="nnl-cp-title">
                <span className="brand">JobHunter07</span>
                <span className="panel">No Noise LinkedIn</span>
            </div>
            <button
                type="button"
                onClick={closePanel}
                className="nnl-cp-header-btn nnl-cp-close"
                aria-label="Close panel"
                title="Close"
            >
                <X size={18} strokeWidth={2} />
            </button>
        </div>
    );
}
