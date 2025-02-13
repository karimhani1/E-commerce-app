import React, { useContext } from 'react'
import style from "./Navbar.module.css"
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext';
import image from '../../assets/freshcart-logo.svg'
export default function Navbar() {
let {UserLogin , setUserLogin} = useContext(UserContext);
let {numberItems} = useContext(CartContext)
let navigate = useNavigate()

function signout(){
localStorage.removeItem("userToken");
setUserLogin(null);
navigate("/login")
}

  return (
    <>


      <nav className="bg-slate-300 fixed top-0 left-0 right-0 z-50 border-gray-200">
        <div className="flex flex-wrap justify-center gap-3 lg:justify-between items-center mx-auto max-w-screen-xl p-4">

          <div className='flex items-center gap-5'> 
            <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={image} className="h-8" alt="Flowbite Logo" />

            </Link>

           {UserLogin != null ? <>
            <ul className='flex gap-5'>
              <li><Link className='text-slate-600' to="">Home</Link></li>

              <li>
                <Link className='text-slate-600 relative' to="cart">Cart 
                <div className='absolute top-[-13px]  right-[-13px] size-5 bg-blue-700 text-white rounded-full flex items-center justify-center'>{numberItems}</div>
                </Link>
              </li>

              <li>
                <Link className='text-slate-600' to="wishlist">wish List</Link>
              </li>

              <li>
                <Link className='text-slate-600' to="products">Products</Link>
              </li>

              <li>
                <Link className='text-slate-600' to="categories">Categories</Link>
              </li>

              <li>
                <Link className='text-slate-600' to="brands">Brands</Link>
              </li>
            </ul>

           </> : null}
          </div>



          <div className="flex items-center space-x-6 rtl:space-x-reverse">

<ul className='flex gap-4'>
  <li>
    <i className='fab fa-facebook'></i>
  </li>

  <li>
    <i className='fab fa-youtube'></i>
  </li>

  <li>
    <i className='fab fa-instagram'></i>
  </li>

  <li>
    <i className='fab fa-linkedin'></i>
  </li>
  
  <li>
    <i className='fab fa-twitter'></i>
  </li>
</ul>

<div className='flex gap-4'>
{UserLogin != null ? <span onClick={signout} className='text-sm cursor-pointer'>Signout</span> : 
  <>
  <Link to="login" className='text-sm'>Login</Link>
<Link to="register" className='text-sm'>Register</Link>
  
  </>
}


</div>
          </div>
        </div>
      </nav>


    </>
  )
}
