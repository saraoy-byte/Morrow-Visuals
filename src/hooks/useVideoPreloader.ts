import { useEffect, useState, useCallback } from 'react';
import { videoPreloader } from '../utils/videoPreloader';

export function useVideoPreloader(videoUrls: (string | undefined)[]) {
  const [statuses, setStatuses] = useState<Record<string, 'idle' | 'loading' | 'ready' | 'error'>>(() =>
    videoPreloader.getStatusMap()
  );

  useEffect(() => {
    const validUrls = videoUrls.filter((url): url is string => Boolean(url));
    if (validUrls.length === 0) return;

    // Start background idle batch preloading
    videoPreloader.preloadBatch(validUrls);

    // Subscribe to state updates
    const unsubscribe = videoPreloader.subscribe((newStatuses) => {
      setStatuses(newStatuses);
    });

    return () => {
      unsubscribe();
    };
  }, [videoUrls]);

  const prioritize = useCallback((url?: string) => {
    if (url) {
      videoPreloader.prioritize(url);
    }
  }, []);

  const isReady = useCallback((url?: string) => {
    if (!url) return false;
    return videoPreloader.isReady(url);
  }, []);

  return {
    statuses,
    prioritize,
    isReady,
  };
}
