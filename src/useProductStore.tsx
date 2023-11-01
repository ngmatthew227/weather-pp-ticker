import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProductStore {
  products: string[];
  intervalIds: number[];
  addProduct: (product: string) => void;
  removeProduct: (product: string) => void;
  addIntervalId: (intervalId: number) => void;
}

const useProductStore = create<ProductStore>()(
  persist<ProductStore>(
    (set) => ({
      products: ["HK_FUTURE.HSImain", "HK.800000"],
      intervalIds: [],
      addProduct: (product: string) =>
        set((state) => {
          if (state.intervalIds) {
            state.intervalIds.forEach((id) => clearInterval(id));
          }
          return { products: [...state.products, product] };
        }),
      removeProduct: (product: string) =>
        set((state) => {
          if (state.intervalIds) {
            state.intervalIds.forEach((id) => clearInterval(id));
          }
          return { products: state.products.filter((p) => p !== product) };
        }),
      addIntervalId: (intervalId: number) => set((state) => ({ intervalIds: [...state.intervalIds, intervalId] })),
    }),
    {
      name: "product-storage",
    }
  )
);

export default useProductStore;
