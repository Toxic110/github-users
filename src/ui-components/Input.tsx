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
      <span className="ui-label">{label}</span>
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
