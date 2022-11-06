import PropTypes from 'prop-types';

const Loader = ({ variant }) => {
  return <div className={`loader loader-${variant}`} />;
};

Loader.propTypes = {
  variant: PropTypes.string,
};

Loader.defaultProps = {
  variant: 'white',
};

export default Loader;
