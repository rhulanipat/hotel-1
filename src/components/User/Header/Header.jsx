
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { db } from '../../config/firebase'
import { collection,doc, getDocs  } from 'firebase/firestore';

import header from './Header.module.css';
function Header() {
    const navigate = useNavigate()
    const [usersInfo, setusersInfo] = useState([])
    const [oneUser, setoneUser] = useState({})

    const [username, setusername] = useState('register')
    const usersCollectionRef = collection(db, "prime")

    const HotelCollectionRef = collection(db, "hotel")
    let [HotelData, setHotelData] = useState([]);
    let [LogLabel, setLogLabel] = useState('login')

    useEffect(() => {
        let getId = localStorage.getItem('userId')
        if (getId === null || getId === '') return;
        const getUser = async () => {
            const data = await getDocs(usersCollectionRef);
            setLogLabel('logout')
            setusername(getId)
            console.log(LogLabel)
            // setusersInfo(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            // for (var user = 0; user < usersInfo.length; user++) {
            //     if (usersInfo[user].id_ref === getId) {
            //         setoneUser(usersInfo[user])
            //         setusername(usersInfo[user].name)
            //         setLogLabel('Logout')
            //     }
            // }
        }

        const getHotels = async () => {
            const hotelCollection = await getDocs(HotelCollectionRef);
            setHotelData(hotelCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getUser();
        getHotels();
        console.log()
    }, [usersInfo])

    function logout() {
        if (LogLabel === 'login') {
            return navigate('/login')
        }
        localStorage.removeItem('userId')
        localStorage.removeItem('userEmail')
        window.location.reload()
    }

    function register(){
        if(username !=='register'){
            return;
        }
        navigate('/register')
    }

    return (
        <div className={header.main}>
            <div className={header.navBar}>
                <ul className={header.nav}>
                    <li><NavLink to={'/'} className={header.isActive} >Home</NavLink></li>
                    <li><NavLink to={'/about'} className={header.isActive}>About</NavLink></li>
                    <li><NavLink to={'#'} className={header.isActive}>Services</NavLink></li>
                    <li><NavLink to={'#'} className={header.isActive}>Contact</NavLink></li>
                    <li><input type="text" className={header.searchBtn} /></li>
                </ul>
                <label className={header.logout} onClick={register}>{username}</label>
                <label className={header.logout} onClick={logout}>{LogLabel}</label>
                
                
            </div>

        </div>
    )
}

export default Header;