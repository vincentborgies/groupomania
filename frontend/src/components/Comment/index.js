import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';

const Comment = (props) => {
  const { auth } = useAuth();

  const deleteComment = (e) => {
    e.preventDefault();
    props.setTrigger(props.trigger + 1);
    axios.delete(
      `/api/posts/${props.postId}/comments/${props.commentData.id}`,
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
  };

  return (
    <div className='comment'>
      <img
        src={props.commentData.author_photo}
        className='comment__profile-pic'
        alt=''
      />
      <div className='comment__container'>
        <div className='comment__author'>{props.commentData.author_name}</div>
        <div className='comment__content'>{props.commentData.content}</div>
      </div>
      {(auth.userId === props.commentData.author || auth.isAdmin) && (
        <FontAwesomeIcon icon={faXmark} onClick={deleteComment} />
      )}
    </div>
  );
};

export default Comment;
