import React, { useState } from 'react';
import { Button, Form, Modal, SelectPicker } from 'rsuite';
import useAPI from '@hooks/useAPI';
import { useErrorHandler } from '@hooks/useErrorHandler';
import { CreateCardForm } from '@src/models/Forms';
import TextField from '@components/TextField';

interface NewCardModalProps {
  isCreating: boolean
  onCancel: () => void
  onCreated: () => void
}

const defaultForm: CreateCardForm = {
  department: '',
  name: '',
  type: 'T'
};

function NewCardModal(props: NewCardModalProps) {
  const API = useAPI();
  const errorHandler = useErrorHandler();

  const { isCreating, onCreated, onCancel } = props;

  const [formData, setFormData] = useState(defaultForm);

  async function submit() {
    try {
      await API.card.create(formData);
      onCreated();
    } catch (err) {
      errorHandler.handleError(err);
    }
  }

  return <Modal show={isCreating} onHide={onCancel}>
    <Modal.Header>
      <Modal.Title>核发新借书证</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form
        layout="horizontal"
        onChange={(formValue: any) => {
          setFormData(formValue);
        }}
        formValue={formData}
      >
        <TextField name="name" label="姓名"/>
        <TextField name="department" label="单位"/>
        <TextField
          name="type"
          accepter={SelectPicker}
          cleanable={false}
          data={[{ label: '教师', value: 'T' }, { label: '学生', value: 'S' }]}
          label="类型"/>
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

export default NewCardModal;
