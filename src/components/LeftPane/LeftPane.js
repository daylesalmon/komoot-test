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
    // Set up xml for gpx file (loop through each latlng and put in as a trkpnt)
    const gpxData = `<?xml version="1.0" encoding="UTF-8"?>
    <gpx creator="Komoot Route Builder" version="1.0">
      <trk>
        <name>Example gpx route</name>
        <trkseg>
          ${waypoints
            .map(
              (waypoint, index) =>
                `<trkpt lat="${waypoint.latlng.lat}" lon="${waypoint.latlng.lng}"><name>${index +
                  1}</name></trkpt>`
            )
            .join('')}
        </trkseg>
      </trk>
    </gpx>`; // Replace all spaces with nothing (whitespace trim)

    console.log({ gpxData });

    setGpxFile(`data:text/xml;charset=utf-8,${encodeURIComponent(gpxData)}`); // Update state of our gpx file which is used by button below
  }, [waypoints]);

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
      <a href={gpxFile} download="my-komoot-route.gpx" className={s.downloadRouteBtn}>
        Download your route
      </a>
    </div>
  );
};

export default LeftPane;
