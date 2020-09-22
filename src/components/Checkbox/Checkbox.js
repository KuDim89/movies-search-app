import React from 'react';

const Checkbox = (props) => {
  const inputType = props.type || 'checkbox';
  const name = `${inputType}-${Math.random().toFixed(3) * 1000}`;
  const classes = ['form-check-input'];
  let label;

  switch (props.label) {
    case 'policy':
      label = <>Creating an account means you’re okay with our
          <a href="#" className="text-muted"><b> Terms of Service</b></a>,
          <a href="#" className="text-muted"><b> Privacy Policy</b></a>, and our default
          <a href="#" className="text-muted"><b> Notification Settings</b></a>.</>
      break;
    default:
      label = props.label || ''
  }

  if(props.touched) {
    classes.push('is-invalid')
  }

  if(props.valid) {
    const controlIndex = classes.findIndex(className => className === 'is-invalid')
    classes[controlIndex] = 'is-valid'
  }

  return (
      <div className="form-check">
        <input
            type={inputType.toString().toLowerCase()}
            name={name.toString().toLowerCase()}
            className={classes.join(" ")}
            checked={props.checked}
            onChange={props.onChange}
        />
        <label className="form-check-label">
          {label}
        </label>
      </div>
  );
};

export default Checkbox;