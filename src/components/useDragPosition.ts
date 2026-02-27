import { useState, useEffect, useRef, useCallback, type MouseEvent as ReactMouseEvent } from 'react';

const STORAGE_KEY = 'nnl-ui-position';

type Position = { x: number; y: number };

function getDefaultPosition(): Position {
  if (typeof window === 'undefined') return { x: 32, y: 500 };
  // Mirror the original CSS: bottom: 32px, left: 32px.
  // Button height is ~32px, so top = innerHeight - 32 - 32.
  return { x: 32, y: window.innerHeight - 64 };
}

async function loadPosition(): Promise<Position | null> {
  try {
    return await new Promise((resolve) => {
      chrome.storage.local.get(STORAGE_KEY, (result) => {
        resolve((result[STORAGE_KEY] as Position) ?? null);
      });
    });
  } catch {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      return s ? (JSON.parse(s) as Position) : null;
    } catch {
      return null;
    }
  }
}

function savePosition(pos: Position): void {
  try {
    chrome.storage.local.set({ [STORAGE_KEY]: pos });
  } catch {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pos));
    } catch { /* ignore */ }
  }
}

export function useDragPosition() {
  const [position, setPosition] = useState<Position>(getDefaultPosition);
  // Keep a ref so drag handlers always have the latest position without
  // needing to be recreated on every render.
  const positionRef = useRef<Position>(position);
  useEffect(() => { positionRef.current = position; }, [position]);

  // Load persisted position on first mount.
  useEffect(() => {
    loadPosition().then((pos) => {
      if (pos) {
        setPosition(pos);
        positionRef.current = pos;
      }
    });
  }, []);

  const clamp = useCallback((pos: Position): Position => ({
    x: Math.max(0, Math.min(pos.x, window.innerWidth - 40)),
    y: Math.max(0, Math.min(pos.y, window.innerHeight - 48)),
  }), []);

  // dragStart holds the reference point captured at mousedown.
  const dragStart = useRef<{
    mouseX: number;
    mouseY: number;
    posX: number;
    posY: number;
  } | null>(null);

  const onDragStart = useCallback((e: ReactMouseEvent) => {
    // Let clicks on interactive children (buttons, links) pass through.
    if ((e.target as HTMLElement).closest('button, a, input, select, textarea')) return;
    e.preventDefault();

    dragStart.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      posX: positionRef.current.x,
      posY: positionRef.current.y,
    };

    const onMouseMove = (ev: MouseEvent) => {
      if (!dragStart.current) return;
      const dx = ev.clientX - dragStart.current.mouseX;
      const dy = ev.clientY - dragStart.current.mouseY;
      setPosition(clamp({
        x: dragStart.current.posX + dx,
        y: dragStart.current.posY + dy,
      }));
    };

    const onMouseUp = (ev: MouseEvent) => {
      if (!dragStart.current) return;
      const dx = ev.clientX - dragStart.current.mouseX;
      const dy = ev.clientY - dragStart.current.mouseY;
      const newPos = clamp({
        x: dragStart.current.posX + dx,
        y: dragStart.current.posY + dy,
      });
      dragStart.current = null;
      setPosition(newPos);
      savePosition(newPos);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [clamp]);

  return { position, onDragStart };
}
