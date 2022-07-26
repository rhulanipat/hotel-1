
import './DisplayHotels.css'
import {db} from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';


import Data from '../../Data/Data'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function DisplayHotels() {
    const navigate = useNavigate()
    const hotelCollectionRef = collection(db, 'hotel')
    const [AllHotels, setAllHotels] = useState([])
    useEffect(() => {
        async function getAllHotels(){
            const data = await getDocs(hotelCollectionRef);
            setAllHotels(data.docs.map((doc)=>({...doc.data(), id:doc.id})))
        }
        getAllHotels()
    })
 
    function book(data){

        navigate('/book_now', {state:{data:data}})
    }
    return (
        <div className="display_hotel_home">
            <div className="display-hotels">
                {AllHotels.map((hotels, xid) => (
                    <div className="display_home_info" key={xid}>
                        <h4 className="hotel-name">{hotels.hotelName} R{hotels.hotelPrice}</h4>
                        <img src={hotels.hotelImage} alt={hotels.hotelName} />
                        <label className="hotel-description">{hotels.hotelDescription}</label>
                        <button onClick={()=>book(hotels)} className="btn btn-primary">Book</button>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default DisplayHotels;