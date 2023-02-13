import { Note } from './note.interface';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  token?: string;
  notes: Note[];
}
