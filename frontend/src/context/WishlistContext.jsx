import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('mittimart-wishlist');
      return saved ? JSON.parse(saved) : ["bandhani-dupatta-sunrise", "pashmina-shawl-kashmir-mist"];
    } catch {
      return ["bandhani-dupatta-sunrise", "pashmina-shawl-kashmir-mist"];
    }
  });

  useEffect(() => {
    localStorage.setItem('mittimart-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const isWishlisted = (slug) => wishlist.includes(slug);

  const toggleWishlist = (slug) => {
    setWishlist((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((item) => item !== slug);
      } else {
        return [...prev, slug];
      }
    });
  };

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isWishlisted,
        toggleWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
