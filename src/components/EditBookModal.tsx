import React, { useEffect, useState } from 'react';
import { Button, Form, InputNumber, Modal, Notification } from 'rsuite';
import useAPI from '@hooks/useAPI';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { UpdateBookForm } from '@src/models/Forms';
import TextField from '@components/TextField';
import Book from '@src/models/Book';

interface EditBookModalProps {
  onCancel: () => void
  onEdited: () => void
  editingBook: Book | undefined
}

const defaultForm: UpdateBookForm = {
  stock: 0,
  author: '',
  category: '',
  city: '',
  press: '',
  price: 0,
  title: '',
  total: 0,
  year: ''
};

function EditBookModal(props: EditBookModalProps) {
  const API = useAPI();
  const errorHandler = useErrorHandler();

  const { onEdited, onCancel, editingBook } = props;

  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => {
    if (editingBook) {
      setFormData({ ...editingBook });
    }
  }, [editingBook]);

  async function submit() {
    if (!editingBook) return;
    if (formData.stock > formData.total) {
      Notification.error(
        { title: '更新失败', description: '库存量不得大于总量', placement: 'bottomStart' });
      return;
    }
    try {
      await API.book.update(editingBook.bookNumber, formData);
      onEdited();
    } catch (err) {
      errorHandler.handleError(err);
    }
  }

  return <Modal show={editingBook !== undefined} onHide={onCancel}>
    <Modal.Header>
      <Modal.Title>编辑书籍信息</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form
        layout="horizontal"
        onChange={(formValue: any) => {
          setFormData(formValue);
        }}
        formValue={formData}
      >
        <TextField readOnly name="bookNumber" label="书号"/>
        <TextField name="title" label="书名"/>
        <TextField name="author" label="作者"/>
        <TextField name="category" label="分类"/>
        <TextField name="year" label="年份"/>
        <TextField name="press" label="出版商"/>
        <TextField
          name="price"
          accepter={InputNumber}
          postfix="￥"
          label="售价"/>
        <TextField name="total" accepter={InputNumber} label="总库存量"/>
        <TextField name="stock" accepter={InputNumber} label="剩余存量"/>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={submit} appearance="primary">
        送出
      </Button>
      <Button onClick={onCancel} appearance="subtle">
        取消
      </Button>
    </Modal.Footer>
  </Modal>;
}

export default EditBookModal;
