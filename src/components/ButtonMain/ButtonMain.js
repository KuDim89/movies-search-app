import React from 'react';

const ButtonMain = ({children, additionalClasses, ...rest}) => {

  const classes = ['btn-secondary', additionalClasses].filter(el => {
    return el != null;
  });

  return (
      <button
        className={classes.join(' ')}
        {...rest}
        >
        {children}
      </button>
  );
};

export default ButtonMain;