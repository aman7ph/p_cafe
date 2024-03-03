import { createSlice } from "@reduxjs/toolkit"
import { updateCart } from "../../utils/cartUtils"

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], owner: "", phoneNumber: "", ariveTime: "", id: "" }

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload

      let { cartItems } = state
      const existingItem = cartItems.find(
        (cartItem) => cartItem._id === item._id
      )

      if (existingItem) {
        state.cartItems = cartItems.map((cartItem) =>
          cartItem._id === existingItem._id ? item : cartItem
        )
      } else {
        state.cartItems = [...state.cartItems, item]
      }

      return updateCart(state)
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      )
      return updateCart(state)
    },
    setCart: (state, action) => {
      console.log(action.payload)
      state = action.payload
      return updateCart(state)
    },

    saveShippingAdress: (state, action) => {
      state.shippingAdress = action.payload
      return updateCart(state)
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
      return updateCart(state)
    },
    clearCart: (state) => {
      state.cartItems = []
      state.id = ""
      state.owner = ""
      state.phoneNumber = ""
      state.ariveTime = ""
      return updateCart(state)
    },
  },
})
export default cartSlice.reducer
export const {
  addToCart,
  removeFromCart,
  saveShippingAdress,
  savePaymentMethod,
  clearCart,
  setCart,
} = cartSlice.actions
