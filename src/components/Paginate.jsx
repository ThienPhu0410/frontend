import React from 'react';
import { Pagination } from 'react-bootstrap';
import './styles/Paginate.css';
const Paginate = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null; // Don't render pagination if there's only one page
  }

  const renderPageItems = () => {
    const pageItems = [];
    const visiblePages = 5; // Number of visible page numbers in the pagination

    let startPage = currentPage - Math.floor(visiblePages / 2);
    startPage = Math.max(startPage, 1);
    const endPage = Math.min(startPage + visiblePages - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageItems.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    return pageItems;
  };

  return (
    <Pagination className="justify-content-center">
      <Pagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {renderPageItems()}
      <Pagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default Paginate;
