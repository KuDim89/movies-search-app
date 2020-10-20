import React from 'react';

export default function ButtonColored ({children, additionalClasses, ...rest}) {

  const classes = ['btn', additionalClasses].filter(function (el) {
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