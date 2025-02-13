import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './App.css'
import Layout from './components/Layout/Layout';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Notfound from './components/Notfound/Notfound';
import Home from './components/Home/Home';
import UserContextprovider from "./Context/UserContext"
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout';
import Allorders from './components/Allorders/Allorders';
import Wishlist from './components/Wishlist/Wishlist';
import WishContextProvider from './Context/WishContext';
import ForgetPassword from './components/forget-password/forget-password';
import VerifyCode from './components/verify-code/verify-code';


let x = createBrowserRouter([
  {path: "" , element: <Layout />,children :[

    {index:true , element: <ProtectedRoute><Home /></ProtectedRoute>},
    {path: "products" , element: <ProtectedRoute><Products /></ProtectedRoute>},
    {path: "cart" , element: <ProtectedRoute><Cart /></ProtectedRoute>},
    {path: "wishlist" , element: <ProtectedRoute><Wishlist /></ProtectedRoute>},
    {path: "brands" , element: <ProtectedRoute><Brands /></ProtectedRoute>},
    {path: "allorders" , element: <ProtectedRoute><Allorders /></ProtectedRoute>},
    {path: "checkout" , element: <ProtectedRoute><Checkout /></ProtectedRoute>},
    {path: "productdetails/:id/:category" , element: <ProtectedRoute><ProductDetails /></ProtectedRoute>},
    {path: "categories" , element: <ProtectedRoute><Categories /></ProtectedRoute>},
    {path: "register" , element: <Register />},
    {path: "login" , element: <Login />},
    {path: "verify-code" , element: <VerifyCode />},
    {path: "forget-password" , element:<ForgetPassword />},
    {path: "*" , element: <Notfound />},
  ] }
])

function App() {

  return(
    <>
    
    <UserContextprovider>
      <CartContextProvider>
        <WishContextProvider>
        <RouterProvider router={x}></RouterProvider>
        </WishContextProvider>
      <Toaster/>
      </CartContextProvider>
    </UserContextprovider>
    
    </>
  ) 

}

export default App
