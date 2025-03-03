export const addItemToCart = (item, next) => {
  let cart = [];

  if (typeof window !== 'undefined') {
    const storedCart = localStorage.getItem('cart');

    if (storedCart) {
      try {
        cart = JSON.parse(storedCart);
        if (!Array.isArray(cart)) {
          cart = [];
        }
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        cart = [];
      }
    }

    cart.push({ ...item });
    localStorage.setItem('cart', JSON.stringify(cart));

    if (next) {
      next();
    }
  }
};

export const removeItemFromCart = (productId) => {
  let cart = [];

  if (typeof window !== 'undefined') {
    const storedCart = localStorage.getItem('cart');

    if (storedCart) {
      try {
        cart = JSON.parse(storedCart);
        if (!Array.isArray(cart)) {
          cart = [];
        }
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        cart = [];
      }
    }

    cart = cart.filter((item) => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));

    return cart;
  }
};

export const loadCart = () => {
  if (typeof window !== 'undefined') {
    const storedCart = localStorage.getItem('cart');

    if (storedCart) {
      try {
        return JSON.parse(storedCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        return [];
      }
    }
  }
};

export const emptyCart = (next) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('cart');
    next();
  }
};
