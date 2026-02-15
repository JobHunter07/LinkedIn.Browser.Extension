import type { ChangeEvent } from 'react';
import { useSettings } from './useSettings';
import type { Settings } from './constants';
import '../style.css';
import Header from './Header';
import Footer from './Footer';

type ControlPanelProps = {
  closePanel: () => void;
  hardRefresh: () => void;
  userSettings: Settings;
};

export default function ControlPanel(props: ControlPanelProps) {
  const { setSetting } = useSettings();

  const toggle =
    (key: keyof Settings) => async (e: ChangeEvent<HTMLInputElement>) => {
      await setSetting(key, e.target.checked);
    };

  return (
    <div className="nnl-cp">
      <Header closePanel={props.closePanel} />
      <div className="nnl-cp-section" style={{ paddingTop: 8 }}>
        <div className="nnl-cp-desc" style={{ padding: '0 4px 6px' }}>LinkedIn Feed</div>
        <label className="nnl-cp-row">
          <span className="nnl-cp-text">
            <span className="nnl-cp-label">Disable <strong>Promoted</strong> Posts</span>
            <span className="nnl-cp-desc">Hide ads and sponsored content in your feed.</span>
          </span>
          <input
            id="nnl-promoted"
            name="nnl-promoted"
            type="checkbox"
            checked={props.userSettings.disablePromoted}
            onChange={toggle('disablePromoted')}
          />
          <span className="nnl-cp-switch" aria-hidden="true">
            <span className="nnl-cp-knob" />
          </span>
        </label>

        <label className="nnl-cp-row">
          <span className="nnl-cp-text">
            <span className="nnl-cp-label">Disable <strong>Suggested</strong> Posts</span>
            <span className="nnl-cp-desc">Remove Suggested posts like "Because you follow" or "You might like".</span>
          </span>
          <input
            id="nnl-suggested"
            name="nnl-suggested"
            type="checkbox"
            checked={props.userSettings.disableSuggested}
            onChange={toggle('disableSuggested')}
          />
          <span className="nnl-cp-switch" aria-hidden="true">
            <span className="nnl-cp-knob" />
          </span>
        </label>

        <label className="nnl-cp-row">
          <span className="nnl-cp-text">
            <span className="nnl-cp-label"><strong>Focus Mode:</strong> Disable LinkedIn Feed</span>
            <span className="nnl-cp-desc">Block the home feed for distraction‑free networking.</span>
          </span>
          <input
            id="nnl-feed"
            name="nnl-feed"
            type="checkbox"
            checked={props.userSettings.disableFeed}
            onChange={toggle('disableFeed')}
          />
          <span className="nnl-cp-switch" aria-hidden="true">
            <span className="nnl-cp-knob" />
          </span>
        </label>
      </div>
      <div className="nnl-cp-section" style={{ paddingTop: 8 }}>
        <div className="nnl-cp-desc" style={{ padding: '0 4px 6px' }}>Site-Wide Settings</div>
        <label className="nnl-cp-row">
          <span className="nnl-cp-text">
            <span className="nnl-cp-label">Disable LinkedIn News and Ad Sections</span>
            <span className="nnl-cp-desc">Block the LinkedIn News and Ad sidebars.</span>
          </span>
          <input
            id="nnl-news"
            name="nnl-news"
            type="checkbox"
            checked={props.userSettings.disableNews}
            onChange={toggle('disableNews')}
          />
          <span className="nnl-cp-switch" aria-hidden="true">
            <span className="nnl-cp-knob" />
          </span>
        </label>
      </div>
      <div className="nnl-cp-section" style={{ paddingTop: 8 }}>
        <div className="nnl-cp-desc" style={{ padding: '0 4px 6px' }}>Troubleshooting</div>
        <div className="nnl-cp-actions">
          <button
            type="button"
            onClick={() => {
              props.hardRefresh();
              props.closePanel();
            }}
            className="nnl-cp-button"
          >
            Reload
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
