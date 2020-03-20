import React from 'react';
import PropTypes from 'prop-types';
// Import context
// Import components
import Icon from 'components/shared/Icon/Icon';
// Import styles
import s from './Waypoint.module.scss';

const Waypoint = ({ index, point, removeWayPoint }) => {
  return (
    <li className={s.waypoint}>
      <Icon iconName="bars" className={s.icon} />
      <span className={s.title}>Waypoint {index + 1}</span>
      <button type="button" className={s.trash} onClick={() => removeWayPoint(point.id)}>
        <Icon iconName="trash" className={s.icon} />
      </button>
    </li>
  );
};

Waypoint.propTypes = {
  index: PropTypes.number.isRequired,
  point: PropTypes.objectOf(PropTypes.any).isRequired,
  removeWayPoint: PropTypes.func.isRequired
};

export default Waypoint;
