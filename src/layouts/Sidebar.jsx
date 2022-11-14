import { Link } from 'react-router-dom';
import { RiUser3Fill } from 'react-icons/ri';
import { FaUserPlus, FaTools, FaHouseUser } from 'react-icons/fa';
import { BsFillGearFill, BsTools } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import PropTypes from 'prop-types';
import Riziki from '../assets/svgs/Logos';
import { links } from '../utils/links';
import useAuth from '../hooks/useAuth';

const Sidebar = ({ show }) => {
  const { logOut } = useAuth();
  return (
    <div
      className={`sidebar
      ${show ? 'sidebar--visible' : 'sidebar--hidden'} 
      `}
    >
      <div className="top">
        <Link to="/">
          <Riziki />
        </Link>
        <h6 className="text-muted">User Panel</h6>
      </div>
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to={links.staffs}>
            <li>
              <RiUser3Fill className="icon" />
              <span>Staff</span>
            </li>
          </Link>

          <Link to={links.suppliers}>
            <li>
              <FaUserPlus className="icon" />
              <span>Suppliers</span>
            </li>
          </Link>

          <Link to={links.equipments}>
            <li>
              <FaTools className="icon" />
              <span>Equipment</span>
            </li>
          </Link>
          <Link to={links.departments}>
            <li>
              <FaHouseUser className="icon" />
              <span>Department</span>
            </li>
          </Link>
          <p className="title">MAINTENANCE</p>
          <Link to={links.repairs}>
            <li>
              <BsTools className="icon" />
              <span>Repairs</span>
            </li>
          </Link>
          <p className="title">Account</p>
          <Link to={links.myAccount}>
            <li>
              <BsFillGearFill className="icon" />
              <span>My Profile</span>
            </li>
          </Link>
          <li>
            <FiLogOut className="icon" />
            <button className="no-style-button" type="button" onClick={logOut}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Sidebar;
