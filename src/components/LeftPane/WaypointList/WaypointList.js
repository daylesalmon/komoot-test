import React, { useContext, useState } from 'react';
// Import context
import { WaypointsContext } from 'globalState/WaypointsContext';
// Import components
import Icon from 'components/shared/Icon/Icon';
// Import styles
import s from './WaypointList.module.scss';

const WaypointList = () => {
  const [waypoints, waypointsDispatch] = useContext(WaypointsContext); // Get the state of waypoints from WaypointsContext

  // State for managing dragable list below
  const [draggedItem, setDraggedItem] = useState();
  const [dragEntered, setDragEntered] = useState(false);

  // DRAG EVENTS FOR LIST REORDERING
  // Dragstart
  const onDragStart = (e, ind) => {
    setDraggedItem(waypoints[ind]);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  // Dragover
  const onDragOver = (e, ind) => {
    e.preventDefault(); // This allows the draggedover to be dropped on
    const draggedOverItem = waypoints[ind]; // Set dragged over to the index it is in state

    // if the item is dragged over itself, ignore
    if (draggedItem === draggedOverItem) {
      return;
    }

    const items = waypoints.filter(item => item !== draggedItem); // filter out the currently dragged item
    items.splice(ind, 0, draggedItem); // add the dragged item after the dragged over item

    waypointsDispatch({ type: 'REORDER_WAYPOINTS', payload: items }); // Update state with new order items
  };

  // DragEnter
  const onDragEnter = () => {
    setDragEntered(true); // UpdateState for dragEntered
  };

  // DragEnd
  const onDragEnd = () => {
    setDragEntered(false); // Reset dragEntered
    setDraggedItem(null); // Reset draggedItem on
  };

  // END DRAG EVENTS

  // Remove the waypoint by the id
  const removeWayPoint = id => {
    waypointsDispatch({ type: 'REMOVE_WAYPOINT', payload: id });
  };

  return (
    <ul className={s.waypointList}>
      {waypoints.length > 0 &&
        waypoints.map((point, index) => (
          <li
            key={point.id}
            className={`${s.waypoint} ${draggedItem === point ? s.isDragging : ''} ${
              dragEntered ? s.isDraggedIn : ''
            }`}
            onDragOver={e => onDragOver(e, index)}
            onDragEnter={() => onDragEnter()}
          >
            <div
              className={s.bars}
              draggable="true"
              onDragStart={e => onDragStart(e, index)}
              onDragEnd={e => onDragEnd(e)}
            >
              <Icon iconName="bars" className={s.icon} />
            </div>
            <span className={s.title}>
              Waypoint {index + 1} ({point.id})
            </span>
            <button type="button" className={s.trash} onClick={() => removeWayPoint(point.id)}>
              <Icon iconName="trash" className={s.icon} />
            </button>
          </li>
        ))}
    </ul>
  );
};

export default WaypointList;