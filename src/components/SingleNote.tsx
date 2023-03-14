import { Note } from '@/interfaces/note.interface';
import { deleteNote } from '@/store/slices/notes.slice';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

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

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event?.stopPropagation();
    try {
      await axios.delete(`http://localhost:5000/api/notes/${props.note._id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(deleteNote(props.note._id!));
      await axios.get(
        `http://localhost:5000/api/notes/user/${user.user?._id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      onClick={handleEdit}
      className=" flex justify-between cursor-pointer border rounded-lg shadow-md p-4 m-4"
    >
      <div className="flex flex-col">
        <h1 className="text-md text-gray-300 font-semibold">
          {props.note.title}
        </h1>
        <p className="text-sm text-gray-400">{props.note.content}</p>
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
