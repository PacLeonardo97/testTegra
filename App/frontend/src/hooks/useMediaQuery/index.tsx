import { useEffect, useState } from 'react';

const isClient = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

const isApiSupported = (api: string): boolean =>
  typeof window !== 'undefined' ? api in window : false;

const cache = new Map();

const warnOnce = (message: string) => {
  if (cache.has(message)) return;
  cache.set(message, true);
  console.warn(message);
};

const errorMessage =
  'matchMedia is not supported, this could happen both because window.matchMedia is not supported by' +
  " your current browser or you're using the useMediaQuery hook whilst server side rendering.";

const useMediaQuery = (mediaQuery: string) => {
  const [isVerified, setIsVerified] = useState(
    !!window.matchMedia(mediaQuery).matches
  );
  if (!isClient || !isApiSupported('matchMedia')) {
    warnOnce(errorMessage);
    return false;
  }

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery);
    const documentChangeHandler = () => {
      setIsVerified(!!mediaQueryList.matches);
    };

    try {
      mediaQueryList.addEventListener('change', documentChangeHandler);
    } catch (e) {
      // Safari isn't supporting mediaQueryList.addEventListener
      mediaQueryList.addListener(documentChangeHandler);
    }

    documentChangeHandler();
    return () => {
      try {
        mediaQueryList.removeEventListener('change', documentChangeHandler);
      } catch (e) {
        mediaQueryList.removeListener(documentChangeHandler);
      }
    };
  }, [mediaQuery]);

  return isVerified;
};

export default useMediaQuery;
