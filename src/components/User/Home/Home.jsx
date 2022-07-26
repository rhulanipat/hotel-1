
import { useNavigate } from 'react-router-dom'
import './Home.css';
import Header from '../Header/Header';

import { AiTwotoneCar, AiTwotoneShop } from 'react-icons/ai';
//sum1 images
import image1 from '../../../hotelImages/sun1/sun1z.jpg';
import image2 from '../../../hotelImages/sun1/sun1Room4.webp';
import image3 from '../../../hotelImages/sun1/sun1Room2.jpg';
import image4 from '../../../hotelImages/sun1/sun1Room3.jpg';
import image5 from '../../../hotelImages/sun1/sun1Room4.webp';
import image6 from '../../../hotelImages/sun1/sun1x.jpg';
import image7 from '../../../hotelImages/sun1/sun1y.jpg';
//stay easy images
import image10 from '../../../hotelImages/StayEasy/stay-easy.jpg';
import image11 from '../../../hotelImages/StayEasy/easy2.jpg';
import image12 from '../../../hotelImages/StayEasy/easyRoom2.jpg';
import image13 from '../../../hotelImages/StayEasy/easy4.jpg';
import image14 from '../../../hotelImages/StayEasy/easyRoom6.jpg';
import image15 from '../../../hotelImages/StayEasy/easyRoom5.jpg';
import image16 from '../../../hotelImages/StayEasy/easyRoom1.jpg';
import image17 from '../../../hotelImages/StayEasy/easyRoom3.jpg';
import image18 from '../../../hotelImages/StayEasy/easyRoom4.jpg';
//Chillie paper images
import image19 from '../../../hotelImages/chillPapper/chill Papper2.jpg';
import image20 from '../../../hotelImages/chillPapper/chillRoom1.jpg';
import image21 from '../../../hotelImages/chillPapper/chillRoom2.jpg';
import image22 from '../../../hotelImages/chillPapper/chillRoom3.jpg';
import image23 from '../../../hotelImages/chillPapper/chillRoom4.jpg';
import { useState, useEffect } from 'react';

import {db} from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

function Home() {
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


    // const [Hotel, setHotel] = useState([
    //     {
    //         id: 1, name: "Sun1", image: image1, price: 700, description: "bjkdsbj hdshdskh dsbvh ksdksdbjkds udsodsfudf guiefg uyewoh efguidf gufd", bedType: "Queen Bed", hotelType: "Suite Hotel",
    //         gallary: [{ image: image2 }, { image: image3 }, { image: image4 }, { image: image5 }, { image: image6 }, { image: image7 }, { image: image1 }]
    //     },
    //     {
    //         id: 2, name: "Stay Easy", image: image11, price: 950, description: "bjkdsbj hdshdskh dsbvh ksdksdbjkds udsodsfudf guiefg uyewoh efguidf gufd", bedType: "Queen Bed", hotelType: "Suite Hotel",
    //         gallary: [{ image: image12 }, { image: image13 }, { image: image14 }, { image: image15 }, { image: image16 }, { image: image17 }, { image: image18 }]
    //     },
    //     {
    //         id: 3, name: "Chill Pepper", image: image19, price: 1000, description: "bjkdsbj hdshdskh dsbvh ksdksdbjkds udsodsfudf guiefg uyewoh efguidf gufd", bedType: "Queen Bed", hotelType: "Suite Hotel",
    //         gallary: [{ image: image20 }, { image: image21 }, { image: image22 }, { image: image23 }]
    //     }
    // ])
    const view_hotel = (data) => {
        navigate('/view_rooms',{state:{newData:data}})
    }

    return (
        <div className='home'>

            <div className='home-top'>
                <Header></Header>
            </div>
            <div className='display-hotels'>
                {AllHotels.map((hotels, xid) => (
                    <div className='hotel-details' onClick={() => view_hotel(hotels)} key={xid}>
                        <label>{hotels.hotelName}</label>
                        <span id='hotel-det'>
                            <span className='hotel-image'>
                                <img src={hotels.hotelImage} alt={hotels.hotelName} />
                            </span>
                            <span className='hotel-description'>
                                <p>Price : <b>R {hotels.hotelPrice} per night</b></p><br />
                                <p>Description :<b>{hotels.hotelDescription}</b><br />
                                </p>
                                <p>Bed Type :<b>{hotels.bedType}</b></p>
                                <p>Hotel Type :<b>{hotels.hotelType}</b></p>
                            </span>

                        </span>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Home;