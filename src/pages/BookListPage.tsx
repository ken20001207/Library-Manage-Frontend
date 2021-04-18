import React, { useEffect, useState } from 'react';
import { Button, Icon, Row, Table } from 'rsuite';
import Book from '@src/models/Book';
import useAPI from '@hooks/useAPI';
import { useErrorHandler } from '@hooks/useErrorHandler';
import NewBookModal from '@components/NewBookModal';

const { Column, HeaderCell, Cell } = Table;

function BookListPage() {
  const API = useAPI();
  const errorHandler = useErrorHandler();

  const [books, setBooks] = useState<Book[]>([]);
  const [isCreatingBook, setCreatingBook] = useState(false);

  async function refresh() {
    try {
      const res = await API.book.getMany();
      setBooks(res);
    } catch (err) {
      errorHandler.handleError(err);
    }
  }

  async function deleteBook(bookNumber: string) {
    try {
      await API.book.delete(bookNumber);
      await refresh();
    } catch (err) {
      errorHandler.handleError(err);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return <div style={{ padding: 60 }}>
    <h2>图书管理</h2>

    <Row style={{ margin: '18px 0 36px 0' }}>
      <Button
        style={{ marginRight: 18 }}
        appearance="primary"
        onClick={() => setCreatingBook(true)}>
        <Icon icon="plus"/>手动录入书籍
      </Button>
      <Button appearance="primary">
        <Icon icon="download"/>批量导入书籍
      </Button>
    </Row>

    <div style={{ borderRadius: 24, padding: 18, backgroundColor: 'white' }}>
      <Table
        renderEmpty={() => <div
          style={{
            width: '100%',
            height: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <p style={{ opacity: 0.8 }}>目前没有图书，请从上方新增或导入</p>
        </div>}
        height={400}
        data={books}
      >
        <Column width={120} fixed>
          <HeaderCell>书号</HeaderCell>
          <Cell dataKey="bookNumber"/>
        </Column>

        <Column width={200} fixed>
          <HeaderCell>书名</HeaderCell>
          <Cell dataKey="title"/>
        </Column>

        <Column width={100}>
          <HeaderCell>作者</HeaderCell>
          <Cell dataKey="author"/>
        </Column>

        <Column width={200}>
          <HeaderCell>出版商</HeaderCell>
          <Cell dataKey="press"/>
        </Column>

        <Column width={100}>
          <HeaderCell>年份</HeaderCell>
          <Cell dataKey="year"/>
        </Column>

        <Column width={100}>
          <HeaderCell>库存</HeaderCell>
          <Cell>{(b: Book) => <p>{b.stock}/{b.total}</p>}</Cell>
        </Column>

        <Column width={120} fixed="right">
          <HeaderCell>操作</HeaderCell>
          <Cell>
            {(rowData: Book) => {
              return (
                <div>
                  <Button
                    size="xs"
                    style={{ marginRight: 12 }}
                    appearance="primary"
                    onClick={() => deleteBook(rowData.bookNumber)}
                  >
                    编辑
                  </Button>
                  <Button
                    size="xs"
                    appearance="subtle"
                    onClick={() => deleteBook(rowData.bookNumber)}
                  >
                    删除
                  </Button>
                </div>
              );
            }}
          </Cell>
        </Column>
      </Table>
    </div>

    <NewBookModal
      isCreating={isCreatingBook}
      onCancel={() => setCreatingBook(false)}
      onCreated={() => {
        refresh();
        setCreatingBook(false);
      }
      }/>
  </div>;
}

export default BookListPage;
