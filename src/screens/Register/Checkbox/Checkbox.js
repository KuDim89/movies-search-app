import React from 'react';

export default function Checkbox ({type, label, checked, touched, valid, onChange}) {
  const inputType = type || 'checkbox';
  const name = `${inputType}-${Math.random().toFixed(3) * 1000}`;
  const classes = ['form-check-input'];
  let inputLabel;

  switch (label) {
    case 'policy':
      inputLabel = <>Creating an account means you’re okay with our
          <a className="text-muted"><b> Terms of Service</b></a>,
          <a className="text-muted"><b> Privacy Policy</b></a>, and our default
          <a className="text-muted"><b> Notification Settings</b></a>.</>
      break;
    default:
      inputLabel = label || ''
  }

  if(touched) {
    classes.push('is-invalid')
  }

  if(valid) {
    const controlIndex = classes.findIndex(className => className === 'is-invalid')
    classes[controlIndex] = 'is-valid'
  }

  return (
      <div className="form-check">
        <input
            type={inputType.toString().toLowerCase()}
            name={name.toString().toLowerCase()}
            className={classes.join(" ")}
            checked={checked}
            onChange={onChange}
        />
        <label className="form-check-label">
          {inputLabel}
        </label>
      </div>
  );
};