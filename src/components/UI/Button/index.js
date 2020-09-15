import React from 'react';

const Button = props => {
  const classes = [];
  switch (props.type) {
    case 'secondary-block':
      classes.push('btn-secondary btn-block', props.classes)
      break;
    case 'secondary-inline':
      classes.push('btn-secondary', props.classes)
      break;
    case 'transparent':
      classes.push('btn btn-outline-secondary', props.classes)
      break;
    default:
      classes.push("btn-secondary btn-color ml-2 py-2 px-3")
  }

  return (
        <button
            className={classes.join(' ')}
            onClick={props.onClick}
            disabled={props.disabled}
        >
        {props.children}
        </button>
  );
};

export default Button;