import React from 'react';
import WorkIcon from '@mui/icons-material/Work';

function normalizeLinkedInJobUrl(u: string) {
  try {
    const parsed = new URL(u);
    if (parsed.hostname.includes('linkedin.com')) {
      const parts = parsed.pathname.split('/').filter(Boolean);
      const idPart = parts.find((p) => /^\d+$/.test(p));
      if (idPart) {
        return `https://www.linkedin.com/jobs/view/${idPart}`;
      }
      if (parsed.pathname.includes('/jobs/view')) {
        return `https://www.linkedin.com${parsed.pathname}`;
      }
    }
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return u;
  }
}

const SaveJobButton: React.FC = () => {
  const handleSaveJob = () => {
    const title = (document.querySelector('h1')?.textContent || '').trim();
    const companyEl =
      (document.querySelector('a[href*="/company/"]') as HTMLElement | null) ||
      (document.querySelector('[data-company-name]') as HTMLElement | null) ||
      (document.querySelector('.jobs-top-card__company-url') as HTMLElement | null) ||
      (document.querySelector('.topcard__org-name-link') as HTMLElement | null);
    const company = (companyEl?.textContent || '').trim();
    const url = normalizeLinkedInJobUrl(location.href);
    const raw = JSON.stringify({ title, company, url });
    window.postMessage({ type: 'NNL_SAVED_JOB', payload: { title, company, url, raw } }, '*');
  };

  return (
    <button className="nnl-save-job-btn" onClick={handleSaveJob} aria-label="Save Job">
      <WorkIcon fontSize="small" />
    </button>
  );
};

export default SaveJobButton;
