import { NavLink, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../config/firebase'
import { addDoc, collection } from 'firebase/firestore';
import register from './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const userCollectionRef = collection(db, 'prime')

    var [RegisterTasks, setRegisterTasks] = useState({
        email: '',
        surname: '',
        name: '',
        password: '',
        confirmPasswords: ''
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setRegisterTasks(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const Register = async () => {

        var regPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        var regEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

        if (!RegisterTasks.email) return alert('Please enter Email Address');
        if (!regEmail.test(RegisterTasks.email)) return alert('Enter valid email');
        if (!RegisterTasks.surname) return alert('Please enter Surname');
        if (!RegisterTasks.name) return alert('Please enter Name');
        if (!RegisterTasks.password) return alert('Please enter Password');
        if (!regPassword.test(RegisterTasks.password)) return alert('Please enter strong Password');
        if (!RegisterTasks.confirmPasswords) return alert('Please enter Password');
        if (RegisterTasks.password !== RegisterTasks.confirmPasswords) return alert('Password must match');
        console.log(RegisterTasks)
        await createUserWithEmailAndPassword(auth, RegisterTasks.email, RegisterTasks.password)
            .then((response) => {
                addDoc(userCollectionRef, { name: RegisterTasks.name, surname: RegisterTasks.surname, userIdRef: response.user.uid })
                localStorage.setItem('userId', JSON.stringify(response.user.uid))
                navigate('/')
            }).catch((err) => {
                console.log(err);
            });

    }
    return (
        <body id={register.register}>
            <div id={register.main}>
                <h1>Register</h1>

                <div id="forms">
                    <div className={register.formGroup}>
                        <input type="text" name="email" className={register.controlForm} placeholder="E-mail"
                            value={RegisterTasks.email} onChange={handleChange} />
                    </div>

                    <div className={register.formGroup}>
                        <input type="text" name="name" className={register.controlForm} placeholder="Names"
                            value={RegisterTasks.name} onChange={handleChange} />
                    </div>

                    <div className={register.formGroup}>
                        <input type="text" name="surname" className={register.controlForm} placeholder="Surname"
                            value={RegisterTasks.surname} onChange={handleChange} />
                    </div>

                    <div className={register.formGroup}>
                        <input type="password" name="password" className={register.controlForm} placeholder="Password"
                            value={RegisterTasks.password} onChange={handleChange} />
                    </div>

                    <div className={register.formGroup}>
                        <input type="password" name="confirmPasswords" className={register.controlForm} placeholder="Verify Password"
                            value={RegisterTasks.confirmPasswords} onChange={handleChange} />
                    </div>

                    <div className={register.formGroup}>
                        <button className={register.btn} onClick={Register}>Register</button>
                    </div >

                    <div className="log">
                        <p>Do you have account? <br /><br /><NavLink activeclassNameName="is-active" to="/login">Login</NavLink></p>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default Register;