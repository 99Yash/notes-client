import { updateNote } from '@/store/slices/notes.slice';
import { Inter } from '@next/font/google';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

const inter = Inter({ subsets: ['latin'] });
const EditNote = () => {
  const router = useRouter();
  const { id } = router.query as { id: string | undefined };
  const user = useAppSelector((state) => state.user);

  const [note, setNote] = useState({ _id: id, title: '', content: '' });

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/notes/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setNote({
          _id: data._id,
          title: data.title,
          content: data.content,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchNote();
  }, [id, dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:5000/api/notes/${id}`,
        {
          note,
          user,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(
        updateNote({
          _id: note._id,
          title: note.title,
          content: note.content,
        })
      );
      router.push('/');
    } catch (error) {
      console.log(error);
    }
    dispatch(
      updateNote({
        _id: id,
        title: note.title,
        content: note.content,
      })
    );
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  return (
    <div
      className={`${inter.className} h-screen flex flex-col items-center justify-center `}
    >
      <form className="md:w-4/5 w-11/12" onSubmit={handleSubmit}>
        <h1 className="text-center mb-4">Edit</h1>
        <div className="flex flex-col gap-6 items-center justify-center">
          <input
            className="bg-transparent w-full border rounded-xl px-4 py-2"
            type="text"
            name="title"
            value={note.title}
            onChange={handleChange}
          />
          <textarea
            className="bg-transparent w-full border rounded-xl px-4 py-2"
            name="content"
            cols={80}
            rows={7}
            value={note.content}
            onChange={handleChange}
          ></textarea>
          <button className=" rounded-xl self-stretch border-red-100 text-yellow-500 border px-4 py-2">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNote;
