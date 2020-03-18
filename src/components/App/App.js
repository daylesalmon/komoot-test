import React, { useState } from 'react';
import LeftPane from 'components/LeftPane/LeftPane';
import Map from 'components/Map/Map';

function App() {
  const [points, setPoints] = useState([]);

  return (
    <>
      <LeftPane /> <Map points={points} setPoints={setPoints} />
    </>
  );
}

export default App;
