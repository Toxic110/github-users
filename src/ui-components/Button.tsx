import classNames from 'classnames';
import { FC } from 'react';

type ButtonVariabel = 'primary' | 'secondary';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variabel: ButtonVariabel;
  className?: string;
}

export const Button: FC<IButton> = ({ variabel, children, className, ...rest }) => {
  return (
    <button className={classNames(className, `ui-button--${variabel}`)} {...rest}>
      {children}
    </button>
  );
};
