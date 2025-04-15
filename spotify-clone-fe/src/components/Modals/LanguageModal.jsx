import React, { memo, useState } from 'react';
import { Modal } from 'antd';

// Constants
import { AVAILABLE_LANGUAGES } from '../../constants/languages';

const LanguageModal = memo(() => {
  // MOCK trạng thái modal mở / đóng
  const [open, setOpen] = useState(false); // bạn có thể đổi thành true để test

  const onClose = (value) => {
    console.log('Selected language:', value || 'No change');
    setOpen(false); // Đóng modal
  };

  return (
    <Modal
      centered
      width={900}
      open={open}
      footer={null}
      destroyOnClose
      className="language-modal"
      onCancel={() => onClose()}
      title={
        <h1
          style={{
            fontWeight: 700,
            fontSize: '1.5rem',
            marginBlockStart: 0,
            paddingBlockEnd: 8,
            color: 'white',
          }}
        >
          Choose a language
        </h1>
      }
    >
      <div className="language-grid">
        {AVAILABLE_LANGUAGES.map((language) => (
          <button key={language.value} onClick={() => onClose(language.value)}>
            <span className="title">{language.label}</span>
            <span className="subtitle">{language.englishLabel}</span>
          </button>
        ))}
      </div>
    </Modal>
  );
});

LanguageModal.displayName = 'LanguageModal';

export default LanguageModal;
