
import { useState } from 'react';
import './Add_Hotel.css'
import { storage, db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import {useNavigate} from 'react-router-dom'

function Add_Hotel(){
    const navigate = useNavigate();
    const hotelCollectionRef = collection(db, 'hotel')
    const [HotelName, setHotelName] = useState('');
    const [HotelPrice, setHotelPrice] = useState('');
    const [HotelDescription, setHotelDescription] = useState('');
    const [HotelType, setHotelType] = useState('');
    const [BedType, setBedType] = useState('');
    const [HotelLocation, setHotelLocation] = useState('');
    const [HotelImage, setHotelImage] = useState('');
    const [UploadFile, setUploadFile] = useState('');

    const [HotelImages, setHotelImages] = useState([]);
    const [UploadedProgress, setUploadedProgress] = useState(0)
    const [UploadedImageProgress, setUploadedImageProgress] = useState(0)

    function onInputChange(e){
        const fileName = e.target.files[0]
        
        if (!fileName) return;
        const storageRef = ref(storage, `/Thulani/${fileName.name}`);
        const uploadTask = uploadBytesResumable(storageRef, fileName);
        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
            setUploadedProgress(prog);
        },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => { return setHotelImage(url)
                     })
            }
        );
    }
    function onChangeGallery(e){
        const fileName = e.target.files[0]
        console.log(HotelImages.length)
        if (!fileName) return;
        const storageRef = ref(storage, `/${fileName.name}`);
        const uploadTask = uploadBytesResumable(storageRef, fileName);
        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 100);
            setUploadedImageProgress(prog);
        },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => { 
                        console.log(HotelImages.length)
                        return HotelImages.push(url);
                     })
            }
        );
    }
     
    async function add_hotel(){
        
        await addDoc(hotelCollectionRef,{
            hotelName:HotelName, hotelDescription: HotelDescription, hotelPrice:HotelPrice, hotelType: HotelType,
            bedType:BedType, HotelAddress:HotelLocation, hotelImage:HotelImage,hotelGallery:HotelImages
        }).then((response)=>{
            console.log(response)
            navigate('/hotels')
        })
    }

    return(
        <div className="add_hotel">
		<div className="form-group">
			<label className="form-label">Hotel name</label>
			<input type="text" className="control-form" onChange={(event) => setHotelName(event.target.value)} />
		</div>
        <div className="form-group">
			<label className="form-label">price</label>
			<input type="number" className="control-form" onChange={(event) => setHotelPrice(event.target.value)}/>
		</div>
		<div className="form-group">
			<label className="form-label">Hotel Description</label>
			<input type="text" className="control-form" onChange={(event) => setHotelDescription(event.target.value)}/>
		</div>
		<div className="form-group">
			<label className="form-label">Hotel Type</label>
			<input type="text" className="control-form" onChange={(event) => setHotelType(event.target.value)}/>
		</div>
		<div className="form-group">
			<label className="form-label">Bed Room Type</label>
			<input type="text" className="control-form" onChange={(event) => setBedType(event.target.value)}/>
		</div>
		<div className="form-group">
			<label className="form-label">Address</label>
			<input type="text" className="control-form" onChange={(event) => setHotelLocation(event.target.value)}/>
		</div>
		<div className="form-group">
			<label className="form-label">Hotel Image</label>
			<input type="file" className="control-form" name='file' onChange={onInputChange}/>
            <label>{UploadedProgress}%</label>
		</div>
		<div className="form-group">
			<label className="form-label">Hotel Images Gallary</label>
			<input type="file" className="control-form" onChange={onChangeGallery}/>
            {UploadedImageProgress}%
			
		</div>
		<div className="form-group">
			<button onClick={add_hotel}>Add Hotel</button>
		</div>
	</div>
    )
}

export default Add_Hotel;