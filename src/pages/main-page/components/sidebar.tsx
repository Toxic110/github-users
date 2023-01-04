import { OPTIONS } from '@constants';
import { useAppDispatch, useAppSelector } from '@hooks';
import { fetchUsers, setFilters } from '@store';
import { Button, Input, Select } from '@ui';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';

/** Интерфейс сайдбапа. */
interface ISidebar {
  /** Признак отображения сайдбара. */
  hide: boolean;
  /** Метод скрытия сайдбара. */
  onClose(flag: boolean): void;
}

export const Sidebar: React.FC<ISidebar> = ({ hide, onClose }) => {
  const [hasClearSelect, setHasClearSelect] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.mainPage.filters);
  const handleClose = useCallback(() => onClose(true), [onClose]);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const filters = Object.fromEntries([...formData]);

    dispatch(setFilters(filters));
  };

  const handleClearFilter = () => {
    setHasClearSelect(true);
  };

  useEffect(() => {
    dispatch(fetchUsers({ filters }));
  }, [filters]);

  useEffect(() => {
    if (hasClearSelect) {
      setHasClearSelect(false);
    }
  }, [hasClearSelect]);

  return (
    <form
      onSubmit={handleSubmit}
      className={classNames('sidebar', hide && 'sidebar--hide')}
    >
      <div className="sidebar-head">
        <div className="sidebar-head__title">Фильтры</div>
        <div className="sidebar-head__arrow" onClick={handleClose} />
      </div>
      <div className="sidebar-body">
        <div className="sidebar-body__row">
          <Select
            name="location"
            label="Локация"
            options={OPTIONS.locationOptions}
            clearSelect={hasClearSelect}
          />
        </div>
        <div className="sidebar-body__row">
          <Input name="repos" label="Количество репозиториев" type="number" />
        </div>
        <div className="sidebar-body__row">
          <Input name="login" label="Логин" />
        </div>
        <div className="sidebar-body__row">
          <Select
            name="language"
            label="Язык"
            options={OPTIONS.languageOptions}
            clearSelect={hasClearSelect}
          />
        </div>
        <div className="sidebar-body__row">
          <Input name="followers" label="Количество подписчиков" type="number" />
        </div>
      </div>
      <div className="sidebar-footer">
        <div className="sidebar-footer__button">
          <Button variabel="primary">Применить</Button>
        </div>
        <div className="sidebar-footer__button">
          <Button variabel="secondary" type="reset" onClick={handleClearFilter}>
            Сбросить
          </Button>
        </div>
      </div>
    </form>
  );
};
