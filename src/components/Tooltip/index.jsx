import { Tooltip as TooltipAntd } from 'antd';

export const Tooltip = (props) => {
  return <TooltipAntd placement='top' {...props} color='#242424' arrow={false} />;
};

Tooltip.displayName = 'Tooltip';
