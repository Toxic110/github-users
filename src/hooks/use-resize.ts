import { SCREEN_MD, SCREEN_SM } from '@constants';
import { useEffect, useState } from 'react';

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    width,
    isScreenSm: width <= SCREEN_SM,
    isScreenMd: width <= SCREEN_MD,
  };
};
