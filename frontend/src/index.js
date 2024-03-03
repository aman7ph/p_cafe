import React from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom"
import store from "./redux/store"
import { Provider } from "react-redux"

import "./assets/styles/bootstrap.custom.css"
import "./assets/styles/index.css"

import reportWebVitals from "./reportWebVitals"

import App from "./App"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import Home from "./screens/Home"
import ProductDetail from "./screens/ProductDetail"
import CartScreen from "./screens/CartScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"

import PrivateRouter from "./components/PrivateRouter"

import OrderScreen from "./screens/OrderScreen"
import ProfileScreen from "./screens/ProfileScreen"
import AdminRouter from "./components/AdminRoute"
import OrderListScreen from "./screens/admin/OrderListScreen"
import ProductList from "./screens/admin/ProductList"
import ProductUpdateScreen from "./screens/admin/ProductUpdateScreen"
import CreateProductScreen from "./screens/admin/CreateProductScreen"
import UsersList from "./screens/admin/UsersList"
import UserEditScreen from "./screens/admin/UserEditScreen"
import MenuPage from "./screens/MenuPage"
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/page/:pageNumber" element={<MenuPage />} />
      <Route path="/search/:keyword" element={<MenuPage />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<MenuPage />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/order/:id" element={<OrderScreen />} />
      <Route path="" element={<PrivateRouter />}>
        {/* <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrder />} /> */}

        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
      <Route path="" element={<AdminRouter />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
        <Route path="/admin/productlist" element={<ProductList />} />
        <Route
          path="/admin/productlist/:pageNumber"
          element={<ProductList />}
        />
        <Route path="/admin/product/:id" element={<ProductUpdateScreen />} />
        <Route path="/admin/product/create" element={<CreateProductScreen />} />
        <Route path="/admin/userlist" element={<UsersList />} />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
)

reportWebVitals()
