import { useEffect, useState } from 'react';

const useScreenSize = () => {
  const [screenWidth, setScreenWidth] = useState<number | null>(null);
  const [screenHeight, setScreenHeight] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { screenWidth, screenHeight };
};

export default useScreenSize;
