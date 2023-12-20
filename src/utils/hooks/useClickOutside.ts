import { RefObject, useEffect } from 'react';

const useClickOutside = (ref: RefObject<HTMLElement>, callback: () => void) => {
  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (ref.current && !ref.current.contains(target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default useClickOutside;
