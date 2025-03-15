import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/PizzaBlockSkeleton';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import React, { useState } from 'react';
import Pagination from '../components/Pagination/Pagination';
import { searchContex } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

export const Home = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector(state => state.filter.categoryId);
  const sortType = useSelector(state => state.sort.sortType);

  const { searchValue } = React.useContext(searchContex);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPageId] = useState(1);

  const onClickCategory = categoryId => {
    dispatch(setCategoryId(categoryId));
  };

  const search = searchValue ? `&search=${searchValue}` : '';

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://67c1bcee61d8935867e418dc.mockapi.io/items?page=${page}&limit=3&${categoryId > 0 ? `category=${categoryId}` : ''}` +
        '&sortBy=' +
        sortType.type +
        search,
    )
      .then(res => res.json())
      .then(json => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, page, search]);

  const pizzas = Array.isArray(items)
    ? items.map(obj => <PizzaBlock key={obj.id} {...obj} />)
    : [...new Array(0)];
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading ? skeletons : Array.isArray(items) && pizzas}
      </div>
      <Pagination onChangePage={page => setPageId(page)} />
    </div>
  );
};
