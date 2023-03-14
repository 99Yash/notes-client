import { useAppDispatch } from '@/hooks/redux';
import { Note } from '@/interfaces/note.interface';
import { addNote, reset } from '@/store/slices/notes.slice';
import { Inter } from '@next/font/google';
import axios, { AxiosResponse } from 'axios';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAppSelector } from '../hooks/redux';
import { useEffect } from 'react';

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

  useEffect(() => {
    const storedNote = localStorage.getItem('storedNote');
    if (storedNote) {
      setNote({
        title: JSON.parse(storedNote).title,
        content: JSON.parse(storedNote).content,
        _id: undefined,
      });
      localStorage.removeItem('storedNote');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); //?if no token ==> err code 401, handled in catch block

    if (!note.title || !note.content) return;

    setNote((prevNote) => ({ ...prevNote, _id: nanoid() }));

    try {
      const { data } = await axios.post<
        Note,
        AxiosResponse<{
          id: string;
          title: string;
          content: string;
        }>
      >(
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
            _id: data.id,
            title: data.title,
            content: data.content,
          },
        })
      );
    } catch (err: any) {
      if (err.response.status === 401) {
        dispatch(reset());
        const storedNote = {
          title: note.title,
          content: note.content,
        };
        localStorage.setItem('storedNote', JSON.stringify(storedNote));
        return router.push('/log-in?from=add-note');
      } else {
        console.log(err);
      }
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
