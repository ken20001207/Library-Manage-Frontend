import React, { useState } from 'react';
import { Button, Form, InputNumber, Modal } from 'rsuite';
import useAPI from '@hooks/useAPI';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { CreateBookForm } from '@src/models/Forms';
import TextField from '@components/TextField';

interface NewBookModalProps {
  isCreating: boolean
  onCancel: () => void
  onCreated: () => void
}

const defaultForm: CreateBookForm = {
  author: '',
  bookNumber: '',
  category: '',
  city: '',
  press: '',
  price: 0,
  title: '',
  total: 0,
  year: ''
};

function NewBookModal(props: NewBookModalProps) {
  const API = useAPI();
  const errorHandler = useErrorHandler();

  const { isCreating, onCreated, onCancel } = props;

  const [formData, setFormData] = useState(defaultForm);

  async function submit() {
    try {
      await API.book.create(formData);
      onCreated();
    } catch (err) {
      errorHandler.handleError(err);
    }
  }

  return <Modal show={isCreating} onHide={onCancel}>
    <Modal.Header>
      <Modal.Title>手动录入书籍</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form
        layout="horizontal"
        onChange={(formValue: any) => {
          setFormData(formValue);
        }}
        formValue={formData}
      >
        <TextField name="bookNumber" label="书号"/>
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

export default NewBookModal;
