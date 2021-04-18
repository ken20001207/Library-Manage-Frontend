import { API_URL } from '@src/config';
import Book from '@src/models/Book';
import {
  BorrowBookForm,
  CreateBookForm,
  CreateCardForm
} from '@src/models/Forms';
import Card from '@src/models/Card';
import Borrow, { parseBorrow } from '@src/models/Borrow';
import { GetManyBookQueryParams } from '@src/models/Querys';

const camelToSnakeCase = (str: string) =>
  str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

function withQuery(path: string, query: Object) {
  let newPath = path + '?';
  Object.entries(query).forEach(
    ([key, value]) =>
      newPath += `&${camelToSnakeCase(key)}=${value}`
  );
  return newPath;
}

function useAPI() {

  function callAPI(url: string, method: 'GET' | 'POST' | 'DELETE' = 'GET',
    body?: FormData) {
    return fetch(API_URL + url, { method, body });
  }

  return {
    book: {
      getMany: async (query: GetManyBookQueryParams) => {
        const res = await callAPI(withQuery('/book', query));
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
      getMany: async () => {
        const res = await callAPI('/borrow');
        const parsedRes = await res.json();
        if (!res.ok) throw parsedRes;
        return parsedRes.map((b: Borrow) => parseBorrow(b)) as Borrow[];
      },
      returnBook: async (uuid: string) => {
        const res = await callAPI(`/borrow/${uuid}`, 'POST');
        const parsedRes = await res.json();
        if (!res.ok) throw parsedRes;
      },
      create: async (data: BorrowBookForm) => {
        const req = new FormData();
        req.append('bno', data.bno);
        req.append('cno', data.cno);
        const res = await callAPI('/borrow', 'POST', req);
        const parsedRes = await res.json();
        if (!res.ok) throw parsedRes;
        return parseBorrow(parsedRes) as Borrow;
      },
    }
  };
}

export default useAPI;
