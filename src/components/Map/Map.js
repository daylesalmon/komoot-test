import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import s from './Map.module.scss';

const Map = () => {
  const mapRef = useRef(null);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    mapRef.current = L.map('map', {
      center: [46.3605683, 13.8164072],
      zoom: 16,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    const onMapClick = e => {
      setPoints([...points, e.latlng]);

      console.log({ points });
      const icon = L.divIcon({
        className: s.circleIcon,
        iconSize: 30,
        html: points.length
      });

      L.marker(e.latlng, { icon }).addTo(mapRef.current);
    };

    mapRef.current.on('click', onMapClick);

    return () => {
      mapRef.current.off('click', onMapClick);
    };
  }, [points]);

  return <div id="map" className={s.map} ref={mapRef} title="Komoot map" />;
};

export default Map;
