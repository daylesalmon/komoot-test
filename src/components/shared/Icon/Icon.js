import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ iconClass, iconPath }) => {
  return (
    <svg className={iconClass}>
      <use xlinkHref={iconPath} href={iconPath} />
    </svg>
  );
};

Icon.propTypes = {
  iconPath: PropTypes.string.isRequired,
  iconClass: PropTypes.string
};

Icon.defaultProps = {
  iconClass: null
};

export default Icon;
