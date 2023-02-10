import React from 'react';
import { Inter } from '@next/font/google';
import { useState } from 'react';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

const Login = () => {
  const [creds, setCreds] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreds({
      ...creds,
      email: e.target.value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreds({
      ...creds,
      password: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(creds);
    if (!creds.email || !creds.password) return;
    fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(creds),
    });
    router.push('/');
  };

  return (
    <div
      className={`${inter.className} h-screen flex flex-col items-center justify-center `}
    >
      <form
        onSubmit={handleSubmit}
        className="md:w-2/5 w-2/3 flex flex-col gap-6 items-center justify-center "
      >
        <label htmlFor="email" className="font-semibold">
          Email
        </label>
        <input
          type="email"
          name="email"
          onChange={handleEmailChange}
          id="email"
          className="bg-transparent w-full border rounded-xl px-4 py-2 "
          placeholder="test@ok.com"
        />
        <label htmlFor="password" className="font-semibold">
          Password
        </label>
        <input
          type="password"
          className="bg-transparent w-full border rounded-xl px-4 py-2 "
          name="password"
          onChange={handlePasswordChange}
          id="password"
        />
        <button className="rounded-xl mt-4 self-stretch border-red-100 text-yellow-500 border px-4 py-2 ">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
