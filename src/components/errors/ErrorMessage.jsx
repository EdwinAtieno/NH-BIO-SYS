import { CgRedo } from 'react-icons/cg';
import PropTypes from 'prop-types';
import Button from '../buttons/Button';

const ErrorMessage = ({ message, withRetry, retryAction }) => (
  <div className="centered m-3">
    <div className="text-danger p-3">{message}</div>
    {withRetry && (
      <div className="error-retry-action">
        <Button
          size="sm"
          className="rounded-pill"
          variant="dark"
          onClick={retryAction}
        >
          Retry Action <CgRedo />
        </Button>
      </div>
    )}
  </div>
);

ErrorMessage.propTypes = {
  message: PropTypes.string,
  withRetry: PropTypes.bool,
  retryAction: PropTypes.func,
};

ErrorMessage.defaultProps = {
  message: 'An error occured!',
  withRetry: false,
  retryAction: undefined,
};

export default ErrorMessage;
