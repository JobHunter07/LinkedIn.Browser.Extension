import React from 'react';
import { Copy, X } from 'lucide-react';

type JobPreviewProps = {
  title?: string;
  company?: string;
  url?: string;
  raw?: string;
  onClose?: () => void;
  onCopy?: (text: string) => void;
};

export default function JobPreview({ title, company, url, raw, onClose, onCopy }: JobPreviewProps) {
  const jsonText = raw ?? JSON.stringify({ title, company, url }, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonText);
      onCopy?.(jsonText);
    } catch (e) {
      onCopy?.(jsonText);
    }
  };

  return (
    <div className="jobViewRoot" role="dialog" aria-label="Saved Job Preview">
      <div className="jobViewHeader">
        <div className="jobViewHeaderLeft">
          <strong>Saved Job (Preview)</strong>
        </div>
        <button aria-label="Close" className="jobViewCloseBtn" onClick={onClose}>
          <X size={16} />
        </button>
      </div>

      <div className="jobViewContent">
        <div className="jobField">
          <div className="jobFieldLabel">Title</div>
          <div className="jobFieldValue">{title ?? '—'}</div>
        </div>
        <div className="jobField">
          <div className="jobFieldLabel">Company</div>
          <div className="jobFieldValue">{company ?? '—'}</div>
        </div>
        <div className="jobField">
          <div className="jobFieldLabel">URL</div>
          <div className="jobFieldValue"><a href={url} target="_blank" rel="noreferrer">{url}</a></div>
        </div>

        <div className="jobViewRaw">
          <div className="jobViewRawLabel">Raw JSON</div>
          <pre className="jobViewRawCode" aria-hidden>{jsonText}</pre>
        </div>
      </div>

      <div className="jobViewFooter">
        <div className="jobViewActions">
          <button className="jobPrimaryButton" onClick={handleCopy}>
            <Copy size={14} style={{ marginRight: 8 }} /> Copy JSON
          </button>
          <button className="jobSecondaryButton" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
