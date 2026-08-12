import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { PRODUCTS as STATIC_PRODUCTS } from '../data/catalog';

const Ctx = createContext(STATIC_PRODUCTS);

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(STATIC_PRODUCTS);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/products`)
      .then((r) => {
        if (Array.isArray(r.data) && r.data.length) setProducts(r.data);
      })
      .catch(() => {});
  }, []);
  return <Ctx.Provider value={products}>{children}</Ctx.Provider>;
};

export const useProducts = () => useContext(Ctx);
