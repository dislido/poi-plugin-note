import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import NoteEditor from './note-editor';

/**
 * @param {string} text
 */
function getTitle(text) {
  return text.split('\n')[0];
}

export default function Note({ title, text, onSave, onDelete }) {
  const [editmode, setEditmode] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const showTitle = title || !showDetail;

  const deleteHandler = (e) => {
    e.stopPropagation();
    onDelete();
  }
  if (editmode) return <NoteEditor title={title} text={text} onSave={onSave} onCancel={() => setEditmode(false)}/>;
  return <div className="note-card" onClick={() => setShowDetail(!showDetail)}>
    {showTitle && <p>{title || getTitle(text)}</p>}
    {showDetail && <p style={{ overflowWrap: 'break-word' }}>{text}</p>}
    <Button onClick={deleteHandler} className="del-note-button">
      X
    </Button>
  </div>;
}