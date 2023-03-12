import SingleNote from '@/components/SingleNote';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { Note } from '@/interfaces/note.interface';
import { setNotes } from '@/store/slices/notes.slice';
import { setUser } from '@/store/slices/user.slice';
import { Inter } from '@next/font/google';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const notes = useAppSelector((state) => state.notes);
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwtDecode<{
        email: string;
        id: string;
        iat: number;
        exp: number;
      }>(token);
      const currentTime = Date.now() / 1000;
      if (!decodedToken.exp) {
        throw new Error('Token has no expiration date');
      }
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
      }
      const fetchUser = async () => {
        const { data } = await axios.get(
          `http://localhost:5000/api/users/${decodedToken.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(setUser({ user: data }));
      };
      fetchUser();
    }
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Notes App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className}`}>
        {notes.notes?.length > 0 &&
          notes.notes?.map((note: Note) => {
            return <SingleNote key={note._id} note={note} />;
          })}
      </main>
    </>
  );
}
