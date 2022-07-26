import { NavLink, useNavigate } from "react-router-dom";
import { useState } from 'react';
import login from './Login.css';
import padlock from '../../../assets/padlock.png';
import view from '../../../assets/view.png';
import envelope from '../../../assets/envelope.png';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../config/firebase';

const Login = () => {
    const navigate = useNavigate();
    var [LoginTasks, setLoginTasks] = useState({
        email: '',
        password: '',
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setLoginTasks(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const Login = async () => {
        // if(!LoginTasks.email || !LoginTasks.password) return alert('Please enter all the fields')

        signInWithEmailAndPassword(auth, LoginTasks.email, LoginTasks.password)
            .then((userCredential) => {
                localStorage.setItem('userId',userCredential.user.uid)
                localStorage.setItem('userEmail',userCredential.user.email)
                navigate('/')
            })
            .catch((error) => {
                console.log('wrong username or password')
            });


    }
    return (
        <body id={login.login}>

            <div id={login.main}>
                <h1>Login</h1>
                <div id={login.forms}>
                    <div className={login.formGroup}>
                        <input type="text" name="email" className={login.controlForm} placeholder="E-mail"
                            value={LoginTasks.email} onChange={handleChange} />
                    </div>
                    <div className={login.formGroup}>
                        <input type="password" name="password" className={login.controlForm} placeholder="Password"
                            value={LoginTasks.password} onChange={handleChange} />
                    </div>

                    <div className={login.formGroup}>
                        <button className={login.btn} onClick={Login} >Login </button>
                    </div>
                    <div className="reg">
                        <p>Don’t have an account? <br /><br /><NavLink activeClassName="is-active" to="/register">Register</NavLink></p>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default Login;