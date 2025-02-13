import React, { useEffect, useState } from 'react'
import style from "./CategoriesSlider.module.css"
import axios from 'axios'
import Slider from "react-slick";


export default function CategoriesSlider() {


  const [categories, setcategories] = useState([])
  
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1000
  };


function getCategories(){
  axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  .then((res) => {
    setcategories(res.data.data)
    })
}

 useEffect(() => {
  getCategories()
  }, [])

  return (
   <>
   <h2 className='capatalize my-3 font-semibold text-gray-600'>shop popular categories</h2>
    <Slider {...settings}>
      {categories.map((category) => <div>
        <img src={category.image} className='w-full h-[200px] object-cover' alt="" />
        <h4>{category.name}</h4>
      </div>)}
    </Slider>
   </>
  )
}
