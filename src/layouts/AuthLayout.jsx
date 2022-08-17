import PropTypes from 'prop-types';

const AuthLayout = ({ children }) => {
  return (
    <section className="auth-layer__wrapper">
      <header />
      <main>{children}</main>
      <footer className="copyright">
        Copyright &copy;{new Date().getFullYear()}, Riziki
      </footer>
    </section>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
