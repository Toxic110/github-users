/** Интерфейс пользователя. */
export interface IUser {
  /** Аватар пользователя. */
  avatar_url: string;
  /** Индентификатор пользователя. */
  id: number;
  /** Логин пользователя. */
  login: string;
  /** Тип пользователя. */
  type: string;
  /** Ссылка на страничку пользователя. */
  html_url: string;
}

/** Интерфейс ответа пользователя. */
export interface IUserResponse {
  /** Массив пользователей. */
  items: IUser[];
  /** Общее количество пользователей. */
  total_count: number;
}

/** Расширенный интерфейс пользователя. */
export interface IUserFull extends IUser {
  /** Биография пользователя. */
  bio: string;
  /** Число подписчиков пользователя. */
  followers: number;
  /** Число подписок пользователя. */
  following: number;
  /** Местонахождение пользователя. */
  location: string;
  /** Имя пользователя. */
  name: string;
  /** Компания пользователя. */
  company: string;
}
