import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { User } from '@/interfaces/user.interface';
import { setUser } from '@/store/slices/user.slice';
import { Inter } from '@next/font/google';
import axios, { AxiosResponse } from 'axios';
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
  const [creds, setCreds] = useState<LoginForm>({
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

    if (!creds.email || !creds.password) return;

    try {
      //? normal login flow
      if (!router.query.from) {
        const { data } = await axios.post<
          LoginForm,
          AxiosResponse<{ existingUser: User; token: string }>
        >('http://localhost:5000/api/users/login', creds, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        localStorage.setItem('token', data.token);

        dispatch(
          setUser({
            user: data.existingUser,
          })
        );
        return router.push(`/`);
      }

      //* if user came from add-note page
      if (router.query.from && router.query.from === 'add-note') {
        //*login the user
        const createdUser = await axios.post<
          LoginForm,
          AxiosResponse<{ existingUser: User; token: string }>
        >('http://localhost:5000/api/users/login', creds, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        localStorage.setItem('token', createdUser.data.token);

        console.log(createdUser.data.existingUser);
        dispatch(
          setUser({
            user: createdUser.data.existingUser,
          })
        );
        console.log(user); //? user: null because setState is async
        return router.push(`/add-note`);
      }

      //* if user came from edit-note page
      if (router.query.from && router.query.from === `edit-note`) {
        const createdUser = await axios.post<
          LoginForm,
          AxiosResponse<{ existingUser: User; token: string }>
        >('http://localhost:5000/api/users/login', creds, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const storedNote = JSON.parse(localStorage.getItem('storedNote')!);
        console.log('createdUser', createdUser.data.existingUser);
        localStorage.setItem('token', createdUser.data.token);

        dispatch(
          setUser({
            user: createdUser.data.existingUser,
          })
        );
        return router.push(`/notes/${storedNote!.id}`);
      }
    } catch (err) {
      console.log(err);
    }
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
          onChange={handleInputChange}
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
          onChange={handleInputChange}
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
