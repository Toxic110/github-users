import { Button } from '@ui';
import { useCallback } from 'react';
import { createPortal } from 'react-dom';

/** Интерфейс модального окна. */
interface IModal {
  /** Признак отображения модального окна. */
  isOpen: boolean;
  /** Метод закрытия модального окна. */
  onClose(val: boolean): void;
  /** Сообщение модального окна. */
  message: string;
  /** Заголовок модального окна. */
  title: string;
}

export const Modal: React.FC<IModal> = ({ isOpen, onClose, message, title }) => {
  if (!isOpen) {
    return null;
  }

  const handleClose = useCallback(() => onClose(false), [onClose]);

  const modalMarkup = (
    <div className="ui-modal">
      <div className="ui-modal__content">
        <div className="ui-modal__title">{title}</div>
        <div className="ui-modal__body">{message}</div>
        <div className="ui-modal__footer">
          <Button variabel="primary" onClick={handleClose}>
            Закрыть
          </Button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalMarkup, document.body);
};
