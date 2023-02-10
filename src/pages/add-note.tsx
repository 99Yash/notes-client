import React from 'react';
import { Inter } from '@next/font/google';
import { Note } from '@/interfaces/note.interface';
import { useState } from 'react';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });
const notesArray: Note[] = [];

const AddNote = () => {
  const [note, setNote] = useState<Note>({
    title: '',
    content: '',
  });

  const router = useRouter();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote({
      ...note,
      title: e.target.value,
    });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote({
      ...note,
      content: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(note);
    notesArray.push(note);
    if (!note.title || !note.content) return;
    fetch('http://localhost:5000/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    console.log(notesArray);
    setNote({
      title: '',
      content: '',
    });
    router.push('/');
  };

  return (
    <div
      className={`${inter.className} h-screen flex flex-col items-center justify-center `}
    >
      <form onSubmit={handleSubmit} className="md:w-4/5 w-11/12">
        <h1 className="text-center mb-4 ">Create a Note</h1>
        <div className="flex flex-col gap-6 items-center justify-center">
          <input
            onChange={handleTitleChange}
            className="bg-transparent w-full border rounded-xl px-4 py-2 "
            value={note?.title}
            type="text"
            placeholder="Add Title"
          />
          <textarea
            value={note?.content}
            onChange={handleContentChange}
            name="note"
            placeholder="Add Content"
            className="bg-transparent w-full border rounded-xl px-4 py-2 "
            cols={80}
            rows={7}
          ></textarea>
          <button className=" rounded-xl self-stretch border-red-100 text-yellow-500 border px-4 py-2">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
