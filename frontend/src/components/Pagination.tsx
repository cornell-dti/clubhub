import React from 'react';
import { StyledPagination } from '../styling/StyledHome';

const Pagination = ({ cardsPerPage, totalCards, paginate }: Props ) => {
  const numPages = Math.ceil(totalCards / cardsPerPage);
  const pageNumbers = [];

  if (numPages > 1) {
    for (let i = 1; i <= numPages; i++) {
      pageNumbers.push(i);
    }
  }

  return (
    <StyledPagination>
      <ul>
        {pageNumbers.map(page => (
          <li key={page}>
            <a onClick={() => paginate(page)} href={'#page' + page}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </StyledPagination>
  );
};

export default Pagination

interface Props {
  cardsPerPage: number
  totalCards: number
  paginate(page: number): void
}