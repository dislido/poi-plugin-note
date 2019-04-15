import React, { useState, useEffect } from 'react';
import fs from 'fs';
import path from 'path';
import { Button } from 'react-bootstrap';
import Note from './note';
import NoteEditor from './note-editor';

/**
 * @typedef NoteItem 一条笔记
 * @property {string?} title 笔记标题，为空时用text的第一行代替
 * @property {string} text 笔记内容
 * @property {number} updateTime 修改日期
 */

const dbPath = path.resolve(__dirname, 'db.json');

export const reactClass = function NotePlugin() {
  let [db, updateDb] = useState([]);
  let [showAddNote, setShowAddNote] = useState(false);
    const saveDb = (newDb) => {
    updateDb(newDb);
    fs.writeFileSync(dbPath, JSON.stringify(newDb));
  }

  const deleteNote = (index) => {
    saveDb(db.filter((it, id) => id !== index));
  }

  const addNote = (title, text) => {
    if (!title && !text) return;
    db.unshift({ title, text, updateTime: Date.now() });
    setShowAddNote(false);
    saveDb(db);
  };

  const updateNote = (index, title, text) => {
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
      updateDb(JSON.parse(fs.readFileSync(dbPath)))
    } else {
      fs.writeFileSync(dbPath, JSON.stringify(db));
    }
  }, []);

  return <>
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
        onSave={(title, text) => updateNote(index, title, text)}
        onDelete={() => deleteNote(index)}
      />
    ))}
  </>;
}