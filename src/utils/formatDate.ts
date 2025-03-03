const useDateFormatter = (date: string) => {
  return new Date(date).toLocaleString('en-US');
}

export default useDateFormatter;