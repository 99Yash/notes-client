import { Note } from '../../interfaces/note.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NoteState {
  notes: Note[];
}

const initialState: NoteState = {
  notes: [],
};

export const NoteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state: NoteState, action: PayloadAction<{ notes: Note[] }>) => {
      state.notes = action.payload.notes;
    },
    addNote: (state, action: PayloadAction<{ note: Note }>) => {
      state.notes.push(action.payload.note);
      console.log(state.notes);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const noteToUpdate = state.notes?.find(
        (note) => note._id === action.payload._id
      );
      if (noteToUpdate) {
        noteToUpdate.title = action.payload.title;
        noteToUpdate.content = action.payload.content;
      }
      // if (noteIndex !== undefined) {
      //   state.notes![noteIndex] = action.payload;
      // }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      const noteIndex = state.notes?.findIndex(
        (note) => note._id === action.payload
      );
      if (noteIndex !== undefined) {
        state.notes?.splice(noteIndex, 1);
      }
    },
  },
});

export const { setNotes, addNote, updateNote, deleteNote } = NoteSlice.actions;

export default NoteSlice.reducer;
