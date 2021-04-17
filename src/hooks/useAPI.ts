import { API_URL } from '@src/config';
import Book from '@src/models/Book';
import { CreateBookForm, CreateCardForm } from '@src/models/Forms';
import Card from '@src/models/Card';
import Borrow from '@src/models/Borrow';

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
      getMany: async () => {
        const res = await callAPI('/card');
        const parsedRes = await res.json();
        if (!res.ok) throw parsedRes;
        return parsedRes as Card[];
      },
      update: () => {

      },
      create: async (data: CreateCardForm) => {
        const req = new FormData();
        req.append('department', data.department);
        req.append('name', data.name);
        req.append('type', data.type);
        const res = await callAPI('/card', 'POST', req);
        const parsedRes = await res.json();
        if (!res.ok) throw parsedRes;
        return parsedRes as Card;
      },
      delete: async (cardNumber: string) => {
        const res = await callAPI(`/book/${cardNumber}`, 'DELETE');
        if (!res.ok) throw await res.json();
      }
    },
    borrow: {
      get: async (uuid: string) => {

      },
      getMany: async () => {
        const res = await callAPI('/borrow');
        const parsedRes = await res.json();
        if (!res.ok) throw parsedRes;
        return parsedRes as Borrow[];
      },
      update: () => {

      },
      create: () => {

      },
    }
  };
}

export default useAPI;
