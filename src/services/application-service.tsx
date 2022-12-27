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
  getUsers: (page?: number): Promise<IUserResponse> =>
    axios({
      url: `${BASE_URL}/search/users?q=type:user&page=${page ?? 0}`,
      method: 'GET',
    }).then((res) => res.data),
};
