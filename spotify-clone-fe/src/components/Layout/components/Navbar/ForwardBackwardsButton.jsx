import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '../../../Tooltip';

const ForwardBackwardsButton = ({ flip }) => {
  const navigate = useNavigate();
  const [t] = useTranslation(['navigation']);

  const navigateBack = () => navigate(-1);
  const navigateForward = () => navigate(1);

  return (
    <Tooltip title={flip ? t('Go back') : t('Go forward')}>
      <button
        className="bg-black p-2 rounded-full h-4/6 aspect-square h-8 mobile-visible"
        onClick={flip ? navigateBack : navigateForward}
      >
        <img
          alt={flip ? 'Backwards' : 'Forward'}
          src={`/images/forward.svg`}
          className={`w-full h-full ${flip ? 'rotate-180' : ''}`}
        />
      </button>
    </Tooltip>
  );
};

export default ForwardBackwardsButton;
