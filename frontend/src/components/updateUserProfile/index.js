import React, { useState } from 'react';
import { Modal } from 'react-modal-overlay';
import 'react-modal-overlay/dist/index.css';
import axios from '../../api/axios';

const UpdateUserProfile = (props) => {
  const [firstname, setFirstName] = useState(props.userData.firstname);
  const [lastname, setLastName] = useState(props.userData.lastname);
  const [email, setEmail] = useState(props.userData.email);

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    const updateUserData = {
      firstname,
      lastname,
      email,
    };

    axios
      .put(`/api/users/${props.user}`, updateUserData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then(() => {
        props.setTrigger(props.trigger + 1);
        props.setUpdateProfile(props.updateProfile + 1)
        props.setIsOpen(false);

      })
      .catch((err) => console.log(err));
  };

  const deleteProfile = (e) => {
    e.preventDefault();
    props.deleteProfile();
    props.setTrigger(props.trigger + 1);
  };

  return (
    <div id=''>
      <Modal show={props.isOpen} closeModal={() => props.setIsOpen(false)}>
        <div id='manage-post__header'>
          <p>MES INFORMATIONS</p>
        </div>
        <div className='manage-post__body'>
          <form id='form' method='post' onSubmit={handleUpdateUser}>
            <label htmlFor='new-title'>Prénom</label>
            <br />
            <input
              type='text'
              defaultValue={props.userData.firstname}
              className='input'
              id='new-title'
              name='new-title'
              onChange={(e) => setFirstName(e.target.value)}
              required='required'
            />
            <br />
            <label htmlFor='new-content'>Nom</label>
            <br />
            <input
              defaultValue={props.userData.lastname}
              type='text'
              id='new-content'
              className='input'
              name='new-content'
              onChange={(e) => setLastName(e.target.value)}
              required='required'
            />
            <br />
            <label htmlFor='new-media'>Email</label>
            <br />
            <input
              defaultValue={props.userData.email}
              type='text'
              className='input'
              id='email'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              required='required'
            />

            <div className='import-from-computer'>
              <span>
                <i className='fa-solid fa-folder'></i>
              </span>
            </div>

            <input
              id='form__submit-button'
              type='submit'
              value='METTRE A JOUR'
            />
          </form>
          <button id='delete-profile-btn' onClick={deleteProfile}>
            SUPPRIMER MON PROFIL
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateUserProfile;
