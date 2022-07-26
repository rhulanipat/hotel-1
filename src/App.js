import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminHome from './components/Admin/Hotels/Hotels';
import Add_Hotel from './components/Admin/Add_Hotel/Add_Hotel';
import DisplayHotels from './components/User/DisplayHotels/DisplayHotels';
import BookNow from './components/User/Book/Book';
import Bookings from './components/Admin/Bookings/Bookings';
import Login from './components/User/Login/Login';
import Register from './components/User/Register/Register';
import Home from './components/User/Home/Home';
import View_Rooms from './components/User/View_Rooms/View_Rooms';
import Hotels from './components/Admin/Hotels/Hotels';


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
      <Routes>
      {/* <Route exact path='/' element={<Home />} /> */}
      <Route exact path='/' element={<DisplayHotels />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/view_rooms' element={<View_Rooms />} />
        <Route exact path='/Hotels' element={<AdminHome />} />
        <Route exact path='/add_hotel' element={<Add_Hotel />} />
        <Route exact path='/hotels' element={<Hotels />} />
        <Route exact path='/book_now' element={<BookNow />} />
        <Route exact path='/bookings' element={<Bookings />} />
      </Routes>
    </Router>
  );
}
export default App;
