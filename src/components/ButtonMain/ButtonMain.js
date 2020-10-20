import React from 'react';

export default function ButtonMain ({children, additionalClasses, ...rest}) {

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