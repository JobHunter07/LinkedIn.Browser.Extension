import type { FC } from 'react';

interface ReloadProps {
    closePanel: () => void;
    hardRefresh: () => void;
}

const Reload: FC<ReloadProps> = ({ closePanel, hardRefresh }) => {
    return (
        <div className="nnl-cp-actions">
            <button
                type="button"
                onClick={() => {
                    hardRefresh();
                    closePanel();
                }}
                className="nnl-cp-button"
            >
                Reload
            </button>
        </div>
    );
};

export default Reload;
