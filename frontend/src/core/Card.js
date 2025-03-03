import React from 'react';
import { Redirect } from 'react-router-dom';

import ImageHelper from './helper/imageHelper';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';

// TODO: Deal with this later
const isAuthenticated = true;

const Card = ({ product, addToCart = true, removeFromCart = false }) => {
  const cartTitle = product ? product.name : 'A photo from pexels';
  const cartDescription = product ? product.description : 'Default description';
  const cartPrice = product ? product.price : 'Default';

  const handleAddToCart = () => {
    if (isAuthenticated) {
      addItemToCart(product, () => {});
      console.log('Added to cart');
    } else {
      console.log('Login please!');
    }
  };

  const handleRemoveFromCart = () => {
    if (isAuthenticated) {
      removeItemFromCart(product.id);
      console.log('Removed from cart');
    } else {
      console.log('Login please!');
    }
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <button
          onClick={handleAddToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={handleRemoveFromCart}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cartTitle}</div>
      <div className="card-body">
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap mt-2 mb-2">
          {cartDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
        <div className="row">
          <div className="col-12">{showAddToCart(addToCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
