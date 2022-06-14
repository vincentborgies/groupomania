import { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from '../../api/axios';

const SignupForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [globalError, setGlobalError] = useState('');

  useEffect(() => {}, [confirmPassword, email]);

  const onChangeEmail = (e) => {
    e.preventDefault();
    const regex = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$';
    if (!e.target.value.match(regex)) {
      setEmail('');
    } else {
      setEmail(e.target.value);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const newUser = new FormData();
    newUser.append(
      'userData',
      JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        email,
        password,
      })
    );
    newUser.append('image', photo);

    if (password !== confirmPassword) {
      setConfirmPasswordError('Les mots de passe ne correspondent pas');
    } else {
      await axios
        .post('api/users/signup', newUser)
        .then((response) => {
          if (response.data) {
            setSuccess(true);
          }
        })
        .catch((err) =>
          err.response.includes('email')
            ? setEmailError(err.response)
            : setGlobalError(err.response)
        );
    }
  };

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = (e) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      {success ? (
        <>
          <LoginForm />
          <span></span>
          <h4 className='success'>
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
        <form
          id='form'
          action='/signup'
          onSubmit={handleSignup}
          encType='multipart/form-data'>
          <label className='label-hidden' htmlFor='firstname'>
            Prénom
          </label>
          <br />
          <input
            type='text'
            placeholder='Prénom'
            className='input'
            id='form__firstname'
            name='firstname'
            onChange={(e) => setFirstName(e.target.value)}
            pattern='[A-Za-z]{1,32}'
            required='required'
          />
          <br />
          <label className='label-hidden' htmlFor='lastname'>
            Nom
          </label>
          <br />
          <input
            type='text'
            placeholder='Nom'
            className='input'
            id='form__lastname'
            name='lastname'
            onChange={(e) => setLastName(e.target.value)}
            pattern='[A-Za-z]{1,32}'
            required='required'
          />
          <br />
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
            onChange={onChangeEmail}
            required='required'
          />
          <div className='error'>{emailError}</div>
          <br />
          <label className='label-hidden' htmlFor='photo'>
            Photo
          </label>
          <br />
          <input
            type='file'
            placeholder='URL de la photo de profil'
            className='input'
            id='form__profile-pic'
            name='image'
            onChange={(e) => setPhoto(e.target.files[0])}
            accept='image/*'
            required='required'
          />
          <br />
          <label className='label-hidden' htmlFor='Mot de passe'>
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
          <br />
          <label className='label-hidden' htmlFor='confirm-password'>
            Confirmer le mot de passe
          </label>
          <br />
          <div id='show-password'>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='Confirmer le mot de passe'
              className='input'
              id='form__confirm-password'
              name='confirm-password'
              onChange={(e) => setConfirmPassword(e.target.value)}
              required='required'
            />
            <div className='eye-icon-container'>
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                onClick={handleShowConfirmPassword}
                className='eye-icon'
              />
            </div>
          </div>
          <div className='error'>{confirmPasswordError}</div>
          <br />
          <label className='label-hidden' htmlFor='is-admin'>
            Admin
          </label>
          <br />
          <div className='error'>{globalError}</div>
          <input id='form__submit-button' type='submit' value="S'INSCRIRE" />
        </form>
      )}
    </>
  );
};

export default SignupForm;
