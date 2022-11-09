import PropTypes from 'prop-types';

const Banner = ({ text, variant, textColor }) => {
  return (
    <p className={`p-2 rounded text-${textColor} bg-${variant}`}>{text}</p>
  );
};

Banner.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.string,
  textColor: PropTypes.string,
};

Banner.defaultProps = {
  variant: 'primary',
  textColor: 'white',
};

export default Banner;
