import React, { useContext, useState } from 'react';
// Import context
import { WaypointsContext } from 'globalState/WaypointsContext';
// Import components
import Icon from 'components/shared/Icon/Icon';
// Import styles
import s from './WaypointList.module.scss';

const WaypointList = () => {
  const [waypoints, waypointsDispatch] = useContext(WaypointsContext);
  const [draggedItem, setDraggedItem] = useState();

  // Remove the waypoint by the id
  const removeWayPoint = id => {
    waypointsDispatch({ type: 'REMOVE_WAYPOINT', payload: id });
  };

  const onDragStart = (e, ind) => {
    setDraggedItem(waypoints[ind]);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  const onDragOver = (e, ind) => {
    e.preventDefault();
    const draggedOverItem = waypoints[ind];

    // if the item is dragged over itself, ignore
    if (draggedItem === draggedOverItem) {
      return;
    }

    // filter out the currently dragged item
    const items = waypoints.filter(item => item !== draggedItem);

    // add the dragged item after the dragged over item
    items.splice(ind, 0, draggedItem);

    waypointsDispatch({ type: 'REORDER_WAYPOINTS', payload: items });
  };

  const onDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <ul className={s.waypointList}>
      {waypoints.length > 0 &&
        waypoints.map((point, index) => (
          <li
            key={point.id}
            className={`${s.waypoint} ${draggedItem === point ? s.isDragging : ''}`}
            onDragOver={e => onDragOver(e, index)}
          >
            <div
              className={s.bars}
              draggable="true"
              onDragStart={e => onDragStart(e, index)}
              onDragEnd={e => onDragEnd(e)}
            >
              <Icon iconName="bars" className={s.icon} />
            </div>
            <span className={s.title}>Waypoint {point.id}</span>
            <button type="button" className={s.trash} onClick={() => removeWayPoint(point.id)}>
              <Icon iconName="trash" className={s.icon} />
            </button>
          </li>
        ))}
    </ul>
  );
};

export default WaypointList;
