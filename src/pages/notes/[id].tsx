import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateNote } from '@/store/slices/notes.slice';

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
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="title"
            value={note.title}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Content</label>
        <div className="control">
          <textarea
            className="textarea"
            name="content"
            value={note.content}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button className="button is-link">Save</button>
        </div>
      </div>
    </form>
  );
};

export default EditNote;
