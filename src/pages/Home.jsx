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
import axios from 'axios';
import { setPageCount } from '../redux/slices/pageSlice';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryId = useSelector(state => state.filter.categoryId);
  const sortType = useSelector(state => state.sort.sortType);
  const page = useSelector(state => state.page.pageCount);

  const { searchValue } = React.useContext(searchContex);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onClickCategory = categoryId => {
    dispatch(setCategoryId(categoryId));
  };

  const onClickPage = page => {
    dispatch(setPageCount(page));
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
    }
  }, []);

  const search = searchValue ? `&search=${searchValue}` : '';

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://67c1bcee61d8935867e418dc.mockapi.io/items?page=${page}&limit=3&${categoryId > 0 ? `category=${categoryId}` : ''}` +
          '&sortBy=' +
          sortType.type +
          search,
      )
      .then(response => {
        setItems(response.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, page]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      sortType: sortType,
      categoryId: categoryId,
      page: page,
    });
    navigate(`?${queryString}`);
  }, [categoryId, sortType, page]);

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
