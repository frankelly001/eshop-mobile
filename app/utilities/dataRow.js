const dataRow = (data, index, numColumns = 1, ItemComponent) => {
  if (index % numColumns !== 0) return null;

  const items = [];

  for (let i = index; i < index + numColumns; i++) {
    if (i >= data.length) {
      console.log('break');
      break;
    }

    items.push(
      // <ProductCardSampleLoader key={productsSample[i].product} />,
      ItemComponent(data[i]),
    );
  }

  return items;
};

export default dataRow;

// const dataRow2 = (data, index, numColumns = 1) => {
//     const items = [];
//     data.forEach((el, index) => {
//         if (index % numColumns !== 0) return null;
//         for (let i = index; i < index + numColumns; i++) {
//           if (i >= data.length) {
//             console.log('break');
//             break;
//           }

//           items.push(
//             // <ProductCardSampleLoader key={productsSample[i].product} />,
//             ItemComponent(data[i]),
//           );
//         }

//     })

//     return items;
//   };

//   export default dataRow2;
