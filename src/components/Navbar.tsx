import { reset } from '@/store/slices/notes.slice';
import { setUser } from '@/store/slices/user.slice';
import { Inter } from '@next/font/google';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

const inter = Inter({ subsets: ['latin'] });

const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  interface DecodedToken {
    id: string;
    email: string;
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    if (token) {
      const decoded = jwt.decode(token) as DecodedToken;
      const id = decoded?.id;
      const fetchUser = async () => {
        try {
          const user = await axios.get(
            `http://localhost:5000/api/users/${id}`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );
          //* infinite loop here. so, removed 'user' from dependency array
          dispatch(setUser(user.data));
        } catch (error) {
          console.log(error);
        }
      };
      fetchUser();
    }
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(reset());
    router.push('/');
  };

  return (
    <div className={`${inter.className} mb-8 w-full `}>
      <nav className="pt-4">
        <ul className="flex gap-32 px-8 w-full justify-between">
          <div className="self-start">
            <li>
              <Link href="/">Notes</Link>
            </li>
          </div>
          {user.isLoggedIn && (
            <div className="flex gap-12 ">
              <li>
                <Link href="/add-note">Create</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </div>
          )}
          {!user.isLoggedIn && (
            <div className="flex gap-12 ">
              <li>
                <Link href="/log-in?login=true">Login</Link>
              </li>
              <li>
                <Link href="/signup?signup=true">Signup</Link>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
