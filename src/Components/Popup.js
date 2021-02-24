import React from 'react'

const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box">
        {props.content}
        <span className="close-icon" onClick={props.handleClose}>x</span>
      </div>
    </div>
  );
};

export default Popup