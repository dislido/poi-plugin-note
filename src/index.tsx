import * as React from 'react';
import { useState, useEffect } from 'react';
import { List } from 'immutable';
import * as fs from 'fs';
import * as path from 'path';
import { Button } from 'react-bootstrap';
import Note from './note';
import NoteEditor from './note-editor';

const dbPath = path.resolve(__dirname, 'db.json');
const initDb: List<NoteItem> = List.of();

export const reactClass = function NotePlugin() {
  const [db, updateDb] = useState(initDb);
  const [showAddNote, setShowAddNote] = useState(false);

  const saveDb = (newDb: List<NoteItem>) => {
    updateDb(newDb);
    fs.writeFileSync(dbPath, JSON.stringify(newDb.toJS()));
  };

  const deleteNote = (index: number) => {
    saveDb(db.delete(index));
  };

  const addNote = (title: string, text: string) => {
    if (!title && !text) return;
    setShowAddNote(false);
    saveDb(db.unshift({ title, text, updateTime: Date.now() }));
  };

  const updateNote = (index: number, title: string, text: string) => {
    if (!title && !text) return deleteNote(index);
    setShowAddNote(false);
    const db2 = db.update(index, (it) => ({
      title,
      text,
      updateTime: Date.now(),
    }));
    saveDb(db2);
  };


  useEffect(() => {
    if (fs.existsSync(dbPath)) {
      updateDb(List(JSON.parse(fs.readFileSync(dbPath) as unknown as string)));
    } else {
      fs.writeFileSync(dbPath, JSON.stringify(db));
    }
  }, []);
  return (
    <>
      <link rel="stylesheet" href={path.resolve(__dirname, '../assets/note.css')} />
      <div>
        {!showAddNote && <Button onClick={() => setShowAddNote(true)}>添加</Button>}
        {showAddNote && <NoteEditor onSave={addNote} onCancel={() => setShowAddNote(false)} />}
      </div>
      {db.map(({ title, text, updateTime }: NoteItem, index: number) => (
        <Note
          key={updateTime}
          title={title}
          text={text}
          onSave={(title: string, text: string) => updateNote(index, title, text)}
          onDelete={() => deleteNote(index)}
        />
      ))}
    </>
  );
}
