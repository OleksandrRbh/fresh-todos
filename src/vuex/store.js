import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    notes: null
  },
  mutations: {
    setNote(state, note) {
      state.notes.push(note);
    },
    deleteNote(state, id) {
      let noteIndex = state.notes.findIndex(item => item.id === id)
      state.notes.splice(noteIndex, 1);
    },
    updateNote(state, {id, note}) {
      let noteIndex = state.notes.findIndex(item => item.id === id)
      state.notes.splice(noteIndex, 1, note);
    },
    setNotes(state, notes) {
      state.notes = notes;
    },    
    saveToLocalStorage(state) {
      localStorage.setItem("notes", JSON.stringify(state.notes))
    }
  },
  getters: {
    getNote: (state) => (id) => {
      let noteId = state.notes.findIndex(item => item.id === id)
      return state.notes[noteId];
    }
  },
  actions: {
    SET_NOTE(state, payload) {
      state.commit("setNote", payload);
      state.commit("saveToLocalStorage");
    },
    DELETE_NOTE(state, payload) {
      state.commit("deleteNote", payload);
      state.commit("saveToLocalStorage");
    },
    UPDATE_NOTE(state, {index, note}) {
      state.commit("updateNote", {index, note});
      state.commit("saveToLocalStorage");
    },
    INIT_STATE(state) {
      let notes;
      try {
        notes = JSON.parse(localStorage.getItem("notes"));
      } catch (e) {
        console.error(e);
      }
      state.commit("setNotes", notes || []);
    }
  }
});

export default store;