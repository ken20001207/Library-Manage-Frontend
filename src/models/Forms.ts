export interface CreateBookForm {
  bookNumber: string
  title: string
  press: string
  year: string
  city: string
  author: string
  category: string
  price: number
  total: number
}

export interface UpdateBookForm {
  title: string
  press: string
  year: string
  city: string
  author: string
  category: string
  price: number
  total: number
  stock: number
}

export interface CreateCardForm {

}

export interface UpdateCardForm {

}

export interface BorrowBookForm {

}

export interface ReturnBookForm {

}
