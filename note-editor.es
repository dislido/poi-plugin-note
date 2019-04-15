import React, { useState } from 'react';
import { Button, InputGroup, FormControl, Form } from 'react-bootstrap';

const noop = () => {};

export default function NoteEditor({ initTitle = '', initText = '', onSave, onCancel }) {
  const [text, setText] = useState(initText);
  const [title, setTitle] = useState(initTitle);

  return <>
    <Button onClick={() => onSave(title, text)} variant="outline-secondary">确认</Button>
    <Button onClick={onCancel} variant="outline-secondary">取消</Button>
    <FormControl onInput={e => setTitle(e.target.value)} value={title} placeholder="标题 不填时默认为内容第一行" />
    <textarea
      style={{ width: '100%', resize: 'none' }}
      rows="3"
      onInput={e => setText(e.target.value)}
      value={text}
      placeholder="笔记内容"
    />
  </>;
}