import { Note } from '@/interfaces/note.interface';
import React, { FC } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';

const SingleNote = (props: Note) => {
  const [editMode, setEditMode] = useState(false);
  const [editedNote, setEditedNote] = useState({
    title: props.title,
    content: props.content,
  });

  const router = useRouter();

  const handleEdit = () => {
    setEditMode(true);
    router.push(`/notes/${props._id}`);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  return (
    <div onClick={handleEdit} className="border rounded-sm p-4 m-4">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
    </div>
  );
};

export default SingleNote;
