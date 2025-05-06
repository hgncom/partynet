import { parseISO, format } from 'date-fns';

export default function Date({ dateString }) {
  // Use a fixed format pattern that will be consistent between server and client
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'yyyy-MM-dd')}</time>;
}
