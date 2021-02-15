import { useState, useEffect } from 'react';
import debounce from 'debounce';

export default function useScrollPosition() {
  // get scroll position to determine when the user has scrolled
  const [scrollPosition, setScrollPosition] = useState(0);

  // get anchor positions for scrollspy
  // based on assumption that anchors will be tagged with .anchor class
  const [anchorPositions, setAnchorPositions] = useState();

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);

      // then update anchor positions
      const positions = [];
      document.querySelectorAll('.anchor').forEach((anchor) => {
        positions.push({
          id: anchor.id,
          top: anchor.getBoundingClientRect().top + window.pageYOffset,
        });
      });

      const documentEnd = document.body.scrollHeight - window.innerHeight;

      positions.push({
        id: 'doc-end',
        top: documentEnd,
      });

      setAnchorPositions(positions);
    };

    // fire when user is finished scrolling
    const debouncedScroll = debounce(handleScroll, 100);
    window.addEventListener('scroll', debouncedScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { scrollPosition, anchorPositions };
}
