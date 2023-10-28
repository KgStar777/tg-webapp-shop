import React, { useState, useCallback, useEffect, useMemo } from "react";
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";
import FilterPanel from "../FilterPanel/FilterPanel"
import data from "../../db/data";

import "./ProductList.css";

function filterData(data, filter) {
  // Копируем исходные данные, чтобы не изменять их
  let filteredData = [...data];

  // Фильтрация по категории
  if (filter.category.length > 0) {
    filteredData = filteredData.filter(item => filter.category.some(category => category.value === item.category));
  }

  // Фильтрация по цене
  // if (filter.price.length > 0) {
  //   filteredData = filteredData.filter(item => {
  //     // Здесь предполагается, что в вашем фильтре цены указаны минимальная и максимальная цены
  //     return item.price >= filter.price[0] && item.price <= filter.price[1];
  //   });
  // }

  // Фильтрация по цвету
  if (filter.colors.length > 0) {
    filteredData = filteredData.filter(item => filter.colors.some(color => color.value === item.color));
  }

  return filteredData;
}

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    console.log("items:", items)
    console.log("acc:", acc)
    return (acc += Number(item.price));
  }, 0);
};

const ProductList = () => {
  const [addedItems, setAddedItems] = useState([]);
  const [filter, setFilter] = useState({
    category: [],
    // price: [],
    colors: [],
  });

  console.log("filter: ", filter);

  const { tg, queryId } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId,
    };
    fetch("http://localhost:8000/web-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }, [addedItems]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  const onAdd = useCallback((product) => {
    const alreadyAdded = addedItems.find((item) => item.id === product.id);
    let newItems = [];

    if (alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }

    setAddedItems(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)}`,
      });
    }
  }, [addedItems]);

  const onFilterChange = (type, value) => {
    setFilter((prev) => {
      return ({
        ...prev, 
        [type]: [...value],
      })
    });
  }

  const filteredData = filterData(data, filter);

  return (
    <div className="page">
      <FilterPanel filter={filter} onChange={onFilterChange} />
      <div className="list">
        {filteredData.map((product, idx) => (
          <ProductItem
            key={idx}
            product={product}
            onAdd={onAdd}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
