import React from 'react';
import Header from '../components/Header/index';
import { Outlet } from 'react-router-dom';

const MainLayout = (props) => {
  return (
    <div>
      <Header
        dropDownMenu={props.dropDownMenu}
        setDropDownMenu={props.setDropDownMenu}
        setOpenCreatePostModal={props.setOpenCreatePostModal}
        logout={props.logout}
      />
      <div id='app-body'>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
