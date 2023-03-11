import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setUser } from '@/store/slices/user.slice';
import { Inter } from '@next/font/google';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  let userId: string;
  const [creds, setCreds] = useState<LoginForm>({
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!creds.email || !creds.password) return;

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/users/login',
        creds,
        {
          headers: {
            'Content-Type': 'application/json',
            //no jwt as its a login form
          },
        }
      );
      console.log(data);
      localStorage.setItem('token', data.token);
      userId = data.existingUser._id;
      dispatch(
        setUser({
          _id: userId,
          name: data.existingUser.name,
          email: data.existingUser.email,
          password: data.existingUser.password,
          notes: data.existingUser.notes,
        })
      );
    } catch (err) {
      console.log(err);
    }
    router.push(`/${userId}/notes`);
  };
  console.log(user);
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
