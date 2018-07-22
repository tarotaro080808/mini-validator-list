export default (dateStr: string) => {
  return (
    new Date(dateStr).toLocaleDateString() +
    " " +
    new Date(dateStr).toLocaleTimeString()
  );
};
