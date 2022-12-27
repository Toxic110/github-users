import type { IUserResponse } from '@interface';
import axios from 'axios';

const BASE_URL = 'https://api.github.com';

/**
 * Сервис работы с github-users.
 */

export const applicationService = {
  /**
   * Получить список пользователей.
   */
  getUsers: (): Promise<IUserResponse> =>
    axios({
      url: `${BASE_URL}/search/users?q=type:user&page=1`,
      method: 'GET',
    }).then((res) => res.data),
};
