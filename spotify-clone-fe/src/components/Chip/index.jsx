import React, { memo } from 'react';

const Chip = memo(({ text, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`chip ${active ? 'active' : ''}`}
      role="checkbox"
      aria-checked="false"
      data-encore-id="chip"
      style={{
        marginBlockEnd: '0px',
        willChange: 'transform, opacity',
      }}
      data-roving-interactive="1"
    >
      <span>{text}</span>
    </button>
  );
});

Chip.displayName = 'Chip';

export default Chip;
