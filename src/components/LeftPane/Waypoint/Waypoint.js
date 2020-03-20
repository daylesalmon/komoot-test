import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'components/shared/Icon/Icon';
import s from './Waypoint.module.scss';

const Waypoint = ({ index }) => {
  const removeWayPoint = e => {
    console.log({ e });
  };

  return (
    <li className={s.waypoint}>
      <Icon iconName="bars" className={s.icon} />
      <span className={s.title}>Waypoint {index + 1}</span>
      <button type="button" className={s.trash} onClick={removeWayPoint()}>
        <Icon iconName="trash" className={s.icon} />
      </button>
    </li>
  );
};

Waypoint.propTypes = {
  index: PropTypes.number.isRequired
};

export default Waypoint;
