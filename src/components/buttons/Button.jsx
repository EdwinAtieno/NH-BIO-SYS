import { Button as ButtonBs } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import Loader from '../spinners/Loader';

const Button = ({
  type,
  href,
  variant,
  size,
  children,
  disabled,
  isLoading,
  className,
}) => {
  return (
    <ButtonBs
      className={`shadow-none ${className}`}
      type={type}
      href={href}
      variant={variant}
      size={size}
      disabled={disabled}
    >
      {children} {isLoading && <Loader />}
    </ButtonBs>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  href: PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  href: undefined,
  size: 'lg',
  variant: 'hot-deals',
  children: 'please add some text',
  disabled: false,
  isLoading: false,
  className: '',
};

export default Button;
