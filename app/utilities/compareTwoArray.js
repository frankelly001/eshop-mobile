export const compareTwoArray = (arr1, arr2) => {
  return (
    JSON.stringify(arr1).toLowerCase() == JSON.stringify(arr2).toLowerCase()
  );
};
