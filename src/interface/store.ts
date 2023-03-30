import { Filter, IUser, IUserFull } from '@interface';

/** Интерфейс стора. */
export interface IStore {
  /** Главная страница. */
  mainPageReducer: {
    /** Признак загрузки. */
    loading: boolean;
    /** Пользователи. */
    users: {
      /** Список пользователей. */
      items: IUser[];
      /** Общее количество. */
      total_count: number;
    };
    /** Признак ошибки. */
    error: string;
    /** Фильтры. */
    filters: Filter;
    /** Признак скрывать или отображать сайдбар. */
    isShowSidebar: boolean;
  };
  /** Страница пользователя. */
  userPageReducer: {
    /** Признак загрузки. */
    loading: boolean;
    /** Пользователь. */
    user: IUserFull;
    /** Признак ошибки. */
    error: string;
  };
}
