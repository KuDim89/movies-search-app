import React from 'react';
import styles from './Input.module.scss'

const Input = props => {

  const inputType = props.type || 'text';
  const name = props.label || `name-${Math.random().toFixed(3) * 1000}`;
  const label = props.label || ''
  const placeholder = props.placeholder || '';
  const classes = ['form-control', `${styles.width}`];
  const autoComplete = props.autoComplete || '';

  if (props.touched) {
    classes.push('is-invalid')
  }

  if (props.valid) {
    const controlIndex = classes.findIndex(className => className === 'is-invalid')
    classes[controlIndex] = 'is-valid'
  }
  return (
      <div className={`form-group ${styles.width}`}>
        {label
            ? <label
                className="form-control-label text-muted"
            >
              {label.toString().charAt(0).toUpperCase() + label.toString().slice(1)}
            </label>
            : null
        }
        <input
            type={inputType.toString().toLowerCase()}
            name={name.toString().toLowerCase()}
            autoComplete={autoComplete.toString().toLowerCase()}
            placeholder={placeholder.toString().charAt(0).toUpperCase() + placeholder.toString().slice(1)}
            className={classes.join(' ')}
            value={props.value}
            onChange={props.onChange}
        />
      </div>
  );
};

export default Input;