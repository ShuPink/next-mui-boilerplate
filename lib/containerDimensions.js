import { useState, useEffect } from 'react';
import debounce from 'debounce';

/**
 * gets window dimensions modified from
 * thanks to QoP: https://stackoverflow.com/a/36862446
 */
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  let range = '';
  if (width < 600) {
    range = 'xs';
  } else if (width < 960) {
    range = 'sm';
  } else if (width < 1280) {
    range = 'md';
  } else if (width < 1920) {
    range = 'lg';
  } else if (width >= 1920) {
    range = 'xl';
  } else {
    range = '??';
  }
  return {
    width,
    height,
    range,
  };
}

/**
 * Hook that returns the window dimensions,
 * aspect ratio and orientation
 * @param {ref} ref - the ref of the node you want to monitor
 */
export default function useContainerDimensions(ref) {
  // need to set initial value so we don't get window not defined error
  // on initial load
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
    range: '',
  });

  const windowAspectRatio = windowDimensions.width / windowDimensions.height;
  const windowIsPortrait = windowAspectRatio < 1; // determine the window orientation

  // get frame dimension state
  const [frameDims, setFrameDims] = useState({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    function handleResize() {
      // on resize, get and set window dimensions
      setWindowDimensions(getWindowDimensions());

      // get the ref dimensions
      if (ref && ref.current) {
        setFrameDims({
          height: ref.current.clientHeight,
          width: ref.current.clientWidth,
        });
      }
    }

    // need to fire after first mount
    handleResize();

    // I debounced this, but it looks way nicer on resize when you don't
    const debounceResize = debounce(handleResize, 200);

    window.addEventListener('resize', debounceResize);
    return () => window.removeEventListener('resize', debounceResize);
  }, [ref]);

  return {
    windowDimensions,
    windowAspectRatio,
    windowIsPortrait,
    frameDims,
  };
}
