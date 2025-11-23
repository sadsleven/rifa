export function paginationHelper(
  page: number,
  refPage: number,
  rowsPerPage: number,
  rowsNumber: number
) {
  function calculateOffsetForPageGreaterThanRef() {
    if (page > refPage + 1) {
      return rowsPerPage * (page - 1);
    }
    return rowsPerPage * refPage;
  }

  function calculateOffsetForPageLessThanOrEqualRef() {
    if (page < 2) {
      return 0;
    }
    if (rowsNumber === rowsPerPage * page) {
      return rowsNumber - rowsPerPage;
    }
    return rowsPerPage * (page - 1);
  }

  const offset =
    page > refPage
      ? calculateOffsetForPageGreaterThanRef()
      : calculateOffsetForPageLessThanOrEqualRef();

  return offset;
}
