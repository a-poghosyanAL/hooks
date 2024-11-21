import { useEffect, useRef } from 'react';

const useInfinteScroll = <T extends HTMLElement>(loading: boolean, handleNext: () => void) => {
  const observerTarget = useRef<T | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (loading) return;
        if (entries[0].isIntersecting) {
          handleNext();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
      observer.disconnect();
    };
  }, [observerTarget, handleNext]);

  return { observerTarget };
};

export default useInfinteScroll;
