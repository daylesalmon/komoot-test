import { useLayoutEffect, useRef, useContext } from 'react';
import L from 'leaflet';
// Import context
import { WaypointsContext } from 'globalState/WaypointsContext';
// Import styles
import { Waypoint } from 'globalState/WaypointsContext.d';
import s from './Map.module.scss';

const Map = (): JSX.Element => {
  const mapRef = useRef<L.Map>();
  const [waypoints, waypointsDispatch] = useContext(WaypointsContext); // Get the state of waypoints from WaypointsContext

  // useLayoutEffect to set map up
  useLayoutEffect(() => {
    mapRef.current = L.map('map', {
      center: [46.3605683, 13.8164072], // Center to Triglav
      zoom: 16,
      // Set layer to OSM (free)
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    });

    // remove map if 'unmount'
    return () => {
      if (mapRef.current) mapRef.current.remove();
    };
  }, [mapRef]);

  // useLayoutEffect for click event/markers
  useLayoutEffect(() => {
    // Set onclick Event
    const onMapClick = (e: L.LeafletMouseEvent) => {
      const id = e.originalEvent.timeStamp; // Give each item a unique id based on click timestamp
      // Call waypoints dispatcher to add to state
      waypointsDispatch({
        type: 'ADD_WAYPOINT',
        payload: { id, latlng: e.latlng },
      });
    };

    if (mapRef.current) mapRef.current.on('click', onMapClick); // Event handler for map click

    return () => {
      if (mapRef.current) mapRef.current.off('click', onMapClick); // Remove map click event handler
    };
  }, [waypoints, waypointsDispatch]);

  // useLayoutEffect for syncing state with map
  useLayoutEffect(() => {
    let layerGroup: L.LayerGroup; // placeholder for layers

    if (waypoints && mapRef.current) {
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
      layerGroup = L.layerGroup(waypointsArr).addTo(mapRef.current);
    }

    return () => {
      layerGroup.clearLayers(); // Clear layers on unmount/update
    };
  }, [waypoints, waypoints.length]);

  // useLayoutEffect for drawing polyLine
  useLayoutEffect(() => {
    let polyline: L.Polyline;

    if (mapRef.current) {
      // Add polyline based on the coords in state
      polyline = L.polyline(
        waypoints.map((point: Waypoint) => point.latlng),
        { color: '#0d8ce7', weight: 10 }
      ).addTo(mapRef.current);
    }

    return () => {
      polyline.remove();
    };
  }, [mapRef, waypoints]);

  return <div id="map" className={s.map} title="Komoot map" />;
};

export default Map;
