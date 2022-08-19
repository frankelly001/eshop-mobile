// only first word in a sentence
export const formatErrorMessage = ({code}) => {
  return code
    .split('/')[1]
    .replace(/[^A-Z0-9.']+/gi, ' ')
    .replace(/^\w/, c => c.toUpperCase());
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
