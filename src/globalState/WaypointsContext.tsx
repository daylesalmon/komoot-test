import React, { useReducer, createContext } from 'react';

interface Waypoint {
  id: number;
  latlng: {
    lat: number;
    lng: number;
  };
}
type Actions =
  | {
      payload: Waypoint;
      type: 'ADD_WAYPOINT';
    }
  | { payload: number; type: 'REMOVE_WAYPOINT' }
  | {
      payload: Waypoint[];
      type: 'REORDER_WAYPOINTS';
    };

type WaypointsContextState = {
  state: [] | Waypoint[];
  dispatch: React.Dispatch<Actions>;
} | null;

const intialContextState: WaypointsContextState = {
  state: [],
  dispatch: () => null,
};

export const WaypointsContext = createContext<WaypointsContextState>(intialContextState); // Create when context

// interface Props {
//   children: ReactChildren
// }

type State = Waypoint[];

export const WaypointsProvider: React.FC = ({ children }) => {
  // Set intial state of when
  const initialState: Waypoint[] | [] = [];

  // Set up a reducer so we can change state based on centralised logic here
  const reducer = (state: State, action: Actions) => {
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

      case 'REORDER_WAYPOINTS': {
        return action.payload;
      }

      // Default should return intial state if error
      default:
        return initialState;
    }
  };

  // Set up reducer using reducer logic and initialState by default
  const [state, dispatch] = useReducer(reducer, initialState);

  // Pass state and dispatch in context and make accessible to children it wraps
  return (
    <>
      <WaypointsContext.Provider value={[state, dispatch]}>{children}</WaypointsContext.Provider>
    </>
  );
};
