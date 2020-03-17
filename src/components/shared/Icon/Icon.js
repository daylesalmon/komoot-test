import React from 'react';
import PropTypes from 'prop-types';
import svgSprite from 'assets/icons/icons-sprite.svg';

const Icon = ({ className, iconName }) => {
  return (
    <svg className={className}>
      <use xlinkHref={`${svgSprite}#${iconName}`} href={`${svgSprite}#${iconName}`} />
    </svg>
  );
};

Icon.propTypes = {
  iconName: PropTypes.string.isRequired,
  className: PropTypes.string
};

Icon.defaultProps = {
  className: null
};

export default Icon;
