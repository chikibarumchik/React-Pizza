import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/PizzaBlockSkeleton';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import React from 'react';
import Pagination from '../components/Pagination/Pagination';
import qs from 'qs';
import { searchContex } from '../App';
import { useSelector } from 'react-redux';
import { filterState, setCategoryId } from '../redux/slices/filterSlice';
import { pageState, setPageCount } from '../redux/slices/pageSlice';
import { useNavigate } from 'react-router-dom';
import { fetchPizzas, pizzaState } from '../redux/slices/pizzasSlice';
import { sortState } from 'src/redux/slices/sortSlice';
import { useAppDispatch } from 'src/redux/store';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categoryId = useSelector(filterState).categoryId;
  const sortType = useSelector(sortState).sortType;
  const page = useSelector(pageState).pageCount;
  const { items, isLoading } = useSelector(pizzaState);

  const { searchValue } = React.useContext(searchContex);

  const onClickCategory = (categoryId: number) => {
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

  console.log(items);

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
      <Pagination onChangePage={onClickPage} />
    </div>
  );
};
