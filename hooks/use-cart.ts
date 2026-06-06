import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  size: string
  color: string
  img: string
}

interface CartStore {
  items: CartItem[]
  addItem: (data: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  removeAll: () => void
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (data: CartItem) => {
        const currentItems = get().items
        const existingItem = currentItems.find((item) => item.id === data.id)

        if (existingItem) {
          return set({
            items: currentItems.map((item) =>
              item.id === data.id
                ? { ...item, quantity: item.quantity + data.quantity }
                : item
            ),
          })
        }

        set({ items: [...get().items, data] })
      },
      removeItem: (id: string) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },
      updateQuantity: (id: string, quantity: number) => {
        const currentItems = get().items
        if (quantity <= 0) {
          return set({ items: currentItems.filter((item) => item.id !== id) })
        }
        set({
          items: currentItems.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)