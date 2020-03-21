import React, { useContext, useState, useEffect } from 'react';
// Import context
import { WaypointsContext } from 'globalState/WaypointsContext';

import s from './LeftPane.module.scss';
import Waypoint from './Waypoint/Waypoint';

const LeftPane = () => {
  const [waypoints, waypointsDispatch] = useContext(WaypointsContext);
  const [gpxFile, setGpxFile] = useState();

  // Remove the waypoint by the id
  const removeWayPoint = id => {
    waypointsDispatch({ type: 'REMOVE_WAYPOINT', payload: id });
  };

  useEffect(() => {
    const gpxData = '<gpx creator="" version="1.0"></gpx>';
    setGpxFile(`data:text/xml;charset=utf-8,${encodeURIComponent(gpxData)}`);
  }, []);

  console.log({ gpxFile });

  return (
    <div className={s.leftPane}>
      <h1 className={s.title}>Route Builder</h1>
      <hr className={s.hr} />
      <ul className={s.waypointList}>
        {waypoints.map((point, index) => (
          <Waypoint key={point.id} point={point} index={index} removeWayPoint={removeWayPoint} />
        ))}
      </ul>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a href={gpxFile} download="MyTracks.gpx">
        Export to file
      </a>
    </div>
  );
};

export default LeftPane;
