import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPen } from '@fortawesome/free-solid-svg-icons';
import { useParams, useLocation } from 'react-router-dom';
import CreatePost from '../components/Manage-post/CreatePost';
import Feed from '../components/Feed/index';
import UpdateUserProfile from '../components/updateUserProfile';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const Profile = (props) => {
  const user = Number(useParams().user);
  const location = useLocation();
  const [updateProfile, setUpdateProfile] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState([]);
  const { auth } = useAuth();

  const deleteProfile = () => {
    axios
      .delete(`api/users/${user}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then(() => {
        props.logout();
        props.setTrigger(props.trigger + 1);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`api/users/${user}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then((response) => {
        setIsLoading(false);
        const data = response.data.userInfos;
        setProfile(data);
      })
      .catch((error) => console.log(error));
  }, [user, updateProfile]);

  const loading = <div>chargement...</div>;

  const profilePage = (
    <>
      <div id='profile-page'>
        <UpdateUserProfile
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          user={user}
          userData={profile}
          deleteProfile={deleteProfile}
          setTrigger={props.setTrigger}
          trigger={props.trigger}
          setUpdateProfile={setUpdateProfile}
          updateProfile={updateProfile}
        />
        <img src={profile.photo} alt='' />
        <div id='profile-page__infos'>
          <div id='profile-page__name'>
            {profile.firstname + ' ' + profile.lastname}
          </div>
          <div id='profile-page__email'>
            <span>
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <span>{profile.email}</span>
          </div>
          {auth?.userId === user && (
            <>
              <button
                id='profile-page__update-infos'
                onClick={() => setIsOpen(true)}>
                <span>
                  <FontAwesomeIcon className='fa-pen' icon={faPen} />
                </span>
                <span>Modifier mon profil</span>
              </button>
            </>
          )}
        </div>
      </div>
      <Feed
        openCreatePostModal={props.openCreatePostModal}
        posts={props.posts}
        trigger={props.trigger}
        setTrigger={props.setTrigger}
        isLoading={props.isLoading}
        user={user}
        location={location}
        openUpdatePostModal={props.openUpdatePostModal}
        setOpenUpdatePostModal={props.setOpenUpdatePostModal}
      />
      <CreatePost
        openCreatePostModal={props.openCreatePostModal}
        setOpenCreatePostModal={props.setOpenCreatePostModal}
        setTrigger={props.setTrigger}
        trigger={props.trigger}
      />
    </>
  );

  return isLoading ? loading : profilePage;
};

export default Profile;
