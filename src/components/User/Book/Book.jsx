import { addDoc, collection } from 'firebase/firestore';
import {db} from '../../config/firebase';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import './Book.css'
function Book() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const { data } = state;
    const [HotelDetails] = useState(data)
    const bookingCollectionRef = collection(db,'bookings')
    const [GuestName, setGuestName] = useState('');
    const [CheckIn, setCheckIn] = useState('');
    const [CheckOut, setCheckOut] = useState('');
    const [TotalPrice, setTotalPrice] = useState(0);
    const [Adults, setAdults] = useState(0);
    const [Children, setChildren] = useState(0);
console.log(data)
    useEffect(()=>{
        if(CheckIn !=='' && CheckOut !==''){
            const startDate = new Date(CheckIn);
            const endDate = new Date(CheckOut);
            setTotalPrice((endDate.getTime()-startDate.getTime())/(24*3600*1000)*HotelDetails.hotelPrice);

        }
    })


    async function book_now(){
        const userId = 's1sdsad465546sad48d'
        await addDoc(bookingCollectionRef,{hotelRef:HotelDetails.id, checkIn:CheckIn, checkOut:CheckOut,
        totalPrice: TotalPrice, adults:Adults, children:Children, userId:userId
        }).then((response)=>{
            alert('Booked Successfully')
            navigate('/')
        })
    }

    return (
        <div className="book">
            <div className="form-group">
                <label className="form-label">Guest Name</label>
                <input type="text" className="control-form" onChange={(event) => setGuestName(event.target.value)} />
            </div>
            <div className="form-group">
                <label className="form-label">Check-In</label>
                <input type="date" className="control-form" onChange={(event) => setCheckIn(event.target.value)} />
            </div>
            <div className="form-group">
                <label className="form-label">Check-Out</label>
                <input type="date" className="control-form" onChange={(event) => setCheckOut(event.target.value)} />
            </div>
            <div className="form-group">
                <label className="form-label">Adult</label>
                <input type="number" className="control-form" onChange={(event) => setAdults(event.target.value)} />
            </div>
            <div className="form-group">
                <label className="form-label">Child</label>
                <input type="number" className="control-form" onChange={(event) => setChildren(event.target.value)} />
            </div>
            <div className="form-group">
                <label>Total Price R{TotalPrice}</label>
            </div>
            <div className="form-group">
                <button onClick={book_now}>Submit</button>
            </div>
        </div>
    )
}

export default Book;