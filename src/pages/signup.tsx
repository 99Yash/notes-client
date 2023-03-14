import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { User } from '@/interfaces/user.interface';
import { setUser } from '@/store/slices/user.slice';
import { Inter } from '@next/font/google';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });
interface SignupForm {
  name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [creds, setCreds] = useState<SignupForm>({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreds((prevCreds) => {
      return {
        ...prevCreds,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!creds.email || !creds.password || !creds.name) return;

    try {
      const { data } = await axios.post<{ token: string; user: User }>(
        'http://localhost:5000/api/users/signup',
        creds,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      localStorage.setItem('token', data.token);

      dispatch(
        setUser({
          user: {
            ...data.user,
            token: data.token,
          },
        })
      );
      console.log(user);
    } catch (err: any) {
      throw new Error("Couldn't sign up", err);
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
          onChange={handleInputChange}
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
          onChange={handleInputChange}
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
          onChange={handleInputChange}
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
