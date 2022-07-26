
import './Bookings.css'
import { db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

//import Data from '../../Data/Data'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Bookings() {
    const navigate = useNavigate()
    const bookingCollectionRef = collection(db, 'bookings')
    const [AllBooking, setAllBooking] = useState([])
    useEffect(() => {
        async function getAllBookings() {
            const data = await getDocs(bookingCollectionRef);
            setAllBooking(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getAllBookings()
        console.log(AllBooking)
    })

    function addHotel() {
    }
    return (
        <div class="admin_bookings">
            <div class="table-admin-bookings">
                <table>
                    <thead>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Check-in Date</th>
                        <th>Check-out Date</th>
                        <th>Total Price</th>

                    </thead>
                    <tbody>
                        {AllBooking.map((booking, xid)=>(
                            <tr key={xid}>
                            <td>{booking.id}</td>
                            <td>{booking.hotelRef}</td>
                            <td>{booking.checkIn}</td>
                            <td>{booking.checkOut}</td>
                            <td>{booking.totalPrice}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Bookings;