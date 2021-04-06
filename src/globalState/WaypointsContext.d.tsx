interface Waypoint {
  id: number;
  latlng: {
    lat: number;
    lng: number;
  };
}

type Waypoints = Waypoint[] | [];

export type { Waypoint, Waypoints };
