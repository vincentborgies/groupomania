import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginForm = (props) => {
  const { setAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setEmailError('');
  }, [email]);

  useEffect(() => {
    setPasswordError('');
  }, [password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    axios
      .post(
        '/api/users/login',
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      .then((response) => {
        const accessToken = response.data?.token;
        const userId = response.data?.userData?.userId;
        const isAdmin = response.data?.userData?.isAdmin;
        const photo = response.data?.userData?.photo;
        setAuth({ userId, isAdmin, photo, accessToken });
        navigate('/');
      })
      .catch((err) => {
        err.response?.status === 404 &&
          setEmailError(err.response?.data?.error);
        err.response?.status === 401 &&
          setPasswordError(err.response?.data?.error);
      });
  };

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <form action='' onSubmit={handleLogin} id='form'>
      <label className='label-hidden' htmlFor='email'>
        Email
      </label>
      <br />
      <input
        type='email'
        placeholder='Email'
        className='input'
        id='form__email'
        name='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required='required'
      />
      <div className='error'>{emailError}</div>
      <br />
      <label className='label-hidden' htmlFor='password'>
        Mot de passe
      </label>
      <br />
      <div id='show-password'>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder='Mot de passe'
          className='input'
          id='form__password'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required='required'
        />
        <div className='eye-icon-container'>
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            onClick={handleShowPassword}
            className='eye-icon'
          />
        </div>
      </div>
      <div className='error'>{passwordError}</div>
      <br />
      <input id='form__submit-button' type='submit' value='SE CONNECTER' />
    </form>
  );
};

export default LoginForm;
