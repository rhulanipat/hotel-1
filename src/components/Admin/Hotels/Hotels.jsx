
import './Hotels.css'
import {db} from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';


//import Data from '../../Data/Data'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Hotels() {
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

    function addHotel(){

        navigate('/add_hotel')
    }

    function view_bookings(){
        navigate('/bookings')
    }
    return (
        <div className="admin_home">
            <div className="add-hotel">
                <button className="add-hotel-btn" onClick={addHotel}>Add Hotel</button>
                <button className="add-hotel-btn" onClick={view_bookings}>View Bookings</button>
            </div>
            <div className="admin-hotels">
                {AllHotels.map((hotels, xid) => (
                    <div className="admin_home_info" key={xid}>
                        <h4 className="hotel-name">{hotels.hotelName}</h4>
                        <img src={hotels.hotelImage} alt={hotels.hotelName} />
                        <label className="hotel-description">{hotels.hotelDescription}</label>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Hotels;