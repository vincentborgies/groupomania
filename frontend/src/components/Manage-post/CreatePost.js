import React, { useState } from 'react';
import { Modal } from 'react-modal-overlay';
import 'react-modal-overlay/dist/index.css';
import axios from '../../api/axios';

const CreatePost = (props) => {
  //states du composants CreatePost
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');

  const handleCreatePost = async (e) => {
    e.preventDefault();

    const createPostData = {
      title,
      content,
      mediaUrl,
    };

    axios
      .post('/api/posts', createPostData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then(() => {
        props.setTrigger(!props.trigger);
        props.setOpenCreatePostModal(false);
      })
      .catch((err) => console.log(err));
  };

  const createPost = (
    <div id=''>
      <Modal
        show={props.openCreatePostModal}
        closeModal={() => props.setOpenCreatePostModal(false)}>
        <div id='manage-post__header'>
          <p>NOUVELLE PUBLICATION</p>
        </div>
        <div className='manage-post__body'>
          <form id='form' method='post' onSubmit={handleCreatePost}>
            <label htmlFor='new-title'>Titre</label>
            <br />
            <input
              type='text'
              className='input'
              placeholder='Ajouter un titre'
              id='new-title'
              name='new-title'
              onChange={(e) => setTitle(e.target.value)}
              required='required'
            />
            <br />
            <label htmlFor='new-content'>Texte</label>
            <br />
            <textarea
              type='text'
              placeholder='Ajouter du texte'
              id='new-content'
              name='new-content'
              onChange={(e) => setContent(e.target.value)}
              required='required'
            />
            <br />
            <label htmlFor='new-media'>Photo</label>
            <br />
            <input
              type='text'
              className='input'
              placeholder="Ajouter l'URL de la photo"
              id='new-media'
              name='new-media'
              onChange={(e) => setMediaUrl(e.target.value)}
            />

            <div className='import-from-computer'>
              <span>
                <i className='fa-solid fa-folder'></i>
              </span>
            </div>

            <input id='form__submit-button' type='submit' value='PUBLIER' />
          </form>
        </div>
      </Modal>
    </div>
  );

  return props.openCreatePostModal && createPost;
};

export default CreatePost;
