import './styles.scss';

import { FC } from 'react';

/** Интерфейс для инпута. */
interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Имя инпута. */
  name: string;
  /** Именование инпута. */
  label: string;
}

export const Input: FC<IInput> = ({ label, name, ...rest }) => {
  return (
    <label>
      <div className="ui-label">{label}</div>
      <input
        name={name}
        className="ui-input"
        type="text"
        {...rest}
        data-testid="ui-input"
      />
    </label>
  );
};
