import React, { useReducer, createContext } from 'react';

export const WaypointsContext = createContext(); // Create when context

export const WaypointsProvider = props => {
  const { children } = props || {};

  // Set intial state of when
  const initialState = [];

  // Set up a reducer so we can change state based on centralised logic here
  const reducer = (state, action) => {
    // Update the point to chosen
    switch (action.type) {
      case 'ADD_WAYPOINT': {
        const newArr = [...state, { id: action.payload.id, latlng: action.payload.latlng }];
        return newArr;
      }
      // Remove the waypoint by the id
      case 'REMOVE_WAYPOINT': {
        return state.filter(item => item.id !== action.payload);
      }

      // Default should return intial state if error
      default:
        return initialState;
    }
  };

  // Set up reducer using reducer logic and initialState by default
  const [pointState, pointDispatch] = useReducer(reducer, initialState);

  // Pass state and dispatch in context and make accessible to children it wraps
  return (
    <WaypointsContext.Provider value={[pointState, pointDispatch]}>
      {children}
    </WaypointsContext.Provider>
  );
};
