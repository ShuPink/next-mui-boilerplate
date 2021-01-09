import { useState } from 'react';

export default function useImageLoaded() {
  const [isLoaded, setLoaded] = useState(false);
  const onLoad = (e) => {
    const { currentSrc } = e.target;
    if (!currentSrc.startsWith('data:')) {
      setLoaded(true);
    }
  };

  return { isLoaded, onLoad };
}
