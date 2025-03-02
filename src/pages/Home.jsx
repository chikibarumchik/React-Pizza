import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/PizzaBlockSkeleton';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import React, { useState } from 'react';

export const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sort: 'rating',
  });

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://67c1bcee61d8935867e418dc.mockapi.io/items?${categoryId > 0 ? `category=${categoryId}` : ''}` +
        '&sortBy=' +
        sortType.sort,
    )
      .then(res => res.json())
      .then(json => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          value={categoryId}
          onClickCategory={id => setCategoryId(id)}
        />
        <Sort value={sortType} onChageSort={id => setSortType(id)} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : Array.isArray(items) &&
            items.map(obj => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};
