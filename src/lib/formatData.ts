export const formatDate = (date: Date) => {
  // this function displays the date in the format of dd/mm/yy
  if (isNaN(date.getTime())) return "Invalid Date";

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
  const year = date.getFullYear().toString().slice(-2); 

  return `${day}/${month}/${year}`;
};

export const formatPriceWithCommas = (price: number) => {
  // this function adds commas to the price
  return price.toLocaleString().replace(/,/g, ", ")
}
  