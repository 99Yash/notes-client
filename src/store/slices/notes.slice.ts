import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../../interfaces/note.interface';

export interface NoteState {
  notes: Note[];
}

const initialState: NoteState = {
  notes: [],
};

export const reset = createAction('app/reset');

export const NoteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state: NoteState, action: PayloadAction<{ notes: Note[] }>) => {
      state.notes = action.payload.notes;
    },
    addNote: (state, action: PayloadAction<{ note: Note }>) => {
      state.notes.push(action.payload.note);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const noteToUpdate = state.notes?.find(
        (note) => note._id === action.payload._id
      );
      if (noteToUpdate) {
        noteToUpdate.title = action.payload.title;
        noteToUpdate.content = action.payload.content;
      }
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
  extraReducers: (builder) => {
    builder.addCase(reset, (state, action) => {
      return initialState;
    });
  },
});

export const { setNotes, addNote, updateNote, deleteNote } = NoteSlice.actions;

export default NoteSlice.reducer;
