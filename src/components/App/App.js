import React, { useState } from 'react';
import LeftPane from 'components/LeftPane/LeftPane';
import Map from 'components/Map/Map';
import { WaypointsProvider } from 'components/globalState/WaypointsContext';

function App() {
  const [points, setPoints] = useState([]);

  return (
    <React.StrictMode>
      <WaypointsProvider>
        <LeftPane points={points} /> <Map points={points} setPoints={setPoints} />
      </WaypointsProvider>
    </React.StrictMode>
  );
}

export default App;
