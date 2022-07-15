export const formatToCurrency = amount => {
  return (
    amount &&
    '₦' +
      amount
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,')
        .split('.')[0]
    // amount && '₦' + amount.replace(/\d(?=(\d{3})+\.)/g, '$&,').split('.')[0]
  );
};
