import React from 'react';

const Input = props => {
  const inputType = props.type || 'text';
  const name = props.label || `name-${Math.random().toFixed(3) * 1000}`;
  const label = props.label || ''
  const placeholder = props.placeholder || '';
  const classes = ['form-control'];

  if(props.touched) {
    classes.push('is-invalid')
  }
  if(props.valid) {
    const index = classes.findIndex(className => className === 'is-invalid')
    classes[index] = 'is-valid'
  }

  return (
      <div className="form-group">
        <label className="form-control-label text-muted">{label.toString().charAt(0).toUpperCase() + label.toString().slice(1)}</label>
        <input
            type={inputType.toString().toLowerCase()}
            name={name.toString().toLowerCase()}
            placeholder={placeholder.toString().charAt(0).toUpperCase() + placeholder.toString().slice(1)}
            className={classes.join(' ')}
            value={props.value}
            onChange={props.onChange}
        />
      </div>
  );
};

export default Input;