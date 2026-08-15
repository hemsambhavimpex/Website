import { useEffect } from 'react';

export const useSEO = (title, description) => {
  useEffect(() => {
    document.title = title;
    let m = document.querySelector('meta[name="description"]');
    if (m && description) m.setAttribute('content', description);
    let og = document.querySelector('meta[property="og:title"]');
    if (og) og.setAttribute('content', title);
    let ogd = document.querySelector('meta[property="og:description"]');
    if (ogd && description) ogd.setAttribute('content', description);
  }, [title, description]);
};
