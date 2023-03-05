import { Note } from '@/interfaces/note.interface';
import React from 'react';

const SingleNote = (props: Note) => {
  return (
    <div className="border rounded-sm p-4">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
    </div>
  );
};

export default SingleNote;
