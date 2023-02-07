import React from 'react';
import Link from 'next/link';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

const Navbar = () => {
  return (
    <div className={inter.className}>
      <nav className="pt-4">
        <ul className="flex gap-32 justify-end">
          <li className="self-start">
            <Link href="/">Notes</Link>
          </li>
          <li>
            <Link href="/add-note">Create</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/signup">Signup</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
