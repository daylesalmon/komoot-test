import React from 'react';
import PropTypes from 'prop-types';

import s from './LeftPane.module.scss';
import Waypoint from './Waypoint/Waypoint';

const LeftPane = ({ points }) => {
  return (
    <div className={s.leftPane}>
      <h1 className={s.title}>Route Builder</h1>
      <hr className={s.hr} />

      <ul className={s.waypointList}>
        {points.map((point, index) => (
          <Waypoint point={point} index={index} key={point.id} />
        ))}
      </ul>
    </div>
  );
};

LeftPane.propTypes = {
  points: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default LeftPane;
