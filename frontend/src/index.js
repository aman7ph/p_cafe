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
//import RegisterScreen from "./screens/RegisterScreen"

import PrivateRouter from "./components/PrivateRouter"

import OrderScreen from "./screens/OrderScreen"
import ProfileScreen from "./screens/ProfileScreen"
import AdminRouter from "./components/AdminRoute"
import OrderListScreen from "./screens/admin/OrderListScreen"
import ProductList from "./screens/admin/ProductList"
import Report from "./screens/admin/Report"
import ProductUpdateScreen from "./screens/admin/ProductUpdateScreen"
import CreateProductScreen from "./screens/admin/CreateProductScreen"
import UsersList from "./screens/admin/UsersList"
import UserEditScreen from "./screens/admin/UserEditScreen"
import MenuPage from "./screens/MenuPage"
import PromotionListScreen from "./screens/admin/PromotionListScreen"
import PromotionUpdateScreen from "./screens/admin/UpdatePromootionScreen"
import CreatePromotionScreen from "./screens/admin/CreatePromotionScreen"
import MaterialList from "./screens/admin/MaterialList"
import CreateMaterialsScreen from "./screens/admin/CreateMaterialScreen"
import FeedbackList from "./screens/admin/FeedbackList"
import FeedbackDetail from "./screens/admin/FeedbackDetail"
import OrderNumber from "./screens/OrderNumber"
import PaiedOrderlist from "./screens/admin/PaiedOrderlist"
import ForgotePassword from "./screens/Forgotepassword"
import Reset from "./screens/Reset"
import Nomach from "./components/Nomach"
import CreateWorkerScreen from "./screens/admin/CreateWorkerScreen"
import UpdateWorkersScreen from "./screens/admin/UpdateWorkerScreen"
import WorkerList from "./screens/admin/WorkerList"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/page/:pageNumber" element={<MenuPage />} />
      <Route path="/search/:keyword" element={<MenuPage />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<MenuPage />} />
      <Route path="/category/:category" element={<MenuPage />} />
      <Route
        path="/category/:category/page/:pageNumber"
        element={<MenuPage />}
      />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      {/* <Route path="/register" element={<RegisterScreen />} /> */}
      <Route path="/forgotpassword" element={<ForgotePassword />} />
      <Route path="/reset/:token" element={<Reset />} />
      <Route path="/order/:id" element={<OrderScreen />} />
      <Route path="/order/orderNumber/:orderNumber" element={<OrderNumber />} />

      <Route path="" element={<PrivateRouter />}>
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
      <Route path="" element={<AdminRouter />}>
        <Route path="/admin/workerlist" element={<WorkerList />} />
        <Route path="/admin/worker/:id" element={<UpdateWorkersScreen />} />
        <Route path="/admin/worker/create" element={<CreateWorkerScreen />} />
        <Route
          path="/admin/material/create"
          element={<CreateMaterialsScreen />}
        />
        <Route path="/admin/materiallist" element={<MaterialList />} />
        <Route
          path="/admin/materiallist/:pageNumber"
          element={<MaterialList />}
        />
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
        <Route path="/admin/paiedorderlist" element={<PaiedOrderlist />} />
        <Route
          path="/admin/paiedorderlist/:pageNumber"
          element={<PaiedOrderlist />}
        />
        <Route
          path="/admin/orderlist/:pageNumber"
          element={<OrderListScreen />}
        />
        <Route path="/admin/category/:category" element={<ProductList />} />
        <Route
          path="/admin/category/:category/:pageNumber"
          element={<ProductList />}
        />
        <Route path="/admin/productlist" element={<ProductList />} />
        <Route
          path="/admin/productlist/:pageNumber"
          element={<ProductList />}
        />
        <Route path="/admin/reports" element={<Report />} />
        <Route path="/admin/product/:id" element={<ProductUpdateScreen />} />
        <Route path="/admin/product/create" element={<CreateProductScreen />} />
        <Route path="/admin/userlist" element={<UsersList />} />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
        <Route path="/admin/promotionlist" element={<PromotionListScreen />} />
        <Route
          path="/admin/promotion/:id"
          element={<PromotionUpdateScreen />}
        />
        <Route
          path="/admin/promotion/create"
          element={<CreatePromotionScreen />}
        />
        <Route path="/admin/feedbacklist" element={<FeedbackList />} />
        <Route
          path="/admin/feedbacklist/:pageNumber"
          element={<FeedbackList />}
        />
        <Route path="/admin/feedback/:id" element={<FeedbackDetail />} />
      </Route>
      <Route path="*" element={<Nomach />} />
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
