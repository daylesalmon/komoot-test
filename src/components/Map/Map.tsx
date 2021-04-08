import React, { useEffect, useRef, useContext } from 'react';
import L from 'leaflet';
// Import context
import { WaypointsContext } from 'globalState/WaypointsContext';
// Import styles
import s from './Map.module.scss';
import { Waypoint } from 'globalState/WaypointsContext.d';

const Map = () => {
  const mapRef = useRef<L.Map | null>(null);
  const [waypoints, waypointsDispatch] = useContext(WaypointsContext); // Get the state of waypoints from WaypointsContext

  // useEffect to set map up
  useEffect(() => {
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
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  // useEffect for click event/markers
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

    if (mapRef.current) mapRef.current.on('click', onMapClick); // Event handler for map click

    return () => {
      if (mapRef.current) mapRef.current.off('click', onMapClick); // Remove map click event handler
    };
  }, [waypoints, waypointsDispatch]);

  // UseEffect for syncing state with map
  useEffect(() => {
    // Set up a divIcon
    const icon = (html: string) =>
      L.divIcon({
        className: s.circleIcon,
        iconSize: [30, 30],
        html, // This will be set from the index below
      });

    let layerGroup: L.LayerGroup; // placeholder for layers

    // If there are any waypoints in state
    if (waypoints && mapRef.current) {
      // Loop through each and create a marker, the markers html will be the index + 1
      const waypointsArr = waypoints.map((wp: Waypoint, index: number) =>
        L.marker(wp.latlng, { icon: icon((index + 1).toString()) }).addTo(mapRef.current)
      );
      // Create marker at clicked point, and add divIcon created above
      layerGroup = L.layerGroup(waypointsArr).addTo(mapRef.current);
    }

    return () => {
      layerGroup.clearLayers(); // Clear layers on unmount/update
    };
  }, [waypoints, waypoints.length]);

  // useEffect for drawing polyLine
  useEffect(() => {
    // Add polyline based on the coords in state
    const polyline = L.polyline(
      waypoints.map(point => point.latlng),
      { color: '#0d8ce7', weight: 10 }
    ).addTo(mapRef.current);

    return () => {
      polyline.remove();
    };
  }, [mapRef, waypoints]);

  return <div id="map" className={s.map} ref={mapRef} title="Komoot map" />;
};

export default Map;
