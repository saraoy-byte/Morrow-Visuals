/**
 * High-performance Video Preloader Mechanism
 * Pre-buffers video data in browser memory so project videos play instantly
 * without loading spinners or network lag when clicked.
 */

type PreloadStatus = 'idle' | 'loading' | 'ready' | 'error';

interface PreloadEntry {
  url: string;
  video: HTMLVideoElement;
  status: PreloadStatus;
  readyPromise: Promise<void>;
}

class VideoPreloader {
  private cache = new Map<string, PreloadEntry>();
  private listeners = new Set<(statusMap: Record<string, PreloadStatus>) => void>();

  /**
   * Preload a single video URL into browser cache
   */
  public preload(url: string, priority: 'high' | 'low' = 'low'): Promise<void> {
    if (!url) return Promise.resolve();

    const existing = this.cache.get(url);
    if (existing) {
      if (priority === 'high' && existing.status === 'idle') {
        existing.video.preload = 'auto';
        existing.video.load();
      }
      return existing.readyPromise;
    }

    // Create an offscreen HTMLVideoElement dedicated to buffering
    const video = document.createElement('video');
    video.preload = priority === 'high' ? 'auto' : 'auto';
    video.muted = true;
    video.playsInline = true;
    video.style.display = 'none';

    let resolveReady: () => void;
    const readyPromise = new Promise<void>((resolve) => {
      resolveReady = resolve;
    });

    const entry: PreloadEntry = {
      url,
      video,
      status: 'loading',
      readyPromise,
    };

    const handleReady = () => {
      if (entry.status !== 'ready') {
        entry.status = 'ready';
        this.notifyListeners();
        resolveReady();
      }
    };

    const handleError = () => {
      entry.status = 'error';
      this.notifyListeners();
      resolveReady(); // resolve anyway to avoid hanging
    };

    // ReadyState 3 = HAVE_FUTURE_DATA, ReadyState 4 = HAVE_ENOUGH_DATA
    video.addEventListener('canplay', handleReady, { once: true });
    video.addEventListener('canplaythrough', handleReady, { once: true });
    video.addEventListener('loadeddata', () => {
      if (video.readyState >= 3) {
        handleReady();
      }
    });
    video.addEventListener('error', handleError, { once: true });

    // Attach source and start loading
    video.src = url;
    video.load();

    this.cache.set(url, entry);
    this.notifyListeners();

    return readyPromise;
  }

  /**
   * Preload multiple videos sequentially or in idle queue
   */
  public preloadBatch(urls: string[]): void {
    const validUrls = urls.filter(Boolean);
    if (validUrls.length === 0) return;

    // Use requestIdleCallback if available, otherwise setTimeout
    const queue = [...validUrls];

    const loadNext = () => {
      if (queue.length === 0) return;
      const nextUrl = queue.shift();
      if (nextUrl) {
        this.preload(nextUrl, 'low').then(() => {
          // Schedule next video preload during idle frame to preserve user bandwidth & smoothness
          if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
            (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(() => {
              loadNext();
            });
          } else {
            setTimeout(loadNext, 120);
          }
        });
      }
    };

    loadNext();
  }

  /**
   * Escalate video preload to high priority (e.g. on mouse hover or focus)
   */
  public prioritize(url: string): void {
    if (!url) return;
    const existing = this.cache.get(url);
    if (!existing) {
      this.preload(url, 'high');
    } else if (existing.status !== 'ready') {
      existing.video.preload = 'auto';
      existing.video.load();
    }
  }

  /**
   * Check if a video is preloaded and ready to play immediately
   */
  public isReady(url: string): boolean {
    const entry = this.cache.get(url);
    return entry ? entry.status === 'ready' : false;
  }

  /**
   * Get preloaded video element if available
   */
  public getVideoElement(url: string): HTMLVideoElement | undefined {
    return this.cache.get(url)?.video;
  }

  /**
   * Get current status map for reactive components
   */
  public getStatusMap(): Record<string, PreloadStatus> {
    const map: Record<string, PreloadStatus> = {};
    this.cache.forEach((entry, url) => {
      map[url] = entry.status;
    });
    return map;
  }

  /**
   * Subscribe to preload updates
   */
  public subscribe(listener: (statusMap: Record<string, PreloadStatus>) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners(): void {
    const map = this.getStatusMap();
    this.listeners.forEach((listener) => listener(map));
  }
}

export const videoPreloader = new VideoPreloader();
