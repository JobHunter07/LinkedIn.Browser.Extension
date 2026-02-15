interface NNLButtonProps {
    showPanel: boolean;
    onToggle: () => void;
}

export default function NNLButton({ showPanel, onToggle }: NNLButtonProps) {

    const icon32 = chrome.runtime.getURL('images/no-noise-linkedin-logo-dark.svg');

    return (
        <button
            onClick={onToggle}
            title='No Noise LinkedIn Control panel'
            className="nnl-button"
        >
            <img
                src={icon32}
                alt="No Noise LinkedIn Control panel"
                width={32}
                height={32}
                className={`nnl-button-icon ${showPanel ? 'active' : ''}`}
            />
        </button>
    );
}
