import PropTypes from 'prop-types';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';
import Sidebar from './Sidebar';

const PrimaryLayout = ({ children }) => {
  const { user } = useAuth();
  const [show, setShow] = useState(false);

  const toggle = () => {
    setShow(!show);
  };

  const date = new Date();
  const hours = date.getHours();
  let greeting;

  if (hours >= 0 && hours < 12) {
    greeting = 'Good Morning';
  } else if (hours >= 12 && hours < 17) {
    greeting = 'Good Afternoon';
  } else if (hours >= 17 && hours < 24) {
    greeting = 'Good Evening';
  }

  return (
    <section className="primary-layout__container">
      <Sidebar show={show} />
      <article className="primary-layout__main">
        <header className="primary-layout__header">
          <nav className="primary-layout__nav">
            <button
              type="button"
              className="no-style-button toggle-sidebar"
              onClick={toggle}
            >
              <FiMenu />
            </button>

            <ul>
              <li>
                <strong className="text-muted">
                  {greeting} {user?.first_name} {user?.last_name}
                </strong>
              </li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
      </article>
    </section>
  );
};

PrimaryLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrimaryLayout;
