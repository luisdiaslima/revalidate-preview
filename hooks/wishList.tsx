import React, { createContext, useState, useContext, useCallback } from 'react'
import { useEffect } from 'react';

interface ProductData {
  id: string;
  title: string;
  available_ecommerce: boolean;
  summary?: string;
  image: {
    thumbnail: string;
  }
  discount_price: string;
}

interface WishListData {
  wishList: ProductData[];
  addToWishList(product: ProductData): void;
  removeFromWishList(product: ProductData): void;
  resetWishList(): void;
}

export const WishList = createContext<WishListData>({} as WishListData)

export const WishListProvider: React.FC = ({ children }) => {
  const [wishList, setWishList] = useState<ProductData[]>([] as ProductData[]);

  useEffect(() => {
    const list = localStorage.getItem("@wishlist");
    const replace_wish_list = JSON.parse(list as string);
    setWishList(replace_wish_list as ProductData[] || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("@wishlist", JSON.stringify(wishList));
  }, [wishList]);

  const removeFromWishList = useCallback(
    (product) => {
      const filterNewProducts = wishList?.length
        ? wishList.filter((item) => item.id !== product.id)
        : []
      setWishList(filterNewProducts);
    },
    [wishList]
  );

  const addToWishList = useCallback((product) => {
    if (wishList.find((item) => item.id === product.id)) {
      console.log('remove')
      removeFromWishList(product);
    } else {
      setWishList((oldList) => [...oldList, product]);
    }
  }, [removeFromWishList, wishList]);

  const resetWishList = useCallback(() => {
    setWishList([]);
  }, []);

  return (
    <WishList.Provider
      value={{
        wishList,
        addToWishList,
        removeFromWishList,
        resetWishList,
      }}
    >
      {children}
    </WishList.Provider>
  )
}

export function useWishList(): WishListData {
  const context = useContext(WishList)

  if (!context) throw new Error('useWishList error')

  return context
}