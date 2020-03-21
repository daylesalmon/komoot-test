import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Import context
// Import components
import Icon from 'components/shared/Icon/Icon';
// Import styles
import s from './Waypoint.module.scss';

const position = { x: 0, y: 0 };

const Waypoint = ({ index, point, removeWayPoint }) => {
  const [wpState, setWpState] = useState({
    isDragging: false,
    origin: position,
    translation: position
  });

  const handleMouseDown = ({ clientX, clientY }) => {
    setWpState(state => ({
      ...state,
      isDragging: true,
      origin: { x: clientX, y: clientY }
    }));
  };

  useEffect(() => {
    const handleMouseUp = () => {
      setWpState(state => ({
        ...state,
        isDragging: false,
        translation: position
      }));
    };

    const handleMouseMove = ({ clientX, clientY }) => {
      const translation = { x: clientX - wpState.origin.x, y: clientY - wpState.origin.y };

      setWpState(state => ({
        ...state,
        translation
      }));
    };

    if (wpState.isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      console.log('here');
      setWpState(state => ({ ...state, translation: position }));
    }
    // return () => {
    //   cleanup;
    // };
  }, [wpState.isDragging, wpState.origin.x, wpState.origin.y]);

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      className={`${s.waypoint} ${wpState.isDragging ? s.beingDragged : ''}`}
      draggable="true"
      onMouseDown={handleMouseDown}
    >
      <Icon iconName="bars" className={s.icon} />
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
