import axios from "axios";

const state = {
  notes: [],
  currentNote: {}
};
const getters = {
  allNotes: state => state.notes,
  currentNote: state => state.currentNote
};
const actions = {
  // Get User Notes
  async getNotes({ commit }) {
    let res = await axios.get("http://localhost:3000/notes/");
    commit("get_notes", res.data);
    return res;
  },
  // Post new note
  async addNote({ commit }, note) {
    const response = await axios.post("http://localhost:3000/notes", {
      title: note.title,
      text: note.text,
      importance: note.importance
    });
    const new_note = {
      _id: response.data._id,
      title: response.data.title,
      text: response.data.text,
      importance: response.data.importance
    };
    commit("add_note", new_note);
    commit("set_new_current_note");
    return response;
  },

  // Remove a note
  async deleteNote({ commit }, id) {
    const response = await axios.delete(`http://localhost:3000/notes/${id}`);
    commit("delete_note", id);
    commit("set_new_current_note");
  },
  setCurNote({ commit }, note) {
    commit("set_current_note", note);
  }
};

const mutations = {
  get_notes(state, notes) {
    state.notes = notes;
  },
  add_note(state, note) {
    state.notes.push(note);
  },
  delete_note(state, id) {
    state.notes = state.notes.filter(el => {
      return el._id != id;
    });
  },
  set_current_note(state, note) {
    state.currentNote = note;
  },
  set_new_current_note(state) {
    if (state.notes.length > 0) {
      state.currentNote = state.notes[state.notes.length - 1];
    } else {
      state.currentNote = {};
    }
  }
};

export default { state, getters, actions, mutations };
