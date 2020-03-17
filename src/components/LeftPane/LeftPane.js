import React from 'react';
import s from './LeftPane.module.scss';
import Waypoint from './Waypoint/Waypoint';

const LeftPane = () => {
  return (
    <div className={s.LeftPane}>
      <h1>Route Builder</h1>
      <hr />
      <Waypoint />
    </div>
  );
};

export default LeftPane;
