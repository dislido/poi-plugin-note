import * as React from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import NoteEditor from './note-editor';

function getTitle(text: string) {
  return text.split('\n')[0];
}

interface NoteProps {
  title: string;
  text: string;
  onSave: (title: string, text: string) => void;
  onDelete: () => void;
}
export default function Note({ title, text, onSave, onDelete }: NoteProps) {
  const [editmode, setEditmode] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const showTitle = title || !showDetail;

  const deleteHandler = (e: React.MouseEvent<Button, MouseEvent>) => {
    e.stopPropagation();
    onDelete();
  }
  if (editmode) return (
    <NoteEditor
      title={title}
      text={text}
      onSave={(title, text) => {
        onSave(title, text);
        setEditmode(false);
      }}
      onCancel={() => setEditmode(false)}
    />
  );
  return <div className="note-card" onClick={() => setShowDetail(!showDetail)}>
    {showTitle && <p>{title || getTitle(text)}</p>}
    {showDetail && <p style={{ overflowWrap: 'break-word' }}>{text}</p>}
    <div className="note-button">
      <Button onClick={() => setEditmode(true)}>
        📝
      </Button>
      <Button onClick={deleteHandler}>
        X
      </Button>
    </div>
  </div>;
}