import React, { RefObject, useEffect } from 'react';

type Handler = (event: React.SyntheticEvent) => void;

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, handler: Handler, buttonRef?: RefObject<HTMLButtonElement>) => {
  useEffect(() => {
    const listener = (event: any) => {
      // Do nothing if clicking ref's element or descendent elements

      if (!ref.current || ref.current.contains(event.target) || (buttonRef?.current && buttonRef.current.contains(event.target))) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
