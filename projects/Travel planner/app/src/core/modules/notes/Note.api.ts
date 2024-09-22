import { Note, NoteBody } from "./Note.types";
import { API } from "@core/network/api";

const getNotes = () => {
  return API.get<Note[]>("/notes");
};

const getNoteById = (id: string) => {
  return API.get<Note>(`/notes/${id}`);
};

const createNote = (note: NoteBody) => {
  return API.post<Note>("/notes", note);
};

const updateNote = (id: string, note: NoteBody) => {
  return API.patch<Note>(`/notes/${id}`, note);
};

const deleteNote = (id: string) => {
  return API.delete<Note>(`/notes/${id}`);
};


export {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
