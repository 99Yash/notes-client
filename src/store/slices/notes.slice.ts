import { Note } from '../../interfaces/note.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NoteState {
  notes: Note[] | null;
}

const initialState: NoteState = {
  notes: null,
};

export const NoteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state: NoteState, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes?.push(action.payload);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const noteIndex = state.notes?.findIndex(
        (note) => note.id === action.payload.id
      );
      if (noteIndex !== undefined) {
        state.notes![noteIndex] = action.payload;
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      const noteIndex = state.notes?.findIndex(
        (note) => note.id === action.payload
      );
      if (noteIndex !== undefined) {
        state.notes?.splice(noteIndex, 1);
      }
    },
  },
});

export const { setNotes, addNote, updateNote, deleteNote } = NoteSlice.actions;

export default NoteSlice.reducer;
