import React from 'react';
import Link from 'next/link';
import { Inter } from '@next/font/google';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useRouter } from 'next/router';
import { reset } from '@/store/slices/notes.slice';

const inter = Inter({ subsets: ['latin'] });

const Navbar = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(reset());
    router.push('/');
  };

  return (
    <div className={`${inter.className} mb-12 w-full `}>
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
                <Link href="/log-in">Login</Link>
              </li>
              <li>
                <Link href="/signup">Signup</Link>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
