'use client';

import { useEffect } from 'react';

export default function CleanUrl() {
  useEffect(() => {
    const url = new URL(window.location.href);

    if (url.searchParams.has('fbclid')) {
      url.searchParams.delete('fbclid');
    }

    if (url.hash === '#google_vignette') {
      url.hash = '';
    }

    window.history.replaceState({}, '', url.toString());
  }, []);

  return null;
}
