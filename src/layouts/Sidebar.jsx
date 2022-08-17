import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { RiDashboardFill, RiUser3Fill } from 'react-icons/ri';
import { FaUserPlus, FaUserCheck, FaStoreAlt, FaTruck } from 'react-icons/fa';
import { BsFillCreditCardFill, BsFillGearFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { MdCategory } from 'react-icons/md';
import { BiCategory } from 'react-icons/bi';
import PropTypes from 'prop-types';
import AuthContext from '../context/auth/AuthContext';
import Riziki from '../assets/svgs/Logos';
import { links } from '../utils/links';

const Sidebar = ({ show }) => {
  const { logOutAdmin } = useContext(AuthContext);

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
        <h6 className="text-muted">Admin Panel</h6>
      </div>
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to={links.dashboard}>
            <li>
              <RiDashboardFill className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">USERS</p>
          <Link to={links.customers}>
            <li>
              <RiUser3Fill className="icon" />
              <span>Customers</span>
            </li>
          </Link>

          <Link to={links.agents}>
            <li>
              <FaUserPlus className="icon" />
              <span>Agents</span>
            </li>
          </Link>

          <Link to={links.deliveryOfficers}>
            <li>
              <FaUserCheck className="icon" />
              <span>Delivery Officers</span>
            </li>
          </Link>
          <Link to={links.drivers}>
            <li>
              <FaUserCheck className="icon" />
              <span>Drivers</span>
            </li>
          </Link>
          <p className="title">PRODUCTS</p>
          <Link to={links.products}>
            <li>
              <FaStoreAlt className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to={links.classifications}>
            <li>
              <MdCategory className="icon" />
              <span>Classifications</span>
            </li>
          </Link>
          <Link to={links.categories}>
            <li>
              <BiCategory className="icon" />
              <span>Categories</span>
            </li>
          </Link>
          <Link to={links.subCategories}>
            <li>
              <MdCategory className="icon" />
              <span>Sub Categories</span>
            </li>
          </Link>
          <p className="title">REGIONS</p>
          <Link to={links.regions}>
            <li>
              <FaStoreAlt className="icon" />
              <span>Regions</span>
            </li>
          </Link>
          <Link to={links.shops}>
            <li>
              <FaStoreAlt className="icon" />
              <span>Shops</span>
            </li>
          </Link>
          <Link to={links.orders}>
            <li>
              <BsFillCreditCardFill className="icon" />
              <span>Orders</span>
            </li>
          </Link>
          <Link to={links.deliveries}>
            <li>
              <FaTruck className="icon" />
              <span>Deliveries</span>
            </li>
          </Link>

          <p className="title">Account</p>
          <Link to={links.myAccount}>
            <li>
              <BsFillGearFill className="icon" />
              <span>My Account</span>
            </li>
          </Link>
          <li>
            <FiLogOut className="icon" />
            <span
              role="button"
              tabIndex={-1}
              onClick={logOutAdmin}
              onKeyDown={logOutAdmin}
            >
              Logout
            </span>
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
