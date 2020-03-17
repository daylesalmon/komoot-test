import React from 'react';
import Icon from 'components/shared/Icon/Icon';
import s from './Waypoint.module.scss';

const Waypoint = () => {
  return (
    <li className={s.waypoint}>
      <Icon iconName="bars" className={s.icon} />
      <span className={s.title}>Waypoint</span>
      <button type="button" className={s.trash}>
        <Icon iconName="trash" className={s.icon} />
      </button>
    </li>
  );
};

export default Waypoint;
