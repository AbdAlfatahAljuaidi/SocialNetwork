// Registration.js
import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import '../../../Styles/login.css';

const Registration = ({setUser}) => {
    const [isRegister, setIsRegister] = useState(false);

    const switchToLogin = () => setIsRegister(false);
    const switchToRegister = () => setIsRegister(true);

    return (
        <div className='back bg-main'>
            <div className={`wrapper relative w-[420px] font-abc h-[450px] bg-transparent rounded-lg text-white flex items-center ${isRegister ? 'active' : ''}`}>
                {isRegister ? (
                    <SignUp switchToLogin={switchToLogin} />
                ) : (
                    <Login switchToRegister={switchToRegister} setUser={setUser} />
                )}
            </div>
        </div>
    );
};

export default Registration;
