import Link from 'next/link';

export default function Pagination({ totalPages, currentPage }) {
  const prevPage = parseInt(currentPage) - 1 > 0;
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages);

  return (
    <div>
      <nav>
        {!prevPage && (
          <a rel="previous" disabled={!prevPage}>
            Previous
          </a>
        )}
        {prevPage && (
          <Link href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`}>
            <a rel="previous">Previous</a>
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <a rel="next" disabled={!nextPage}>
            Next
          </a>
        )}
        {nextPage && (
          <Link href={`/blog/page/${currentPage + 1}`}>
            <a rel="next">Next</a>
          </Link>
        )}
      </nav>
    </div>
  )
}
