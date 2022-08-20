// only first word in a sentence
export const formatErrorMessage = error => {
  // const {code, message} = error;
  return error && error?.code
    ? error?.code
        .split('/')[1]
        .replace(/[^A-Z0-9.']+/gi, ' ')
        .replace(/^\w/, c => c.toUpperCase())
    : error && error?.message
    ? error?.message
    : error;
};
// // only first word in a sentence
// export const formatErrorMessage = (errorType, errorMessage) => {
//   return errorMessage
//     .replace(`${errorType}/`, '')
//     .replace(/[^A-Z0-9.']+/gi, ' ')
//     .replace(/^\w/, c => c.toUpperCase());
// return errorMessage.split('/').splice(1).join(' ').replace(/[^A-Z0-9.']+/ig, ' ').replace(/^\w/, c => c.toUpperCase())
// };

// // Every single word in a sentence
// const formatErrorMessagek = (errorMessage, errorType) => {
//   return errorMessage
//     .replace(`${errorType}/`, '')
//     .replace(/[^A-Z0-9.']+/gi, ' ')
//     .replace(/(^|\s)\S/g, _ => _.toUpperCase());
// };
