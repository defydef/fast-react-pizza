import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: [],
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
            // payload = pizzaId
            state.cart = state.cart.filter(
                (item) => item.pizzaId !== action.payload
            )
        },
        increaseItemQty(state, action) {
            // payload = pizzaId
            const item = state.cart.find(
                (item) => item.pizzaId === action.payload
            )
            item.quantity++
            item.totalPrice = item.quantity * item.unitPrice
        },
        decreaseItemQty(state, action) {
            // payload = pizzaId
            const item = state.cart.find(
                (item) => item.pizzaId === action.payload
            )
            item.quantity--
            item.totalPrice = item.quantity * item.unitPrice
        },
        clearCart(state) {
            state.cart = []
        },
    },
})

export default cartSlice.reducer
export const {
    addItem,
    deleteItem,
    increaseItemQty,
    decreaseItemQty,
    clearCart,
} = cartSlice.actions
