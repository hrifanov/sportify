import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

const getInitialState = () => {
  return {
    alert: null,
  };
};

const store = (set, get) => ({
  ...getInitialState(),
  openConfirm: (alert) => {
    set((state) => {
      state.alert = alert;
    });
  },
  confirm: () => {
    get().alert.callback();
    set((state) => {
      state.alert = null;
    });
  },
  reject: () => {
    set((state) => {
      state.alert = null;
    });
  },
});

export const useConfirmAlertStore = create(immer(store));
