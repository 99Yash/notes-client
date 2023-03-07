import { Note } from './note.interface';

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  token?: string;
  notes: Note[];
}
