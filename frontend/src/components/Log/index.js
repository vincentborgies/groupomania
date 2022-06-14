import React, { useState } from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import Logo from '../../assets/images/icon-left-font.png';

const Log = (props) => {
  const [signupModal, setSignupModal] = useState(false);
  const [loginModal, setLoginModal] = useState(true);

  const handleModals = (e) => {
    if (e.target.id === 'signup') {
      setLoginModal(false);
      setSignupModal(true);
    } else if (e.target.id === 'login') {
      setSignupModal(false);
      setLoginModal(true);
    }
  };

  return (
    <div id='connect-page'>
      <div id='logo'>
        <img src={Logo} alt='logo groupomania' />
      </div>
      <ul id='select-form'>
        <li
          onClick={handleModals}
          id='login'
          className={loginModal ? 'active-btn' : null}>
          SE CONNECTER
        </li>
        <li
          onClick={handleModals}
          id='signup'
          className={signupModal ? 'active-btn' : null}>
          S'INSCRIRE
        </li>
      </ul>
      {signupModal && <SignupForm />}
      {loginModal && <LoginForm />}
    </div>
  );
};

export default Log;
