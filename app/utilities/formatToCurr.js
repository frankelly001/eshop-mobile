export const formatToCurrency = amount => {
  return amount && typeof amount === 'number'
    ? '₦' +
        amount
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, '$&,')
          .split('.')[0]
    : null;
  // amount && '₦' + amount.replace(/\d(?=(\d{3})+\.)/g, '$&,').split('.')[0]
};
