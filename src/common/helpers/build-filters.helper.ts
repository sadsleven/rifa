export const buildFiltersHelper = (filters: any[]): null | object => {
  let filter: null | object = {};

  if (!filters.length) {
    return null;
  }
  filters.forEach((item) => {
    if (item === 'unable' || item === 'enable') {
      filter = { ...filter, ...{ enable: item === 'enable' } };
    } else {
      filter = { ...filter, ...{ [item]: true } };
    }
  });
  return filter;
};
