import { create } from "zustand";

type UpdateTimeStore = {
  udpateNormally: boolean;
  updateDateTime: Date;
  setUpdateDateTime: (date: Date) => void;
  setUpdateNormally: (value: boolean) => void;
};

const useUpdateTimeStore = create<UpdateTimeStore>((set) => ({
  udpateNormally: true,
  updateDateTime: new Date(),
  setUpdateDateTime: (date: Date) => set({ updateDateTime: date }),
  setUpdateNormally: (value: boolean) => set({ udpateNormally: value }),
}));

export default useUpdateTimeStore;
