import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BLOG_POSTS as STATIC_POSTS } from '../data/catalog';

const Ctx = createContext(STATIC_POSTS);

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState(STATIC_POSTS);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/posts`)
      .then((r) => {
        if (Array.isArray(r.data) && r.data.length) setPosts(r.data);
      })
      .catch(() => {});
  }, []);
  return <Ctx.Provider value={posts}>{children}</Ctx.Provider>;
};

export const usePosts = () => useContext(Ctx);
