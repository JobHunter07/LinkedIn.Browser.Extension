
import { X } from 'lucide-react';

type HeaderProps = {
    closePanel: () => void;
};

export default function Header({ closePanel }: HeaderProps) {
    return (
        <div className="nnl-cp-header">
            <div className="nnl-cp-title">
                <span className="brand">No Noise LinkedIn</span>
                <span className="panel">Control Panel</span>
            </div>
            <button
                type="button"
                onClick={closePanel}
                className="nnl-cp-close"
                aria-label="Close panel"
                title="Close"
            >
                <X size={14} strokeWidth={2.5} />
            </button>
        </div>
    );
}
