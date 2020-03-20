import React, { useContext } from 'react';
// Import context
import { WaypointsContext } from 'globalState/WaypointsContext';

import s from './LeftPane.module.scss';
import Waypoint from './Waypoint/Waypoint';

const LeftPane = () => {
  const [waypoints, waypointsDispatch] = useContext(WaypointsContext);

  const removeWayPoint = id => {
    waypointsDispatch({ type: 'REMOVE_WAYPOINT', payload: id });
  };

  return (
    <div className={s.leftPane}>
      <h1 className={s.title}>Route Builder</h1>
      <hr className={s.hr} />

      <ul className={s.waypointList}>
        {waypoints.map((point, index) => (
          <Waypoint key={point.id} point={point} index={index} removeWayPoint={removeWayPoint} />
        ))}
      </ul>
    </div>
  );
};

export default LeftPane;
