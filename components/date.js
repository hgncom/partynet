const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function DateComponent(props) {
  if (!props?.dateString) {
    console.warn('DateComponent received invalid props:', props);
    return null;
  }

  const { dateString } = props;
  
  try {
    // Ensure we have a valid date string in ISO format
    const isoDate = new Date(dateString).toISOString();
    const date = new Date(isoDate);
    
    const month = MONTHS[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    
    const displayDate = `${month} ${day}, ${year}`;
    return <time dateTime={isoDate}>{displayDate}</time>;
  } catch (error) {
    console.error('Error formatting date:', error, 'dateString:', dateString);
    return null;
  }
}
