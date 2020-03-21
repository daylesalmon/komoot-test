import React, { useEffect, useRef, useContext } from 'react';
import L from 'leaflet';
// Import context
import { WaypointsContext } from 'globalState/WaypointsContext';
// Import styles
import s from './Map.module.scss';

const Map = () => {
  const mapRef = useRef(null);
  const [waypoints, waypointsDispatch] = useContext(WaypointsContext);

  // useEffect to set map up
  useEffect(() => {
    mapRef.current = L.map('map', {
      center: [46.3605683, 13.8164072], // Center to Triglav
      zoom: 16,
      // Set layer to OSM (free)
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
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
    const id = waypoints.length + 1;

    // Set onclick Event
    const onMapClick = e => {
      waypointsDispatch({
        type: 'ADD_WAYPOINT',
        payload: { id, latlng: e.latlng }
      });
    };

    mapRef.current.on('click', onMapClick); // Event handler for map click

    return () => {
      mapRef.current.off('click', onMapClick); // Remove map click event handler
    };
  }, [waypoints, waypointsDispatch]);

  useEffect(() => {
    // Set up a divIcon
    const icon = id => {
      return L.divIcon({
        className: s.circleIcon,
        iconSize: 30,
        html: id
      });
    };

    if (waypoints) {
      const waypointsArr = waypoints.map(wp =>
        L.marker(wp.latlng, { icon: icon(wp.id) }).addTo(mapRef.current)
      );
      // Create marker at clicked point, and add divIcon created above
      L.layerGroup(waypointsArr);
    }
    // return () => {
    //   cleanup;
    // };
  }, [waypoints, waypoints.length]);

  // useEffect for drawing polyLine
  useEffect(() => {
    // Add polyline based on the coords in state
    L.polyline(
      waypoints.map(point => point.latlng),
      { color: '#0d8ce7', weight: 10 }
    ).addTo(mapRef.current);
  }, [waypoints]);

  return <div id="map" className={s.map} ref={mapRef} title="Komoot map" />;
};

export default Map;
