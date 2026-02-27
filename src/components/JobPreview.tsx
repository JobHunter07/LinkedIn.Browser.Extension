import React from 'react';
import { Copy, X } from 'lucide-react';
import Accordion from './Accordion';

type JobPreviewProps = {
  title?: string;
  company?: string;
  url?: string;
  raw?: string;
  onClose?: () => void;
  onCopy?: (text: string) => void;
  /** When true, renders without the standalone card wrapper — fits inside ControlPanel */
  embedded?: boolean;
};

export default function JobPreview({ title, company, url, raw, onClose, onCopy, embedded }: JobPreviewProps) {
  function getCanonicalUrl(u?: string) {
    if (!u) return '';
    try {
      const parsed = new URL(u);
      // If it's a LinkedIn jobs URL, strip query and hash and normalize
      if (parsed.hostname.includes('linkedin.com')) {
        const parts = parsed.pathname.split('/').filter(Boolean);
        // find numeric id in path
        const idPart = parts.find((p) => /^\d+$/.test(p));
        if (idPart) {
          return `https://www.linkedin.com/jobs/view/${idPart}`;
        }
        // fallback: preserve /jobs/view/whatever but strip query
        if (parsed.pathname.includes('/jobs/view')) {
          return `https://www.linkedin.com${parsed.pathname}`;
        }
      }
      // Non-LinkedIn or no id: return stripped origin+pathname
      return `${parsed.origin}${parsed.pathname}`;
    } catch (e) {
      return u;
    }
  }

  function buildJsonText(rawJson?: string) {
    const canonicalUrl = getCanonicalUrl(url);
    const fallback = {
      title: title ?? '',
      company: company ?? '',
      url: canonicalUrl,
    };

    if (!rawJson) return JSON.stringify(fallback, null, 2);

    try {
      const parsed = JSON.parse(rawJson);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        return JSON.stringify(fallback, null, 2);
      }

      const normalized = {
        ...parsed,
        title: parsed.title ?? fallback.title,
        company: parsed.company ?? fallback.company,
        url: canonicalUrl,
      };

      return JSON.stringify(normalized, null, 2);
    } catch {
      return JSON.stringify(fallback, null, 2);
    }
  }

  function getShortDisplayUrl(u?: string) {
    if (!u) return '';
    try {
      const parsed = new URL(u);
      if (parsed.hostname.includes('linkedin.com')) {
        const parts = parsed.pathname.split('/').filter(Boolean);
        const idPart = parts.find((p) => /^\d+$/.test(p));
        if (idPart) return `https://www.linkedin.com/jobs/view/${idPart}`;
        if (parsed.pathname.includes('/jobs/view')) return `https://www.linkedin.com${parsed.pathname}`;
      }
      // For other URLs, limit length
      const originPath = `${parsed.origin}${parsed.pathname}`;
      if (originPath.length > 80) return originPath.slice(0, 77) + '...';
      return originPath;
    } catch (e) {
      // fallback to raw
      if (u.length > 80) return u.slice(0, 77) + '...';
      return u;
    }
  }

  const canonicalUrl = getCanonicalUrl(url);
  const shortDisplayUrl = getShortDisplayUrl(canonicalUrl);
  const jsonText = buildJsonText(raw);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonText);
      onCopy?.(jsonText);
    } catch (e) {
      onCopy?.(jsonText);
    }
  };

  if (embedded) {
    return (
      <div className="jobEmbedded">
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
          <div className="jobFieldValue">
            {canonicalUrl ? (
              <a href={canonicalUrl} target="_blank" rel="noreferrer">{shortDisplayUrl}</a>
            ) : '—'}
          </div>
        </div>
        <Accordion title="Raw JSON">
          <pre className="jobViewRawCode" aria-hidden>{jsonText}</pre>
        </Accordion>
        <div className="nnl-cp-actions" style={{ marginTop: 12 }}>
          <button className="nnl-cp-button" onClick={handleCopy}>
            <Copy size={13} style={{ marginRight: 6, verticalAlign: 'middle' }} />Copy JSON
          </button>
          {onClose && (
            <button
              className="nnl-cp-button"
              onClick={onClose}
              style={{ borderColor: 'color-mix(in srgb, var(--nnl-black) 12%, transparent)', color: 'var(--nnl-text-secondary)', background: 'transparent' }}
            >
              Clear
            </button>
          )}
        </div>
      </div>
    );
  }

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
          <div className="jobFieldValue">
            {canonicalUrl ? (
              <a href={canonicalUrl} target="_blank" rel="noreferrer">{shortDisplayUrl}</a>
            ) : '—'}
          </div>
        </div>
        <Accordion title="Raw JSON">
          <pre className="jobViewRawCode" aria-hidden>{jsonText}</pre>
        </Accordion>
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
