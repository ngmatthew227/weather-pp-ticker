import { create } from "zustand";

type AlertStore = {
  show: boolean;
  message: string;
  setShow: (value: boolean) => void;
  showMsg: (message: string) => void;
};

const useAlertStore = create<AlertStore>((set) => ({
  show: false,
  message: "",
  setShow: (value: boolean) => set({ show: value }),
  showMsg: (message: string) => set({ show: true, message }),
}));

export default useAlertStore;
