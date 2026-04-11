'use client';

const OPEN_REALITY_CHECK_EVENT = 'lifeos:open-reality-check';

export function openRealityCheckPanel() {
  window.dispatchEvent(new Event(OPEN_REALITY_CHECK_EVENT));
}

export function getRealityCheckEventName() {
  return OPEN_REALITY_CHECK_EVENT;
}
