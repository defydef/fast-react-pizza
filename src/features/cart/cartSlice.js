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

            if (item.quantity === 0)
                cartSlice.caseReducers.deleteItem(state, action) // delete item when quantity = 0
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

export const getTotalItemQty = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)

export const getTotalItemPrice = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)

export const getCart = (state) => state.cart.cart

export const getQtyById = (id) => (state) =>
    state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0
