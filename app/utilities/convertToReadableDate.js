import dayjs from 'dayjs';

export const convertToReadableDate = date =>
  dayjs(date.toDate()).format('DD MMM YY, h:mm a');
