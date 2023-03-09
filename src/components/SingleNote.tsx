import { Note } from '@/interfaces/note.interface';
import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { deleteNote } from '@/store/slices/notes.slice';
import axios from 'axios';

interface SingleNoteProps {
  note: Note;
}

const SingleNote = (props: SingleNoteProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);
  const handleEdit = () => {
    router.push(`/notes/${props.note._id}`);
  };
  const handleDelete = async () => {
    dispatch(deleteNote(props.note._id!));
    try {
      await axios.delete(`http://localhost:5000/api/notes/${props.note._id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      router.push(`/notes/${user.user?._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      onClick={handleEdit}
      className=" flex justify-between border rounded-sm p-4 m-4"
    >
      <div className="flex flex-col">
        <h1>{props.note.title}</h1>
        <p>{props.note.content}</p>
      </div>
      <button
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        DELETE
      </button>
    </div>
  );
};

export default SingleNote;
