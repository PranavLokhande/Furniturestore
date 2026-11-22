import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop
 * Globally resets scroll position to (0, 0) upon route transitions
 * while respecting anchor/hash navigation and avoiding page reloads.
 */
export const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // If navigating to an in-page anchor (#section), scroll into view smoothly
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // Temporarily disable smooth scrolling on <html> so the scroll jumps to top instantly
    // without lagging or getting stuck midway due to lazy loaded page components
    const html = document.documentElement;
    const originalScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';

    window.scrollTo(0, 0);
    html.scrollTop = 0;
    document.body.scrollTop = 0;

    // Restore original scroll behavior on the next animation frame
    requestAnimationFrame(() => {
      html.style.scrollBehavior = originalScrollBehavior;
    });
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
