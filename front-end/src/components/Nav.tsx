import logo from '../assets/img/argentBankLogo.png'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';

const Nav = () => {

  const dispatch = useDispatch<AppDispatch>()
  const token = useSelector((state: any) => state.user.token)
  const firstName = useSelector((state: any) => state.user.user.firstName)

  const handleClick = () => {
    dispatch({
      type: 'user/disconnect'
    })
  }

  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        {token != '' ? <>
        <i className="fa fa-user-circle"></i>
        <NavLink to="/profile" className="nav--item">
          {firstName}
        </NavLink>
        <i className="fa fa-sign-out"></i>
        <NavLink onClick={handleClick} className="main-nav-item" to="/login">
          
          Disconnect
        </NavLink></> : <NavLink className="main-nav-item" to="/login">
          <i className="fa fa-user-circle"></i>
          Sign In
        </NavLink>}

      </div>
    </nav>
  );
};

export default Nav;