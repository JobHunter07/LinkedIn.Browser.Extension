import type { ChangeEvent } from 'react';
import { useSettings } from './useSettings';
import type { Settings } from './constants';
import '../style.css';
import Header from './Header';
import Footer from './Footer';
import Switch from './Switch';
import ControlPanelRow from './ControlPanelRow';

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
      <div className="nnl-cp-section" data-title="LinkedIn Feed">
        <ControlPanelRow
          primaryText={<span>Disable <strong>Promoted</strong> Posts</span>}
          secondaryText="Hide ads and sponsored content in your feed."
        >
          <Switch
            id="nnl-promoted"
            name="nnl-promoted"
            checked={props.userSettings.disablePromoted}
            onChange={toggle('disablePromoted')}
          />
        </ControlPanelRow>

        <ControlPanelRow
          primaryText={<span>Disable <strong>Suggested</strong> Posts</span>}
          secondaryText="Remove Suggested posts like &quot;Because you follow&quot; or &quot;You might like&quot;."
        >
          <Switch
            id="nnl-suggested"
            name="nnl-suggested"
            checked={props.userSettings.disableSuggested}
            onChange={toggle('disableSuggested')}
          />
        </ControlPanelRow>

        <ControlPanelRow
          primaryText={<span><strong>Focus Mode:</strong> Disable LinkedIn Feed</span>}
          secondaryText="Block the home feed for distraction‑free networking."
        >
          <Switch
            id="nnl-feed"
            name="nnl-feed"
            checked={props.userSettings.disableFeed}
            onChange={toggle('disableFeed')}
          />
        </ControlPanelRow>
      </div>
      <div className="nnl-cp-section" data-title="Site-Wide Settings">
        <ControlPanelRow
          primaryText="Disable LinkedIn News and Ad Sections"
          secondaryText="Block the LinkedIn News and Ad sidebars."
        >
          <Switch
            id="nnl-news"
            name="nnl-news"
            checked={props.userSettings.disableNews}
            onChange={toggle('disableNews')}
          />
        </ControlPanelRow>
      </div>
      <div className="nnl-cp-section" data-title="Troubleshooting">
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
