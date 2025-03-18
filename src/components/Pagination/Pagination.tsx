import ReactPaginate from 'react-paginate';
import React from 'react';
import styles from './Pagination.module.scss';

type PaginationProps = {
  onChangePage: any;
};

const Pagination: React.FC<PaginationProps> = ({ onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel='>'
      onPageChange={event => onChangePage(event.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={3}
      previousLabel='<'
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
