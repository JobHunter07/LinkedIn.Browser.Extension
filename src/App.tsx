import { useEffect, useState } from 'react';
import { initPurger } from './services/FilterEngine';
import ControlPanel from './components/ControlPanel';
import JobPreview from './components/JobPreview';
import NNLButton from './components/NNLButton';
import { useSettings } from './components/useSettings';
import { DEFAULTS, type Settings } from './components/constants';
import { useDragPosition } from './components/useDragPosition';


export function getFirstPathSegment(urlString: string): string | null {
  try {
    const url = new URL(urlString);
    const segments = url.pathname.split('/').filter(segment => segment.length > 0);
    return segments.length > 0 ? segments[0] : null;
  } catch (error) {
    console.error("Invalid URL provided");
    return null;
  }
}


export default function App() {
  const [showPanel, setShowPanel] = useState(false);
  const [savedJob, setSavedJob] = useState<null | { title?: string; company?: string; url?: string; raw?: string }>(null);
  const { area, getAll } = useSettings();
  const [userSettings, setUserSettings] = useState<Settings>(DEFAULTS);
  const { position, onDragStart } = useDragPosition();

  useEffect(() => {
    updateUserSettings();

    let prev = location.href;

    const onChange = () => {
      const current = location.href;
      if (getFirstPathSegment(current) !== getFirstPathSegment(prev)
        && (getFirstPathSegment(prev) == 'mynetwork' || getFirstPathSegment(prev) == 'jobs')) {
        reloadExtension();
        prev = current;
      }
    };

    const intervalId = window.setInterval(onChange, 500);
    window.addEventListener('popstate', onChange);
    window.addEventListener('hashchange', onChange);


    const onStorageChanged = () => {
      updateUserSettings();
    };

    try {
      chrome?.storage?.onChanged?.addListener(onStorageChanged);
    } catch (e) {
      console.log("Chrome API is unavailable")
    }

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener('popstate', onChange);
      window.removeEventListener('hashchange', onChange);

      try {
        chrome?.storage?.onChanged?.removeListener(onStorageChanged);
      } catch {
        console.log("Chrome API is unavailable")
      }

    };
  }, []);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      try {
        const msg = e.data;
        if (!msg) return;
        // Expect messages of shape: { type: 'NNL_SAVED_JOB', payload: { title, company, url, raw } }
        if (msg.type === 'NNL_SAVED_JOB' && msg.payload) {
          setSavedJob(msg.payload);
          setShowPanel(true);
        }
      } catch (err) {
        // ignore
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  useEffect(() => {
    initPurger(userSettings);
  }, [JSON.stringify(userSettings)]);


  const reloadExtension = () => {
    try {
      if (chrome?.runtime?.reload) {
        chrome.runtime.reload();
      } else {
        window.location.reload();
      }
    } catch {
      window.location.reload();
    }
  };

  const updateUserSettings = () => {
    getAll(area, DEFAULTS)
      .then((data) => {
        setUserSettings(data)
      })
  }

  return (
    <div
      className="nnl-main-container"
      data-theme={userSettings.theme}
      style={{ left: position.x, top: position.y }}
    >
      <NNLButton showPanel={showPanel} onToggle={() => setShowPanel((prev) => !prev)} theme={userSettings.theme} />
      {showPanel && (
        <ControlPanel
          closePanel={() => { setShowPanel(false) }}
          hardRefresh={reloadExtension}
          userSettings={userSettings}
          savedJob={savedJob}
          clearSavedJob={() => setSavedJob(null)}
          onDragStart={onDragStart}
        />
      )}
    </div>
  );
}
