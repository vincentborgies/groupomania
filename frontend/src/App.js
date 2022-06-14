import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthProvider';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth/index';
import MainLayout from './layouts/MainLayout';
import axios from './api/axios';
import Log from './components/Log/index';
import Home from './pages/Home';
import Profile from './pages/Profile';
import DisplayPost from './pages/DisplayPost';
import Error404 from './pages/Error404';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const [openUpdatePostModal, setOpenUpdatePostModal] = useState(false);
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const [posts, setPosts] = useState([]);
  const [trigger, setTrigger] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/api/posts', {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then((response) => {
        setPosts(response.data.posts);
      })
      .catch((error) => console.log(error));
  }, [trigger]);

  const logout = () => {
    axios
      .get('/api/users/logout', {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then(() => {
        navigate('/connexion');
      })
      .catch((error) => console.log(error.response.data));
  };

  return (
    <AuthProvider>
      <Routes>
        <Route
          path='/connexion'
          element={<Log />}
        />
        <Route element={<RequireAuth />}>
          <Route
            element={
              <MainLayout
                setOpenCreatePostModal={setOpenCreatePostModal}
                dropDownMenu={dropDownMenu}
                setDropDownMenu={setDropDownMenu}
                logout={logout}
              />
            }>
            <Route
              path='/'
              element={
                <Home
                  onClick={() => {
                    dropDownMenu === true && setDropDownMenu(false);
                  }}
                  dropDownMenu={dropDownMenu}
                  openUpdatePostModal={openUpdatePostModal}
                  setOpenUpdatePostModal={setOpenUpdatePostModal}
                  setDropDownMenu={setDropDownMenu}
                  openCreatePostModal={openCreatePostModal}
                  setOpenCreatePostModal={setOpenCreatePostModal}
                  posts={posts}
                  trigger={trigger}
                  setTrigger={setTrigger}
                />
              }
            />
            <Route
              path='/profile/:user'
              element={
                <Profile
                  openCreatePostModal={openCreatePostModal}
                  setOpenCreatePostModal={setOpenCreatePostModal}
                  posts={posts}
                  trigger={trigger}
                  setTrigger={setTrigger}
                  openUpdatePostModal={openUpdatePostModal}
                  setOpenUpdatePostModal={setOpenUpdatePostModal}
                  logout={logout}
                />
              }
            />
            <Route path='/post' element={<DisplayPost />} />
          </Route>
        </Route>

        <Route to='*' element={<Error404 />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
