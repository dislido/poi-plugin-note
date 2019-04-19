import * as React from 'react';
import { useState } from 'react';
import { Button, FormControl } from 'react-bootstrap';

interface NoteEditorProps {
  title?: string;
  text?: string;
  onSave: (title: string, text: string) => void;
  onCancel: (event: React.MouseEvent<Button, MouseEvent>) => void;
}
export default function NoteEditor({ title: initTitle = '', text: initText = '', onSave, onCancel }: NoteEditorProps) {
  const [text, setText] = useState(initText);
  const [title, setTitle] = useState(initTitle);

  return <>
    <Button onClick={() => onSave(title, text)}>确认</Button>
    <Button onClick={onCancel}>取消</Button>
    <FormControl onInput={e => setTitle(e.currentTarget.value)} value={title} placeholder="标题 不填时默认为内容第一行" />
    <textarea
      style={{ width: '100%', resize: 'none' }}
      rows={3}
      onInput={e => setText(e.currentTarget.value)}
      value={text}
      placeholder="笔记内容"
    />
  </>;
}
