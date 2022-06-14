import React, { useState } from 'react';
import { Modal } from 'react-modal-overlay';
import 'react-modal-overlay/dist/index.css';
import axios from '../../api/axios';

const UpdatePost = (props) => {
  //states du composants CreatePost
  const [title, setTitle] = useState(props.postData.title);
  const [content, setContent] = useState(props.postData.content);
  const [mediaUrl, setMediaUrl] = useState(props.postData.media_url);

  const handleUpdatePost = (e) => {
    e.preventDefault();

    const updatePostData = {
      title,
      content,
      mediaUrl,
    };

    axios
      .put(`/api/posts/${props.postData.id}`, updatePostData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then(() => {
        props.setTrigger(!props.trigger);
        props.setOpenUpdatePostModal(false);
      })
      .catch((err) => console.log(err));
  };

  const updatePost = (
    <div id=''>
      <Modal
        show={props.openUpdatePostModal}
        closeModal={() => props.setOpenUpdatePostModal(false)}>
        <div id='manage-post__header'>
          <p>MODIFIER LA PUBLICATION</p>
        </div>
        <div className='manage-post__body'>
          <form id='form' method='post' onSubmit={handleUpdatePost}>
            <label htmlFor='new-title'>Titre</label>
            <br />
            <input
              type='text'
              className='input'
              id='new-title'
              name='new-title'
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={props.postData.title}
              required='required'
            />
            <br />
            <label htmlFor='new-content'>Texte</label>
            <br />
            <textarea
              type='text'
              id='new-content'
              name='new-content'
              onChange={(e) => setContent(e.target.value)}
              defaultValue={props.postData.content}
              required='required'
            />
            <br />
            <label htmlFor='new-media'>Photo</label>
            <br />
            <input
              type='text'
              className='input'
              id='new-media'
              name='new-media'
              onChange={(e) => setMediaUrl(e.target.value)}
              defaultValue={props.postData.media_url}
            />

            <div className='import-from-computer'>
              <span>
                <i className='fa-solid fa-folder'></i>
              </span>
            </div>

            <input
              id='form__submit-button'
              type='submit'
              value='PUBLIER LES MODIFICATIONS'
            />
          </form>
        </div>
      </Modal>
    </div>
  );

  return props.openUpdatePostModal && updatePost;
};

export default UpdatePost;
