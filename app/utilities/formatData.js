export const formatData = (data, numColumns) => {
  if (data.length > 0) {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({
        id: `empty${numberOfElementsLastRow}`,
        key: `blank-${numberOfElementsLastRow}`,
        empty: true,
      });
      numberOfElementsLastRow++;
    }

    return data;
  }
};
