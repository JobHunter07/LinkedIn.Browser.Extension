interface NNLButtonProps {
    showPanel: boolean;
    onToggle: () => void;
    theme: 'LIGHT' | 'DARK';
}

export default function NNLButton(props: NNLButtonProps) {

    const icon32light = chrome.runtime.getURL('images/no-noise-linkedin-logo-light.svg');
    const icon32dark = chrome.runtime.getURL('images/no-noise-linkedin-logo-dark.svg');

    return (
        <button
            onClick={props.onToggle}
            title='No Noise LinkedIn Control panel'
            className="nnl-button"
        >
            <img
                src={props.theme === 'LIGHT' ? icon32light : icon32dark}
                alt="No Noise LinkedIn Control panel"
                width={32}
                height={32}
                className={`nnl-button-icon ${props.showPanel ? 'active' : ''}`}
            />
        </button>
    );
}
