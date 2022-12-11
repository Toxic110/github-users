import classNames from 'classnames';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

/** Опции для селекта. */
interface SelectOption {
  /** Выводимое значение для пользователя. */
  label: string;
  /** Значение опции. */
  value: number;
}

/** Пропсы селекта. */
interface ISelect {
  /** Имя. */
  name: string;
  /** Именование селекта. */
  label?: string;
  /** Массив опций. */
  options: SelectOption[];
  /** Признак приминения других стилей. */
  extraSmall?: boolean;
  /** Функция выбрасывающая значение наружу. */
  valueSetter?: (val: number) => void;
  /** Дефолтное значение. */
  defaultValue?: SelectOption;
}

export const Select: FC<ISelect> = ({
  label,
  options,
  name,
  extraSmall,
  valueSetter,
  defaultValue,
}) => {
  const [selectedValue, setSelectedValue] = useState<number>(defaultValue?.value || 0);
  const [selectedLabel, setSelectedLabel] = useState<string>(defaultValue?.label || '');
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

  const handleChangeValue = useCallback(
    (value: number, label: string) => {
      setSelectedValue(value);
      setSelectedLabel(label);
      setIsOpen(false);
      if (valueSetter) {
        valueSetter(value);
      }
    },
    [selectedValue],
  );

  const handleSetVisible = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  return (
    <div
      ref={ref}
      className={classNames(
        'ui-select',
        isOpen && 'ui-select__open',
        extraSmall && 'ui-select--small',
      )}
    >
      <span className="ui-label" onClick={handleSetVisible} role="presentation">
        {label}
      </span>
      <div
        className={classNames(
          'ui-input ui-select__inner',
          extraSmall && 'ui-input--small',
        )}
        onClick={handleSetVisible}
        role="presentation"
      >
        {selectedLabel}
      </div>
      <input
        name={name}
        value={selectedValue}
        onChange={() => setSelectedValue}
        hidden
        data-testid="ui-select-value"
      />
      {isOpen && (
        <div
          className="ui-select__menu-wrapper"
          style={{ height: options.length > 6 ? '150px' : 'auto' }}
        >
          <ul
            className="ui-select__menu"
            style={{ overflowY: options.length > 6 ? 'scroll' : 'auto' }}
          >
            {options.map((option) => (
              <li
                key={option.value}
                className={classNames(
                  'ui-select__menu-item',
                  selectedValue === option.value ? 'ui-select__menu-item--active' : '',
                )}
                onClick={() => handleChangeValue(option.value, option.label)}
                role="presentation"
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