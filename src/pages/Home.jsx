import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/PizzaBlockSkeleton';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import React from 'react';
import Pagination from '../components/Pagination/Pagination';
import qs from 'qs';
import { searchContex } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';
import { setPageCount } from '../redux/slices/pageSlice';
import { useNavigate } from 'react-router-dom';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryId = useSelector(state => state.filter.categoryId);
  const sortType = useSelector(state => state.sort.sortType);
  const page = useSelector(state => state.page.pageCount);
  const pizzaItems = useSelector(state => state.pizzas.items);
  const isLoading = useSelector(state => state.pizzas.isLoading);

  const { searchValue } = React.useContext(searchContex);

  const onClickCategory = categoryId => {
    dispatch(setCategoryId(categoryId));
  };

  const onClickPage = page => {
    dispatch(setPageCount(page));
  };

  const getPizzas = async () => {
    const sortBy = `&sortBy=${sortType.type.replace('-', '')}`;
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        category,
        search,
        page,
      }),
    );
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    getPizzas();
  }, [categoryId, sortType, searchValue, page]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      sortType: sortType,
      categoryId: categoryId,
      page: page,
    });
    navigate(`?${queryString}`);
  }, [categoryId, sortType, page]);

  const pizzas = Array.isArray(pizzaItems)
    ? pizzaItems.map(obj => <PizzaBlock key={obj.id} {...obj} />)
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
        {isLoading ? skeletons : Array.isArray(pizzaItems) && pizzas}
      </div>
      <Pagination onChangePage={onClickPage} />
    </div>
  );
};
