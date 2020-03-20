import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import s from './Map.module.scss';

const Map = ({ points, setPoints }) => {
  const mapRef = useRef(null);

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
    // Set onclick Event
    const onMapClick = e => {
      setPoints([...points, e.latlng]);
      // Set up a divIcon
      const icon = L.divIcon({
        className: s.circleIcon,
        iconSize: 30,
        html: points.length + 1
      });

      L.marker(e.latlng, { icon }).addTo(mapRef.current); // Create marker at clicked point, and add divIcon created above
    };

    mapRef.current.on('click', onMapClick); // Event handler for map click

    return () => {
      mapRef.current.off('click', onMapClick); // Remove map click event handler
    };
  }, [points, setPoints]);

  // useEffect for drawing polyLine
  useEffect(() => {
    // Add polyline based on the coords in state
    L.polyline(points, { color: '#0d8ce7', weight: 10 }).addTo(mapRef.current);
  }, [points]);

  return <div id="map" className={s.map} ref={mapRef} title="Komoot map" />;
};

Map.propTypes = {
  points: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPoints: PropTypes.func.isRequired
};

export default Map;
