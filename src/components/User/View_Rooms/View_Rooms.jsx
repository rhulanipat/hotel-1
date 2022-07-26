
import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import './View_Rooms.css'


const View_Rooms = () => {

  const { state } = useLocation();
  const { newData } = state

  const [hotelData] = useState(newData)
  const [imageGallary, setImageGallary] = useState([])

  useEffect(() => {
    //console.log(hotelData)
    setImageGallary(hotelData.hotelGallery)
    console.log(imageGallary)
  })

  function book(){

  }

  return (
    <div className='view_room'>
      <div>
        <div className='view_room_data'>
          <div className='view_data'>
            <label className='data-label'>Price </label>
            <label className='data-value'>:R {hotelData.hotelPrice} </label>
          </div>
          <div className='view_data'>
            <label className='data-label'>Bed Type </label>
            <label className='data-value'>:{hotelData.bedType} </label>
          </div>
          <div className='view_data'>
            <label className='data-label'>Hotel Type </label>
            <label className='data-value'>:{hotelData.hotelType} </label>
          </div>
          <button onClick={book}>Book Now</button>
        </div>

        <div className='view_room_images'>
          {imageGallary.map((im, xid) => (
            <div key={xid}>
              <img src={im} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default View_Rooms
