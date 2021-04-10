import React, { useContext, useState } from 'react';
// Import context
import { WaypointsContext } from 'globalState/WaypointsContext';
// Import components
import Icon from 'components/shared/Icon/Icon';
// Types
import { Waypoint } from 'globalState/WaypointsContext.d';
// Import styles
import s from './WaypointList.module.scss';

// type ParentNode = HTMLElement;

interface OnDragEvent<T = HTMLElement> extends React.DragEvent<T> {
  parentNode?: T;
  target: EventTarget & { parentNode?: T };
}

const WaypointList = (): JSX.Element => {
  const [waypoints, waypointsDispatch] = useContext(WaypointsContext); // Get the state of waypoints from WaypointsContext

  // State for managing dragable list below
  const [draggedItem, setDraggedItem] = useState<null | Waypoint>(null);
  const [dragEntered, setDragEntered] = useState(false);

  // DRAG EVENTS FOR LIST REORDERING
  // Dragstart
  const onDragStart = (e: OnDragEvent<HTMLElement>, ind: number) => {
    setDraggedItem(waypoints[ind]);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData(
      'text/html',
      typeof e.parentNode !== 'undefined' ? e.parentNode.toString() : ''
    );
    if (e.target.parentNode) e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  // Dragover
  const onDragOver = (e: OnDragEvent<HTMLElement | HTMLLIElement>, ind: number) => {
    e.preventDefault(); // This allows the draggedover to be dropped on
    const draggedOverItem = waypoints[ind]; // Set dragged over to the index it is in state

    // if the item is dragged over itself, ignore
    if (draggedItem === draggedOverItem) {
      return;
    }

    const items = waypoints.filter((item: Waypoint) => item !== draggedItem); // filter out the currently dragged item
    if (draggedItem) items.splice(ind, 0, draggedItem); // add the dragged item after the dragged over item

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
  const removeWayPoint = (id: number) => {
    waypointsDispatch({ type: 'REMOVE_WAYPOINT', payload: id });
  };

  return (
    <ul className={s.waypointList}>
      {waypoints.length > 0 &&
        waypoints.map((point: Waypoint, index: number) => (
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
              onDragEnd={() => onDragEnd()}
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
