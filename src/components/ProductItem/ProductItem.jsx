import React from 'react';
import Button from "../Button/Button";

import './ProductItem.css';

const ProductItem = ({ product, onAdd }) => {

  const onAddHandler = () => {
    onAdd(product);
  }

  return (
    <div className="product">
      <div className={'img'}>
        <img src={product.img} alt={product.title} className="card-img" />
      </div>
      <div className={'title'}>{product.title}</div>
      <div className={'price'}>
          <span>Стоимость: <b>{product.price}$</b></span>
      </div>
      <section className="card-reviews">
        <div>{product.star}{product.star}{product.star}{product.star}</div>
        <span className="total-reviews">{product.reviews}</span>
      </section>
      <Button className={'add-btn'} onClick={onAddHandler}>
        Добавить в корзину
      </Button>
    </div>
  );
};

export default ProductItem;
