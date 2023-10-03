import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: [
        {
            pizzaId: 12,
            name: 'Mediterranean',
            quantity: 2,
            unitPrice: 16,
            totalPrice: 32,
        },
    ],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            // payload = newItem
            state.cart.push(action.payload)
        },
        deleteItem(state, action) {
            state.cart.filter(
                state.cart.map((pizza) => pizza !== action.payload)
            )
        },
        increaseItemQty(state, action) {},
        decreaseItemQty(state, action) {},
        clearCart(state, action) {},
    },
})

export default cartSlice.reducer
export const { addItem } = cartSlice.actions
