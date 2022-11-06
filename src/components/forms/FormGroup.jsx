import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FormGroup = ({
  type,
  label,
  name,
  value,
  placeholder,
  onChange,
  size,
  required,
  error,
  disabled,
  as,
  rows,
  minLength,
  maxLength,
  extraInfo,
}) => (
  <Form.Group className="form-group" controlId={name}>
    <Form.Label>{label}</Form.Label>
    <Form.Control
      as={as}
      minLength={minLength}
      maxLength={maxLength}
      size={size}
      rows={rows}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      name={name}
      value={value}
      required={required}
      disabled={disabled}
      isInvalid={error}
    />
    {extraInfo && <small className="text-muted">{extraInfo}</small>}
    {error && (
      <div className="text-danger">
        {error instanceof Array ? error[0] : error}
      </div>
    )}
  </Form.Group>
);

FormGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  as: PropTypes.string,
  rows: PropTypes.number,
  extraInfo: PropTypes.string,
};

FormGroup.defaultProps = {
  type: 'text',
  placeholder: '',
  size: 'lg',
  required: false,
  error: undefined,
  disabled: false,
  value: '',
  minLength: undefined,
  maxLength: undefined,
  as: 'input',
  rows: undefined,
  extraInfo: undefined,
};

export default FormGroup;
