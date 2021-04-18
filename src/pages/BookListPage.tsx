import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  ControlLabel,
  Divider,
  Form,
  FormControl,
  FormGroup,
  Icon,
  Notification,
  Row,
  Table,
  Uploader
} from 'rsuite';
import Book from '@src/models/Book';
import useAPI from '@hooks/useAPI';
import { useErrorHandler } from '@hooks/useErrorHandler';
import NewBookModal from '@components/NewBookModal';
import { API_URL } from '@src/config';
import { GetManyBookQueryParams } from '@src/models/Querys';

const { Column, HeaderCell, Cell } = Table;

const defaultQueries: GetManyBookQueryParams = {
  author: '',
  bookNumber: '',
  category: '',
  city: '',
  press: '',
  priceBottom: 0,
  priceTop: 10000,
  title: '',
  yearBottom: 0,
  yearTop: 2023
};

function BookListPage() {
  const API = useAPI();
  const errorHandler = useErrorHandler();

  const [books, setBooks] = useState<Book[]>([]);
  const [isCreatingBook, setCreatingBook] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [queries, setQueries] = useState(defaultQueries);

  async function refresh(queries: GetManyBookQueryParams) {
    setLoading(true);
    try {
      const res = await API.book.getMany(queries);
      setBooks(res);
    } catch (err) {
      errorHandler.handleError(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteBook(bookNumber: string) {
    try {
      await API.book.delete(bookNumber);
      await refresh(queries);
    } catch (err) {
      errorHandler.handleError(err);
    }
  }

  useEffect(() => {
    refresh(defaultQueries);
  }, []);

  return <div style={{ padding: 60 }}>
    <h2>图书管理</h2>

    <Row style={{ margin: '18px 0 36px 0' }}>
      <Col xs={3}>
        <Button
          appearance="primary"
          onClick={() => setCreatingBook(true)}>
          <Icon icon="plus"/>手动录入书籍
        </Button>
      </Col>
      <Col xs={3}>
        <Uploader
          action={API_URL + '/books'}
          fileList={uploadingFiles}
          onChange={file => setUploadingFiles(file)}
          onError={(err: any) => {
            errorHandler.handleError(err.response);
            setUploadingFiles([]);
          }}
          onSuccess={(res) => {
            console.log(res);
            Notification.success(
              {
                title: '导入成功',
                description: '已经成功从文件导入 ' + res + ' 本书籍',
                placement: 'bottomStart'
              });
            setUploadingFiles([]);
            refresh(queries);
          }}>
          <Button>
            <Icon icon="download"/>批量导入书籍
          </Button>
        </Uploader>
      </Col>
    </Row>

    <Divider/>

    <Form
      layout="inline"
      formValue={queries}
      onChange={(f: any) => setQueries(f)}>
      <FormGroup>
        <ControlLabel>书号</ControlLabel>
        <FormControl name="bookNumber" style={{ width: 160 }}/>
      </FormGroup>

      <FormGroup>
        <ControlLabel>书名</ControlLabel>
        <FormControl name="title" style={{ width: 160 }}/>
      </FormGroup>

      <FormGroup>
        <ControlLabel>类别</ControlLabel>
        <FormControl name="category" style={{ width: 160 }}/>
      </FormGroup>

      <FormGroup>
        <ControlLabel>出版社</ControlLabel>
        <FormControl name="press" style={{ width: 160 }}/>
      </FormGroup>

      <FormGroup>
        <ControlLabel>作者</ControlLabel>
        <FormControl name="author" style={{ width: 160 }}/>
      </FormGroup>

      <FormGroup>
        <ControlLabel>年份下限</ControlLabel>
        <FormControl name="yearBottom" style={{ width: 60 }}/>
      </FormGroup>

      <FormGroup>
        <ControlLabel>年份上限</ControlLabel>
        <FormControl name="yearTop" style={{ width: 60 }}/>
      </FormGroup>

      <FormGroup>
        <ControlLabel>价格下限</ControlLabel>
        <FormControl name="priceBottom" style={{ width: 80 }}/>
      </FormGroup>

      <FormGroup>
        <ControlLabel>价格上限</ControlLabel>
        <FormControl name="priceTop" style={{ width: 80 }}/>
      </FormGroup>

      <Button appearance="primary" onClick={() => refresh(queries)}>查询</Button>
      <Button
        appearance="subtle"
        onClick={() => {
          setQueries(defaultQueries);
          refresh(defaultQueries);
        }}>重置</Button>
    </Form>

    <div style={{ borderRadius: 24, padding: 18, backgroundColor: 'white' }}>
      <Table
        loading={isLoading}
        renderEmpty={() => <div
          style={{
            width: '100%',
            height: 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <p style={{ opacity: 0.8 }}>没有符合查询条件的书籍，或当前数据库中没有书籍</p>
        </div>}
        height={600}
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

        <Column width={120}>
          <HeaderCell>出版商</HeaderCell>
          <Cell dataKey="press"/>
        </Column>

        <Column width={100}>
          <HeaderCell>年份</HeaderCell>
          <Cell dataKey="year"/>
        </Column>

        <Column width={100}>
          <HeaderCell>价格</HeaderCell>
          <Cell dataKey="price"/>
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
        refresh(queries);
        setCreatingBook(false);
      }}/>
  </div>;
}

export default BookListPage;
