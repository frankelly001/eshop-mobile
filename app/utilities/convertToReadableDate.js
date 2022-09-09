import dayjs from 'dayjs';

export const convertToReadableDateAndTime = date =>
  dayjs(typeof date === 'number' ? date : date.toDate()).format(
    'DD MMM YY, h:mm a',
  );
// export const convertToReadableDate = date =>
//   dayjs(date.toDate()).format('DD MMM YY, h:mm a')

export const convertToCurrentDateAndTime = date =>
  dayjs(date).format('DD MMM YY, h:mm a');
