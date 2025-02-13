import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from "formik";
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function ForgetPassword() {
 let {UserLogin ,setUserLogin} = useContext(UserContext)
 const navigate = useNavigate();

 function handleForgetPassword(){

axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',{ email:"karimhani1111@gmail.com"} )
.then((res)=>{
console.log(res);
toast.success(res.data.message)
navigate("/verify-code")
if(res.data.message == "success"){
 localStorage.setItem("userToken" , res.data.token)
 setUserLogin(res.data.token)

}
})
.catch((err)=>err)

}

useEffect(()=>{
  document.title="Forget-password"
},[])

  let formik = useFormik({
    initialValues : {
      email : "",
    },
   
    onSubmit : handleForgetPassword,
  })
  
  return (
   <>
    <h2 className='font-bold text-center text-[2rem] text-[#212529] my-4'>please enter your verification code</h2>
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">

<div className="relative z-0 w-full mb-5 group">
    <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label htmlFor="email" className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
   </div>
   <span onClick={handleForgetPassword} className='btn cursor-pointer'>verify</span>
    </form>
   </>
  )
}
