import { memo } from 'react';

const WhiteButton = memo((props) => {
  return (
    <button onClick={props.onClick} className={`white-button ${props.size}`}>
      <span>{props.title}</span>
    </button>
  );
});

WhiteButton.displayName = 'WhiteButton';

export default WhiteButton;
