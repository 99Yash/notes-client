import React from 'react';
import { Inter } from '@next/font/google';
import { Note } from '@/interfaces/note.interface';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/hooks/redux';
import { addNote } from '@/store/slices/notes.slice';
import { nanoid } from 'nanoid';
import axios from 'axios';
import { useAppSelector } from '../hooks/redux';

const inter = Inter({ subsets: ['latin'] });

const AddNote = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [note, setNote] = useState<Note>({
    title: '',
    content: '',
    _id: undefined,
  });

  const router = useRouter();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote((prevNote) => ({ ...prevNote, title: e.target.value }));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote((prevNote) => ({ ...prevNote, content: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      return router.push('/log-in');
    }

    if (!note.title || !note.content) return;
    setNote((prevNote) => ({ ...prevNote, _id: nanoid() }));
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/notes',
        { note, user },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(
        addNote({
          note: {
            _id: data._id,
            title: data.title,
            content: data.content,
          },
        })
      );
    } catch (err) {
      console.log(err);
    }
    router.push('/');
    setNote({
      title: '',
      content: '',
      _id: undefined,
    });
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
