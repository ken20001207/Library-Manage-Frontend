interface Borrow {
  uuid: string;
  cardNumber: string;
  bookNumber: string;
  borrowDate: Date;
  returnDate: Date | null;
}

export function parseBorrow(data: Borrow) {
  data.borrowDate = new Date(data.borrowDate);
  if (data.returnDate) data.returnDate = new Date(data.returnDate);
  return data;
}

export default Borrow;
