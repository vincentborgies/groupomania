import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Comment from '../Comment';
import UpdatePost from '../../components/Manage-post/UpdatePost';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import axios from '../../api/axios';

const Post = (props) => {
  const { auth } = useAuth();
  const [commentContent, setCommentContent] = useState('');
  const [openDropDown, setOpenDropDown] = useState(false);
  const [displayComments, setDisplayComments] = useState(false);
  const inputComment = useRef();
  const isLiked = props.postData.Likes.find((e) => e.author === auth.userId);
  const comments = props.postData.Comments;

  const handleNewComment = (e) => {
    e.preventDefault();
    commentContent !== '' &&
      axios
        .post(
          `/api/posts/${props.postData.id}/comments`,
          { content: commentContent },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        )
        .then(() => {
          props.setTrigger(props.trigger + 1);
          setDisplayComments(true);
          inputComment.current.value = '';
        });
  };

  const deletePost = (e) => {
    e.preventDefault();
    axios
      .delete(`/api/posts/${props.postData.id}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then(() => {
        props.setTrigger(props.trigger + 1);
      })
      .catch((error) => console.log(error));
  };

  const handleLikePost = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    };
    fetch(
      `${process.env.REACT_APP_API_URL}api/posts/${props.postData.id}/likes`,
      requestOptions
    )
      .then(() => {
        props.setTrigger(props.trigger + 1);
      })
      .catch((error) => console.log(error));
  };

  const dropDownMenu = (
    <div className='dropdown-menu'>
      <div className='tripoints' onClick={() => setOpenDropDown(true)}>
        ...
      </div>
      {openDropDown && (
        <ul>
          {auth.userId === props.postData.author && (
            <li
              className='dropdown-menu__update'
              onClick={() => {
                props.setOpenUpdatePostModal(true);
              }}>
              Modifier
            </li>
          )}
          <li className='dropdown-menu__delete' onClick={deletePost}>
            Supprimer
          </li>
        </ul>
      )}
    </div>
  );

  const commentsArea =
    comments.length > 0 &&
    comments.map((c) => {
      return (
        <Comment
          commentData={c}
          key={c.id}
          postId={props.postData.id}
          setTrigger={props.setTrigger}
          trigger={props.trigger}
        />
      );
    });

  return (
    <div
      className='post'
      onClick={() => openDropDown && setOpenDropDown(false)}>
      <div className='post__upper'>
        <div className='post__header'>
          <div className='post__user'>
            <Link to={`/profile/${props.postData.author}`}>
              <img
                src={props.postData.author_photo}
                className='post__profile-pic post__profile-pic--post'
                alt=''
              />
            </Link>
            <div className='post__user-infos'>
              <div className='post__username'>{props.postData.author_name}</div>
              <div className=''></div>
            </div>
          </div>
          <div className='post__update-menu'>
            {(auth.isAdmin || auth.userId === props.postData.author) &&
              dropDownMenu}
          </div>
        </div>
        <div className='post__title'>
          <p>{props.postData.title}</p>
        </div>
        <div className='post__content'>
          <p>{props.postData.content}</p>
        </div>
      </div>
      <div className='post__media'>
        <img src={props.postData.media_url} alt='' />
      </div>
      <div className='post__footer'>
        <div className='post__reactions post__reactions--likes'>
          <div onClick={handleLikePost} className='post__likes'>
            <FontAwesomeIcon
              icon={faThumbsUp}
              className={
                isLiked ? 'fa-solid fa-thumbs-up red' : 'fa-solid fa-thumbs-up'
              }
            />
            <span className='reactions-count'>
              {props.postData.Likes.length}
            </span>
          </div>
        </div>
        <div className='post__reactions post__reactions--comments'>
          <FontAwesomeIcon
            icon={faMessage}
            className='fa-solid fa-message'
            onClick={() => setDisplayComments(!displayComments)}
          />
          <span className='reactions-count'>
            {props.postData.Comments.length}
          </span>
        </div>
      </div>
      <div className='post__comment-block'>
        <img
          src={auth.photo}
          className='post__profile-pic post__profile-pic--comment'
          alt=''
        />
        <input
          className='post__comment'
          placeholder='Ajouter un commentaire...'
          onChange={(e) => setCommentContent(e.target.value)}
          ref={inputComment}
          required='required'
          value={commentContent}></input>
        <div className='fa-paper-container'>
          <FontAwesomeIcon
            icon={faPaperPlane}
            className='fa-solid fa-paper'
            onClick={handleNewComment}
          />
        </div>
      </div>
      <UpdatePost
        setTrigger={props.setTrigger}
        trigger={props.trigger}
        openUpdatePostModal={props.openUpdatePostModal}
        setOpenUpdatePostModal={props.setOpenUpdatePostModal}
        postData={props.postData}
      />
      <div>{displayComments && commentsArea}</div>
    </div>
  );
};

export default Post;
