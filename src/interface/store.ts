import { Filter, IUser, IUserFull } from '@interface';
import { EntityState } from '@reduxjs/toolkit';

/** Интерфейс стора. */
export interface IStore {
  /** Главная страница. */
  usersReducer: EntityState<IUser> & {
    /** Признак загрузки. */
    loading: boolean;
    /** Общее количество. */
    totalCount: number;
    /** Признак ошибки. */
    error: string;
    /** Фильтры. */
    filters: Filter;
    /** Признак скрывать или отображать сайдбар. */
    isShowSidebar: boolean;
    /** Пользователь. */
    user: IUserFull;
  };
}
