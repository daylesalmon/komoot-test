import React, { useContext } from 'react';
// Import context
import { WaypointsContext } from 'globalState/WaypointsContext';
// Import components
import WaypointList from './WaypointList/WaypointList';
// Import styles
import s from './LeftPane.module.scss';

const LeftPane = () => {
  const [waypoints] = useContext(WaypointsContext);

  const onClick = () => {
    // Set up xml for gpx file (loop through each latlng and put in as a trkpnt / join '\n' so it adds new line rather than comma)
    const gpxData = `<?xml version="1.0" encoding="UTF-8"?>
    <gpx creator="Komoot Route Builder" version="1.0">
      <trk>
        <name>Example gpx route</name>
        <trkseg>
          ${waypoints
            .map(
              (waypoint, index) =>
                `<trkpt lat="${waypoint.latlng.lat}" lon="${waypoint.latlng.lng}"><name>${
                  index + 1
                }</name></trkpt>`
            )
            .join('\n')}
        </trkseg>
      </trk>
    </gpx>`;

    // Create invisible elemnent to generate and download file
    const element = document.createElement('a'); // Create a element
    element.setAttribute('href', `data:text/xml;charset=utf-8,${encodeURIComponent(gpxData)}`); // set href to our gpx file/data
    element.setAttribute('download', 'my-komoot-route.gpx'); // Set download name
    element.style.display = 'none'; // element should be invisible to user
    document.body.appendChild(element); // Append it to body
    element.click(); // Simulate a click event to generate the download
    document.body.removeChild(element); // Remove the created element when done
  };

  return (
    <div className={s.leftPane}>
      <h1 className={s.title}>Route Builder</h1>
      <hr className={s.hr} />
      <WaypointList />
      {waypoints.length > 0 && (
        <button type="button" className={s.downloadRouteBtn} onClick={() => onClick()}>
          Download your route
        </button>
      )}
    </div>
  );
};

export default LeftPane;
