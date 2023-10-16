import { create } from "zustand";

type UpdateTimeStore = {
  updateNormally: boolean;
  updateDateTime: Date;
  setUpdateDateTime: (date: Date) => void;
  setUpdateNormally: (value: boolean) => void;
};

const useUpdateTimeStore = create<UpdateTimeStore>((set) => ({
  updateNormally: true,
  updateDateTime: new Date(),
  setUpdateDateTime: (date: Date) => set({ updateDateTime: date }),
  setUpdateNormally: (value: boolean) => set({ updateNormally: value }),
}));

export default useUpdateTimeStore;
