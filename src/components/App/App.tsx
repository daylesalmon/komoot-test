import React from 'react';
import LeftPane from 'components/LeftPane/LeftPane';
import Map from 'components/Map/Map';
import { WaypointsProvider } from 'globalState/WaypointsContext';

function App() {
  return (
    <React.StrictMode>
      <WaypointsProvider>
        <LeftPane /> <Map />
      </WaypointsProvider>
    </React.StrictMode>
  );
}

export default App;
