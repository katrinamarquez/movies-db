import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  // need to have an array of page numbers

  const pagesCount = Math.ceil(itemsCount / pageSize);
  // + 1 to include the last page
  if (pagesCount === 1 ) return null;
  const pages = _.range(1, pagesCount + 1)
  // then map page numbers to page item

  return (
  <nav>
    <ul class="pagination">
      {pages.map(page => (
        <li key={page} className={ page === currentPage ? 'page-item active' : 'page-item' }>
          <a className="page-link" onClick={() => onPageChange(page)}>
            {page}
          </a>
      </li>
      ))}
    </ul>
  </nav>
)}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired, 
  pageSize: PropTypes.number.isRequired, 
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired 
}
 
export default Pagination;