import create from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, subscribeWithSelector } from 'zustand/middleware';

const getInitialState = () => {
  return {
    activeClub: null,
  };
};

const store = (set, get) => ({
  ...getInitialState(),
  selectClub: (club) => {
    set((state) => {
      state.activeClub = club;
    });
  },
});

export const useClubStore = create(
  persist(immer(store), {
    name: 'club',
    getStorage: () => localStorage,
  }),
);
