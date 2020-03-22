import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
// Import context
import { WaypointsContext } from 'globalState/WaypointsContext';
// Import components
import Icon from 'components/shared/Icon/Icon';
// Import styles
import s from './Waypoint.module.scss';

const Waypoint = ({ index, point, removeWayPoint }) => {
  const [draggedItem, setDraggedItem] = useState();
  const [waypoints, waypointsDispatch] = useContext(WaypointsContext);

  const onDragStart = (e, ind) => {
    setDraggedItem(waypoints[ind]);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  const onDragOver = ind => {
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

  const onDragEnd = e => {
    console.log({ e });
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li className={`${s.waypoint}`} onDragOver={() => onDragOver(index)}>
      <div
        className={s.bars}
        draggable="true"
        onDragStart={(e, ind) => onDragStart(e, ind)}
        onDragEnd={e => onDragEnd(e)}
      >
        <Icon iconName="bars" className={s.icon} />
      </div>
      <span className={s.title}>Waypoint {index + 1}</span>
      <button type="button" className={s.trash} onClick={() => removeWayPoint(point.id)}>
        <Icon iconName="trash" className={s.icon} />
      </button>
    </li>
  );
};

Waypoint.propTypes = {
  index: PropTypes.number.isRequired,
  point: PropTypes.objectOf(PropTypes.any).isRequired,
  removeWayPoint: PropTypes.func.isRequired
};

export default Waypoint;
