const cookPagination = ({ page, totalRecords, pageSize }) => {
  const totalPages = Math.ceil(totalRecords / pageSize);

  return {
    prev: {
      page: page - 1,
      isDisabled: page === 1,
    },
    next: {
      page: page + 1,
      isDisabled: page === totalPages,
    },
    pages: new Array(totalPages).fill(null).map((_, index) => index + 1),
  };
};

export default cookPagination;
