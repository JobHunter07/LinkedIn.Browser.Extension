import React from 'react';
import { ChevronDown } from 'lucide-react';

type AccordionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export default function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  return (
    <details className="nnl-accordion" open={defaultOpen}>
      <summary className="nnl-accordion-summary">
        <span>{title}</span>
        <ChevronDown size={14} className="nnl-accordion-icon" aria-hidden />
      </summary>
      <div className="nnl-accordion-content">{children}</div>
    </details>
  );
}