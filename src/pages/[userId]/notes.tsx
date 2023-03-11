import SingleNote from '@/components/SingleNote';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { reset, setNotes } from '@/store/slices/notes.slice';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Notes = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const notes = useAppSelector((state) => state.notes);
  const router = useRouter();
  const { userId } = router.query as { userId: string | undefined };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(reset());
    } else {
      const fetchNotesByUser = async () => {
        try {
          const { data } = await axios.get(
            `http://localhost:5000/api/notes/user/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
          dispatch(
            setNotes({
              notes: data,
            })
          );
        } catch (error) {
          console.log(error);
        }
      };
      fetchNotesByUser();
    }
  }, [user, dispatch, userId]);

  return (
    <div>
      {notes.notes?.map((note) => {
        return <SingleNote key={note._id} note={note} />;
      })}
    </div>
  );
};

export default Notes;
