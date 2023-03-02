import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FormSelect = ({
  options,
  label,
  name,
  defaultValue,
  onChange,
  size,
  required,
  error,
  disabled,
  extraInfo,
  description,
}) => (
  <Form.Group className="form-group" controlId={name}>
    <Form.Label>{label}</Form.Label>
    <Form.Select
      onChange={onChange}
      name={name}
      required={required}
      disabled={disabled}
      isInvalid={error}
      size={size}
      defaultValue={defaultValue}
    >
      <option disabled value="">
        {description}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Select>
    {extraInfo && <small className="text-muted">{extraInfo}</small>}
    {error && (
      <div className="text-danger">
        {error instanceof Array ? error[0] : error}
      </div>
    )}
  </Form.Group>
);

const optionShape = PropTypes.shape({
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
});

optionShape.defaultProps = {
  disabled: false,
};

FormSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(optionShape).isRequired,
  size: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  extraInfo: PropTypes.string,
  description: PropTypes.string,
};

FormSelect.defaultProps = {
  size: 'lg',
  required: false,
  error: undefined,
  disabled: false,
  defaultValue: '',
  extraInfo: undefined,
  description: 'Select an option',
};

export default FormSelect;
