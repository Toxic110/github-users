import './styles.scss';

import classNames from 'classnames';
import { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react';

/** Позиция дропдауна. */
type MenuPosition = 'bottom' | 'top';

/** Опции для селекта. */
interface SelectOption {
  /** Выводимое значение для пользователя. */
  label: string;
  /** Значение опции. */
  value: number | string;
}

/** Пропсы селекта. */
interface ISelect {
  /** Имя. */
  name?: string;
  /** Значение селекта. */
  value: string | number;
  /** Функция изменения значения. */
  onChange(value: string): void;
  /** Именование селекта. */
  label?: string;
  /** Массив опций. */
  options: SelectOption[];
  /** Признак приминения других стилей. */
  extraSmall?: boolean;
  /** Позиция списка. */
  menuPosition?: MenuPosition;
}

export const Select: FC<ISelect> = ({
  name,
  label,
  options,
  extraSmall,
  menuPosition = 'bottom',
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    },
    [ref.current],
  );

  const handleChangeValue = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  const handleSetVisible = () => setIsOpen(!isOpen);

  const selectedLabel = options.filter((opt) => String(opt.value) === String(value))[0]
    ?.label;

  return (
    <div
      ref={ref}
      className={classNames(
        'ui-select',
        isOpen && 'ui-select__open',
        extraSmall && 'ui-select--small',
      )}
    >
      <div
        className={classNames('ui-label', extraSmall && 'ui-label--small')}
        onClick={handleSetVisible}
      >
        {label}
      </div>
      <div
        className={classNames(
          'ui-input ui-select__inner',
          extraSmall && 'ui-input--small',
        )}
        onClick={handleSetVisible}
      >
        {selectedLabel}
      </div>
      <input
        name={name}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        hidden
        data-testid="ui-select-value"
      />
      {isOpen && (
        <div
          className={classNames(
            'ui-select__menu-wrapper',
            `ui-select__menu-wrapper--${menuPosition}`,
          )}
          style={{ height: options.length > 6 ? '150px' : 'auto' }}
        >
          <ul
            className="ui-select__menu"
            style={{ overflowY: options.length > 6 ? 'auto' : 'visible' }}
          >
            {options.map((option) => (
              <li
                key={option.value}
                className={classNames(
                  'ui-select__menu-item',
                  value === String(option.value) ? 'ui-select__menu-item--active' : '',
                )}
                onClick={() => handleChangeValue(String(option.value))}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
