import type { Filter, IUserResponse } from '@interface';
import axios from 'axios';

const BASE_URL = 'https://api.github.com';

/**
 * Сервис работы с github-users.
 */

export const applicationService = {
  /**
   * Получить список пользователей.
   */
  getUsersList: (
    page?: number,
    pageSize?: number,
    filters?: Filter,
  ): Promise<IUserResponse> =>
    axios({
      url: `${BASE_URL}/search/users?q=type:user+repos:${filters?.repos || 1}+location:${
        filters?.location ?? ''
      }+language:${filters?.language ?? ''}+followers:>=${filters?.followers || 0}+${
        filters?.login ?? ''
      }in:login&page=${page ?? 1}&per_page=${pageSize ?? 10}`,
      method: 'GET',
    }).then((res) => res.data),

  /**
   * Получить данные пользователя.
   */
  getUser: (id: string) =>
    axios({
      url: `${BASE_URL}/user/${id}`,
    }).then((res) => res.data),
};
