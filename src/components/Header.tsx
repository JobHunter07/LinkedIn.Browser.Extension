import { X, Moon, Sun } from 'lucide-react';
import type { Settings } from './constants';

type HeaderProps = {
    closePanel: () => void;
    theme: Settings['theme'];
    toggleTheme: () => void;
};

export default function Header({ closePanel, theme, toggleTheme }: HeaderProps) {
    const isDark = theme === 'LIGHT';

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
                    <Moon size={14} strokeWidth={2.5} />
                ) : (
                    <Sun size={14} strokeWidth={2.5} />
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
