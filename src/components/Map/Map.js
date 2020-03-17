import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import s from './Map.module.scss';

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    mapRef.current = L.map('map', {
      center: [49.8419, 24.0315],
      zoom: 16,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });
  }, []);

  return <div id="map" className={s.map} ref={mapRef} title="Komoot map" />;
};

export default Map;
