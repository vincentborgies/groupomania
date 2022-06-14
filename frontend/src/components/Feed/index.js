import React, { useEffect } from 'react';
import Post from '../Post/index.';

const Feed = (props) => {
  const contentEmpty = (
    <>
      <p id='empty-feed' align='center'>
        Aucun post pour le moment
      </p>
    </>
  );

  if (props.location.pathname === '/') {
    if (props.posts.length > 0) {
      return props.posts.map((p) => {
        return (
          <Post
            postData={p}
            key={p.id}
            setTrigger={props.setTrigger}
            trigger={props.trigger}
            openUpdatePostModal={props.openUpdatePostModal}
            setOpenUpdatePostModal={props.setOpenUpdatePostModal}
          />
        );
      });
    } else return contentEmpty;
  } else {
    const userPosts = props.posts.filter((p) => p.author === props.user);
    if (userPosts.length > 0) {
      return userPosts.map((p) => {
        return (
          <Post
            postData={p}
            key={p.id}
            trigger={props.trigger}
            setTrigger={props.setTrigger}
            openUpdatePostModal={props.openUpdatePostModal}
            setOpenUpdatePostModal={props.setOpenUpdatePostModal}
          />
        );
      });
    } else return contentEmpty;
  }
};

export default Feed;
