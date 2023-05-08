import './styles.scss';

import classNames from 'classnames';
import { FC } from 'react';

/** Типы кнопки. */
type ButtonVariabel = 'primary' | 'secondary';

/** Интерфейс для кнопки. */
interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Потомки кнопки. */
  children: React.ReactNode;
  /** Вариант кнопки. */
  variabel: ButtonVariabel;
  /** Класс кнопки. */
  className?: string;
}

export const Button: FC<IButton> = ({ variabel, children, className, ...rest }) => {
  return (
    <button className={classNames(className, `ui-button--${variabel}`)} {...rest}>
      {children}
    </button>
  );
};
