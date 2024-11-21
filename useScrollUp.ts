import { useState, useEffect, useRef } from 'react';

import { useRouter } from 'next/router';

import { withoutHeader } from '@/components/layouts-and-navs/constants';

const THRESHOLD = 0;

const useScrollUp = (divId: string) => {
  const targetElement = useRef<HTMLElement | null>(null);
  const { asPath: pathname } = useRouter();
  const [scrollDirection, setScrollDirection] = useState(false);
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);
  // const { username } = useParams<{ username: string }>();
  const prevScrollY = useRef(0);

  useEffect(() => {
    targetElement.current = document.getElementById(divId);
    const updateScrollDirection = () => {
      if (targetElement.current && targetElement.current.scrollHeight && targetElement.current.scrollTop && targetElement.current.clientHeight) {
        if (targetElement.current.scrollHeight - targetElement.current.scrollTop - targetElement.current.clientHeight < 1) {
          setScrollDirection(true);
          return;
        }
      }
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
      if (targetElement.current) {
        const scrollY = targetElement.current.scrollTop;

        if (Math.abs(scrollY - prevScrollY.current) >= THRESHOLD) {
          const newScrollDirection = scrollY > prevScrollY.current;

          prevScrollY.current = scrollY > 0 ? scrollY : 0;

          setScrollDirection(newScrollDirection);
        }
      }

      timeOutRef.current = setTimeout(() => {
        setScrollDirection(true);
        if (targetElement.current && targetElement.current.scrollTop === 0) {
          setScrollDirection(false);
        }
      }, 100);
    };

    targetElement.current?.addEventListener('scroll', updateScrollDirection);

    return () => {
      targetElement.current?.removeEventListener('scroll', updateScrollDirection);
      timeOutRef.current = null;
    };
  }, []);
  if (targetElement.current && targetElement?.current.scrollHeight < window.innerHeight - 100) {
    return false;
  }
  return scrollDirection;
};

export default useScrollUp;
