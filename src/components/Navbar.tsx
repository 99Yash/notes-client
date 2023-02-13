import React from 'react';
import Link from 'next/link';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

const Navbar = () => {
  return (
    <div className={`${inter.className} h-screen w-full `}>
      <nav className="pt-4">
        <ul className="flex gap-32 px-8 w-full justify-between">
          <div className="self-start">
            <li>
              <Link href="/">Notes</Link>
            </li>
          </div>
          <div className="flex gap-12 ">
            <li>
              <Link href="/add-note">Create</Link>
            </li>
            <li>
              <Link href="/log-in">Login</Link>
            </li>
            <li>
              <Link href="/signup">Signup</Link>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
