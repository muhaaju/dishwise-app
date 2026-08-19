import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types/database';
import { calculateCartSavings } from '@/lib/utils/calculations';

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getSavings: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.menu_item_id === item.menu_item_id
          );

          if (existingItem) {
            // Update quantity if item already exists
            return {
              items: state.items.map((i) =>
                i.menu_item_id === item.menu_item_id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          // Add new item
          return {
            items: [...state.items, item],
          };
        });
      },

      removeItem: (menuItemId) => {
        set((state) => ({
          items: state.items.filter((i) => i.menu_item_id !== menuItemId),
        }));
      },

      updateQuantity: (menuItemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(menuItemId);
          return;
        }

        set((state) => ({
          items: state.items.map((i) =>
            i.menu_item_id === menuItemId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getSubtotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getSavings: () => {
        const { items } = get();
        return calculateCartSavings(items);
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'dishwise-cart',
    }
  )
);
