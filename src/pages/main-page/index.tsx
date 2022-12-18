import classNames from 'classnames';
import { useCallback, useState } from 'react';

import { Sidebar } from './components/sidebar';
import { MainTable } from './components/table';

export const MainPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleArrowClick = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <div className="main-page">
      <div
        className={classNames(
          'main-page__open-sidebar',
          isOpen && 'main-page__open-sidebar--show',
        )}
        onClick={handleArrowClick}
      />
      <Sidebar hide={isOpen} onClose={setIsOpen} />
      <MainTable fullWidth={isOpen} />
    </div>
  );
};
