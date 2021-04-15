import { useEffect, useState, useContext } from 'react';
import L from 'leaflet';
// Import context
import { WaypointsContext } from 'globalState/WaypointsContext';
// Import styles
import { Waypoint } from 'globalState/WaypointsContext.d';
import s from './Map.module.scss';

const Map = (): JSX.Element => {
  const [mapState, setMapState] = useState<L.Map | null>(null);
  const [waypoints, waypointsDispatch] = useContext(WaypointsContext); // Get the state of waypoints from WaypointsContext

  // useEffect to set map up
  useEffect(() => {
    let map: typeof mapState;

    if (!mapState) {
      map = L.map('map', {
        center: [46.3605683, 13.8164072], // Center to Triglav
        zoom: 16,
        // Set layer to OSM (free)
        layers: [
          L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          }),
        ],
      });

      setMapState(map);
    }

    // remove map if 'unmount'
    return () => {
      if (mapState) {
        mapState.remove();
      }
    };
  }, [mapState]);

  // useLayoutEffect for click event/markers
  useEffect(() => {
    // Set onclick Event
    const onMapClick = (e: L.LeafletMouseEvent) => {
      const id = e.originalEvent.timeStamp; // Give each item a unique id based on click timestamp
      // Call waypoints dispatcher to add to state
      waypointsDispatch({
        type: 'ADD_WAYPOINT',
        payload: { id, latlng: e.latlng },
      });
    };

    if (mapState) mapState.on('click', onMapClick); // Event handler for map click

    return () => {
      if (mapState) mapState.off('click', onMapClick); // Remove map click event handler
    };
  }, [mapState, waypointsDispatch]);

  // useEffect for syncing state with map
  useEffect(() => {
    let layerGroup: L.LayerGroup; // placeholder for layers

    // Set up a divIcon
    const icon = (html: string) =>
      L.divIcon({
        className: s.circleIcon,
        iconSize: [30, 30],
        html, // This will be set from the index below
      });

    // If there are any waypoints in state
    // Loop through each and create a marker, the markers html will be the index + 1
    const waypointsArr = waypoints.map((wp: Waypoint, index: number) =>
      L.marker(wp.latlng, { icon: icon((index + 1).toString()) })
    );
    // Create marker at clicked point, and add divIcon created above
    if (mapState) layerGroup = L.layerGroup(waypointsArr).addTo(mapState);

    return () => {
      if (layerGroup && mapState) layerGroup.clearLayers(); // Clear layers on unmount/update
    };
  }, [mapState, waypoints]);

  // useEffect for drawing polyLine
  useEffect(() => {
    let polyline: L.Polyline;

    if (mapState) {
      // Add polyline based on the coords in state
      polyline = L.polyline(
        waypoints.map((point: Waypoint) => point.latlng),
        { color: '#0d8ce7', weight: 10 }
      ).addTo(mapState);
    }

    return () => {
      if (polyline && mapState) polyline.remove();
    };
  }, [mapState, waypoints]);

  return <div id="map" className={s.map} title="Komoot map" />;
};

export default Map;
