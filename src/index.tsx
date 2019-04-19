import * as React from 'react';
import { useState, useEffect } from 'react';
import * as fs from 'fs';
import * as path from 'path';
import { Button } from 'react-bootstrap';
import Note from './note';
import NoteEditor from './note-editor';

const dbPath = path.resolve(__dirname, 'db.json');

export const reactClass = function NotePlugin() {
  const [db, updateDb] = useState([] as NoteItem[]);
  const [showAddNote, setShowAddNote] = useState(false);

  const saveDb = (newDb: NoteItem[]) => {
    updateDb(newDb);
    fs.writeFileSync(dbPath, JSON.stringify(newDb));
  };

  const deleteNote = (index: number) => {
    saveDb(db.filter((it: NoteItem, id: number) => id !== index));
  };

  const addNote = (title: string, text: string) => {
    if (!title && !text) return;
    db.unshift({ title, text, updateTime: Date.now() });
    setShowAddNote(false);
    saveDb(db);
  };

  const updateNote = (index: number, title: string, text: string) => {
    if (!title && !text) return deleteNote(index);
    const note = db.splice(index, 1)[0];
    note.title = title;
    note.text = text;
    note.updateTime = Date.now();
    db.unshift(note);
    setShowAddNote(false);
    saveDb(db);
  };


  useEffect(() => {
    if (fs.existsSync(dbPath)) {
      updateDb(JSON.parse(fs.readFileSync(dbPath) as unknown as string));
    } else {
      fs.writeFileSync(dbPath, JSON.stringify(db));
    }
  }, []);

  return (
    <>
      <style>{`
        #poi-plugin-note .note-card:hover {
          background-color: #ffffff22;
        }
        #poi-plugin-note .note-card {
          outline: #FFFFFF22 1px solid;
          margin: 5px 0;
          position: relative;
        }
        #poi-plugin-note .note-card .del-note-button {
          position: absolute;
          right: 0;
          top: 0;
          height: 29px;
          line-height: 14px;
          visibility: hidden;
        }
        #poi-plugin-note .note-card:hover .del-note-button {
          visibility: visible;
        }
      `}
      </style>
      <div>
        {!showAddNote && <Button onClick={() => setShowAddNote(true)}>添加</Button>}
        {showAddNote && <NoteEditor onSave={addNote} onCancel={() => setShowAddNote(false)} />}
      </div>
      {db.map(({ title, text, updateTime }, index) => (
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
