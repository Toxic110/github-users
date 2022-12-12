import { Button, Input, Select } from '@ui';
import classNames from 'classnames';
import { useCallback, useState } from 'react';

const mokeOptions = [
  { label: 'val1', value: 1 },
  { label: 'val2', value: 2 },
];

export const Sidebar = () => {
  const [isHide, setIsHide] = useState<boolean>(false);

  const handleArrowClick = useCallback(() => setIsHide((prev) => !prev), []);

  return (
    <div className={classNames('sidebar', isHide && 'sidebar--hide')}>
      <div className="sidebar-head">
        <div className="sidebar-head__title">Фильтры</div>
        <div
          className="sidebar-head__arrow"
          onClick={handleArrowClick}
          role="presentation"
        />
      </div>
      <div className="sidebar-body">
        <div className="sidebar-body__row">
          <Select name="status" label="Статус" options={mokeOptions} />
        </div>
        <div className="sidebar-body__row">
          <Input name="code" label="Код" />
        </div>
        <div className="sidebar-body__row">
          <Input name="userName" label="Наименование" />
        </div>
        <div className="sidebar-body__row">
          <Select name="role" label="Тип роли" options={mokeOptions} />
        </div>
        <div className="sidebar-body__row">
          <Input name="description" label="Описание" />
        </div>
      </div>
      <div className="sidebar-footer">
        <div className="sidebar-footer__button">
          <Button variabel="primary">Применить</Button>
        </div>
        <div className="sidebar-footer__button">
          <Button variabel="secondary">Сбросить</Button>
        </div>
      </div>
    </div>
  );
};
