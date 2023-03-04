import { Inter } from '@next/font/google';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAppDispatch } from '@/hooks/redux';
import { setUser } from '@/store/slices/user.slice';

const inter = Inter({ subsets: ['latin'] });
interface SignupForm {
  name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [creds, setCreds] = useState<SignupForm>({
    name: '',
    email: '',
    password: '',
  });

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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreds({
      ...creds,
      name: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!creds.email || !creds.password || !creds.name) return;

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/users/signup',
        creds,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      localStorage.setItem('token', data.token);
      console.log(data);
      dispatch(setUser(data));
    } catch (err: any) {
      console.log(err);
    }

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
        <label htmlFor="name" className="font-semibold">
          Name
        </label>
        <input
          type="text"
          name="name"
          onChange={handleNameChange}
          id="name"
          className="bg-transparent w-full border rounded-xl px-4 py-2 "
          placeholder="eg. John Doe"
        />

        <label htmlFor="email" className="font-semibold">
          Email
        </label>
        <input
          type="email"
          name="email"
          onChange={handleEmailChange}
          id="email"
          className="bg-transparent w-full border rounded-xl px-4 py-2 "
          placeholder="eg. test@ok.com"
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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
