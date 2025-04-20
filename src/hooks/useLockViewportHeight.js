import { useEffect } from "react";

export default function useLockViewportHeight() {
  useEffect(() => {
    const setHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setHeight();

    window.addEventListener('resize', setHeight);
    window.addEventListener('orientationchange', setHeight); // useful on mobile

    return () => {
      window.removeEventListener('resize', setHeight);
      window.removeEventListener('orientationchange', setHeight);
    };
  }, []);
}
