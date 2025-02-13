import { createContext, useEffect, useState } from 'react';
import  axios  from 'axios';


export let CartContext = createContext();

export default function CartContextProvider(props){
const[cartId , setcartId] = useState(0)
const[numberItems , setnumberItems] = useState(0)

    let headers = {
        token: localStorage.getItem("userToken")
    }

function addProductToCard(productId){
  return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {productId :productId,}

    ,{
        headers, 
        
    })
    .then((res)=> res)
    .catch((err)=> err)
}


function getLoggedUserCart(){
   return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
    .then((res)=> {
        console.log(res.data.data._id);
        setnumberItems(res.data.numOfCartItems)
        setcartId(res.data.data._id)
        return res
    })
    .catch((err)=> err)

}


function updateCartProductQuantity(productId , newCount){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count: newCount}, {headers})
     .then((res)=> res)
     .catch((err)=> err)
     
 }


 function deleteCartItem(productId){
   return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers})
    .then((res)=> res)
    .catch((err)=> err)
 }

 function checkout(cardId , url , formData){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=${url}`,{shippingAddress: formData,},{headers,})
     .then((res)=> res)
     .catch((err)=> err)
  }
 
useEffect(()=>{
    getLoggedUserCart()
},[])

    return ( 
    <CartContext.Provider  value={{addProductToCard , getLoggedUserCart , updateCartProductQuantity , deleteCartItem , checkout , cartId , numberItems , setnumberItems}}>
               {props.children}
    </CartContext.Provider>
    );
}