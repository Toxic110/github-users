import { FC } from 'react';

interface IButton {
  children: React.ReactNode;
}

export const Button: FC<IButton> = ({ children }) => {
  return <button>{children}</button>;
};
