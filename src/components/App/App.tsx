import React from 'react';
import LeftPane from 'components/LeftPane/LeftPane';
import Map from 'components/Map/Map';
import { WaypointsProvider } from 'globalState/WaypointsContext';

const App = (): JSX.Element => (
  <React.StrictMode>
    <WaypointsProvider>
      <LeftPane /> <Map />
    </WaypointsProvider>
  </React.StrictMode>
);

export default App;
