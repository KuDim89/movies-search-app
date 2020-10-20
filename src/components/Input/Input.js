import React from 'react';
import styles from './Input.module.scss'

export default function Input({type, value, valid, touched, label, placeholder, onChange, autoComplete}) {

  const inputType = type || 'text';
  const inputName = label || `name-${Math.random().toFixed(3) * 1000}`;
  const inputLabel = label || ''
  const inputPlaceholder = placeholder || '';
  const classes = ['form-control', `${styles.width}`];
  const inputAutoComplete = autoComplete || '';

  if (touched) {
    classes.push('is-invalid')
  }

  if (valid) {
    const controlIndex = classes.findIndex(className => className === 'is-invalid')
    classes[controlIndex] = 'is-valid'
  }
  return (
      <div className={`form-group ${styles.width}`}>
        {inputLabel
            ? <label
                className="form-control-label text-muted"
            >
              {inputLabel.toString().charAt(0).toUpperCase() + inputLabel.toString().slice(1)}
            </label>
            : null
        }
        <input
            type={inputType.toString().toLowerCase()}
            name={inputName.toString().toLowerCase()}
            autoComplete={inputAutoComplete.toString().toLowerCase()}
            placeholder={inputPlaceholder.toString().charAt(0).toUpperCase() + inputPlaceholder.toString().slice(1)}
            className={classes.join(' ')}
            value={value}
            onChange={onChange}
        />
      </div>
  );
};