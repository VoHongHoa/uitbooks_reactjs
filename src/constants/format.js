const formatPrice = (price) => {
  let formatPrice = price.toLocaleString("en-US");
  return `${formatPrice} đ`;
};
export { formatPrice };
