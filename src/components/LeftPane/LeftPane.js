import React from 'react';
import s from './LeftPane.module.scss';
import Waypoint from './Waypoint/Waypoint';

const LeftPane = () => {
  return (
    <div className={s.leftPane}>
      <h1 className={s.title}>Route Builder</h1>
      <hr className={s.hr} />

      <ul className={s.waypointList}>
        <Waypoint />
      </ul>
    </div>
  );
};

export default LeftPane;
