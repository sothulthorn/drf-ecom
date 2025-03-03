import React from 'react';

const ImageHelper = ({ product }) => {
  const imageurl = product
    ? product.image
    : `https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`;

  return (
    <div className="rouned border border-success p-2">
      <img
        src={imageurl}
        style={{ maxHeight: '100%', maxWidth: '100%' }}
        className="mb-3 rounded"
        alt=""
      />
    </div>
  );
};

export default ImageHelper;
