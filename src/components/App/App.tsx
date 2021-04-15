import React, { useState } from 'react';
import LeftPane from 'components/LeftPane/LeftPane';
import Map from 'components/Map/Map';
import { WaypointsProvider } from 'globalState/WaypointsContext';

const App = (): JSX.Element => {
  const [showMap, setShowMap] = useState(true);

  const handleClick = () => {
    setShowMap(!showMap);
  };

  return (
    <React.StrictMode>
      <WaypointsProvider>
        <button type="button" onClick={handleClick}>
          click me to toggle
        </button>
        {showMap && (
          <>
            <LeftPane /> <Map />
          </>
        )}
      </WaypointsProvider>
    </React.StrictMode>
  );
};
export default App;
