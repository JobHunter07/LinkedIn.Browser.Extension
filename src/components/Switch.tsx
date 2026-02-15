import type { ChangeEventHandler } from 'react';

type SwitchProps = {
    id: string;
    name?: string;
    checked: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
};

export default function Switch({ id, name, checked, onChange }: SwitchProps) {
    return (
        <>
            <input
                id={id}
                name={name || id}
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            <span className="nnl-cp-switch" aria-hidden="true">
                <span className="nnl-cp-knob" />
            </span>
        </>
    );
}
