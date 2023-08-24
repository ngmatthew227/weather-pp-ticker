import { create } from "zustand";

type UpdateTimeStore = {
  updateDateTime: Date;
  setUpdateDateTime: (date: Date) => void;
};

const useUpdateTimeStore = create<UpdateTimeStore>((set) => ({
  updateDateTime: new Date(),
  setUpdateDateTime: (date: Date) => set({ updateDateTime: date }),
}));

export default useUpdateTimeStore;
