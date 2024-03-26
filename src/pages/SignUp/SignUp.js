import React, { useEffect, useState } from 'react';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if(token){
            navigate('/Login')
        }
    }, [navigate]);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if (!validateEmail(email)) {
            toast.error('Please enter a valid email address');
            return;
        }
        
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }

        try {
            const regObj = { email, password }; 
            const response = await fetch('https://reqres.in/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(regObj)
            });
            if (response.ok) {
                const data = await response.json();
                
                
                navigate('/Login'); 
                toast.success("SignUp Successful");
            } else {
                toast.error('Login Failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('An error occurred during login');
        }
    };
  
    return (
        <div className='Login-upperpart'>
            <h2>Sign Up Page</h2>
            <form onSubmit={handleSubmit}>
                <div className='Login-up-one-name-email'>
                    <label htmlFor="email">Email:</label>
                    <input     minLength={1}
                    maxLength={10} onChange={(e) => setEmail(e.target.value)} value={email} type="text" id="email" />
                </div>
                <div className='Login-up-two-three-name-three'>
                    <label htmlFor="password">Password:</label>
                    <input     minLength={1}
                    maxLength={10} onChange={(e) => setPassword(e.target.value)} value={password} type="password" id="password" />
                </div>
                <div className='Login-up-name-buttons-one'>
                    <button type="submit">Sign Up </button>

                </div>
            </form>
        </div>
    );
};

export default SignUp;
