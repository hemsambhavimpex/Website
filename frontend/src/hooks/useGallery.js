import { useEffect, useState } from 'react';
import axios from 'axios';

export const useGallery = (fallback) => {
  const [tiles, setTiles] = useState(fallback);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/gallery`)
      .then((r) => {
        if (Array.isArray(r.data) && r.data.length) setTiles(r.data);
      })
      .catch(() => {});
  }, []);
  return tiles;
};
