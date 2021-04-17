import { API_URL } from '@src/config';
import Book from '@src/models/Book';
import { CreateBookForm } from '@src/models/Forms';

function useAPI() {

  function callAPI(url: string, method: 'GET' | 'POST' | 'DELETE' = 'GET',
    body?: FormData) {
    return fetch(API_URL + url, { method, body });
  }

  return {
    book: {
      get: async (bookNumber: string) => {

      },
      getMany: async () => {
        const res = await callAPI('/book');
        const parsedRes = await res.json();
        if (!res.ok) throw parsedRes;
        return parsedRes as Book[];
      },
      update: () => {

      },
      create: async (data: CreateBookForm) => {
        const req = new FormData();
        req.append('bno', data.bookNumber);
        req.append('title', data.title);
        req.append('press', data.press);
        req.append('year', data.year);
        req.append('city', data.city);
        req.append('author', data.author);
        req.append('category', data.category);
        req.append('price', data.price.toString());
        req.append('total', data.total.toString());
        const res = await callAPI('/book', 'POST', req);
        const parsedRes = await res.json();
        if (!res.ok) throw parsedRes;
        return parsedRes as Book;
      },
      delete: async (bookNumber: string) => {
        const res = await callAPI(`/book/${bookNumber}`, 'DELETE');
        if (!res.ok) throw await res.json();
      }
    },
    card: {
      get: async (cardNumber: string) => {

      },
      getMany: () => {

      },
      update: () => {

      },
      create: () => {

      }
    },
    borrow: {
      get: async (uuid: string) => {

      },
      getMany: () => {

      },
      update: () => {

      },
      create: () => {

      }
    }
  };
}

export default useAPI;
