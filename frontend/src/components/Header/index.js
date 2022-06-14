import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/icon-left-font.png';
import useAuth from '../../hooks/useAuth';

const Header = (props) => {
  const { auth } = useAuth();

  return (
    <header
      id='header'
      onClick={() => props.dropDownMenu && props.setDropDownMenu(false)}>
      <Link to='/' id='header__logo'>
        <img src={logo} alt='header-logo' />
      </Link>
      <nav>
        <ul id='header__menu-nav'>
          <li id='header__home'>
            <Link to='/'>
              <FontAwesomeIcon icon={faHome} />
            </Link>
          </li>
          <li id='header__newpost'>
            <FontAwesomeIcon
              icon={faSquarePlus}
              onClick={() => props.setOpenCreatePostModal(true)}
            />
          </li>
          <li id='header__profile'>
            <div
              onClick={() => {
                props.setDropDownMenu(!props.dropDownMenu);
              }}>
              <img src={auth.photo} alt='' />
            </div>

            {props.dropDownMenu && (
              <div className='dropdown-menu'>
                <ul>
                  <Link
                    onClick={() => props.setDropDownMenu(!props.dropDownMenu)}
                    id='goto-profile-page'
                    className='flex'
                    to={`/profile/${auth.userId}`}>
                    <FontAwesomeIcon
                      className='dropdown-menu__icon'
                      icon={faUser}
                    />
                    <li>Mon profil</li>
                  </Link>
                  <a id='logout' className='flex' onClick={props.logout}>
                    <FontAwesomeIcon
                      className='dropdown-menu__icon'
                      icon={faArrowRightFromBracket}
                    />
                    <li>Déconnexion</li>
                  </a>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
