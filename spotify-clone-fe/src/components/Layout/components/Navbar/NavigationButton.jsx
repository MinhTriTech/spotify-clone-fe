import React from 'react';
import { Tooltip } from '../../../Tooltip';

const NavigationButton = ({ onClick, text, icon }) => {
  return (
    <Tooltip placement="bottom" title={text}>
      <button className="navigation-button" onClick={onClick}>
        {icon}
      </button>
    </Tooltip>
  );
};

export default NavigationButton;
