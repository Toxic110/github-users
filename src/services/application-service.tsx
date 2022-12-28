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
  getUsers: (page?: number, pageSize?: number): Promise<IUserResponse> =>
    axios({
      url: `${BASE_URL}/search/users?q=type:user+repos:1000&page=${page ?? 1}&per_page=${
        pageSize ?? 10
      }`,
      method: 'GET',
    }).then((res) => res.data),
};
