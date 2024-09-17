export const formatISODate = (dateString) => {
  const date = new Date(dateString);

  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${month}/${day}/${year}`;
};
