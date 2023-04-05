import { OPTIONS } from '@constants';
import { useAppDispatch, useAppSelector, useResize, useUpdateEffect } from '@hooks';
import { fetchUsersList, usersActions, usersSelectors } from '@store';
import { Button, Input, Select } from '@ui';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

export const Sidebar: React.FC = () => {
  const [hasClearSelect, setHasClearSelect] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const filters = useAppSelector(usersSelectors.filtersSelector);
  const isShowSidebar = useAppSelector(usersSelectors.isShowSidebar);
  const handleClose = () => dispatch(usersActions.setHideSidebar(true));
  const { isScreenSm } = useResize();

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const filters = Object.fromEntries([...formData]);

    dispatch(usersActions.setFilters(filters));

    if (isScreenSm) {
      handleClose();
    }
  };

  const handleClearFilter = () => {
    setHasClearSelect(true);
  };

  useUpdateEffect(() => {
    dispatch(fetchUsersList({ filters }));
  }, [filters]);

  useEffect(() => {
    if (hasClearSelect) {
      setHasClearSelect(false);
    }
  }, [hasClearSelect]);

  return (
    <form
      onSubmit={handleSubmit}
      className={classNames('sidebar', isShowSidebar && 'sidebar--hide')}
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
