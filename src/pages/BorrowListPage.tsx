import React, { useEffect, useState } from 'react';
import useAPI from '@hooks/useAPI';
import { useErrorHandler } from '@hooks/useErrorHandler';
import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Row,
  Table
} from 'rsuite';
import NewCardModal from '@components/NewCardModal';
import { BorrowBookForm } from '@src/models/Forms';
import Borrow from '@src/models/Borrow';

const { Column, HeaderCell, Cell } = Table;

const defaultForm: BorrowBookForm = {
  bno: '',
  cno: ''
};

function BorrowListPage() {
  const API = useAPI();
  const errorHandler = useErrorHandler();

  const [formData, setFormData] = useState(defaultForm);
  const [cards, setCards] = useState<Borrow[]>([]);
  const [isCreatingCard, setCreatingCard] = useState(false);

  async function refresh() {
    try {
      const res = await API.borrow.getMany();
      setCards(res);
    } catch (err) {
      errorHandler.handleError(err);
    }
  }

  async function createBorrow() {
    try {
      await API.borrow.create(formData);
      await refresh();
    } catch (err) {
      errorHandler.handleError(err);
    }
  }

  async function returnBook(uuid: string) {
    try {
      await API.borrow.returnBook(uuid);
      await refresh();
    } catch (err) {
      errorHandler.handleError(err);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return <div style={{ padding: 60 }}>
    <h2>借阅管理</h2>

    <Row style={{ margin: '18px 0 36px 0' }}>
      <Form
        layout="inline"
        formValue={formData}
        onChange={(f: any) => setFormData(f)}>
        <FormGroup>
          <ControlLabel>借书证号</ControlLabel>
          <FormControl name="cno" style={{ width: 160 }}/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>书号</ControlLabel>
          <FormControl name="bno" style={{ width: 160 }}/>
        </FormGroup>
        <Button appearance="primary" onClick={createBorrow}>确认</Button>
      </Form>
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
          <p style={{ opacity: 0.8 }}>目前没有借书记录，请从上方新增或导入</p>
        </div>}
        height={400}
        data={cards}
      >
        <Column width={120} fixed>
          <HeaderCell>卡号</HeaderCell>
          <Cell dataKey="cardNumber"/>
        </Column>

        <Column width={160}>
          <HeaderCell>书号</HeaderCell>
          <Cell>{(d: Borrow) => !d.bookNumber
            ? '（书籍已被删除）'
            : d.bookNumber}</Cell>
        </Column>

        <Column width={200}>
          <HeaderCell>借书日期</HeaderCell>
          <Cell>{(c: Borrow) => c.borrowDate.toDateString()}</Cell>
        </Column>

        <Column width={200}>
          <HeaderCell>还书日期</HeaderCell>
          <Cell>{(c: Borrow) => c.returnDate === null
            ? '尚未归还'
            : c.returnDate.toDateString()}</Cell>
        </Column>

        <Column width={120} fixed="right">
          <HeaderCell>操作</HeaderCell>
          <Cell>
            {(rowData: Borrow) => {
              return (
                <div>
                  {rowData.returnDate === null ?
                    <Button
                      size="xs"
                      style={{ marginRight: 12 }}
                      appearance="primary"
                      onClick={() => returnBook(rowData.uuid)}
                    >
                      归还
                    </Button> : <div/>}
                </div>
              );
            }}
          </Cell>
        </Column>
      </Table>
    </div>

    <NewCardModal
      isCreating={isCreatingCard}
      onCancel={() => setCreatingCard(false)}
      onCreated={() => {
        refresh();
        setCreatingCard(false);
      }}/>
  </div>;
}

export default BorrowListPage;
