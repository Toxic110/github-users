import type { Filter, IUserFull, IUserResponse } from '@interface';
import type { AxiosError } from 'axios';
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
      url: `${BASE_URL}/search/users`,
      method: 'GET',
      params: {
        q: `type:user+repos:${filters?.repos || 1}+location:${
          filters?.location ?? ''
        }+language:${filters?.language ?? ''}+followers:>=${filters?.followers || 0}+${
          filters?.login ?? ''
        }in:login`,
        page: page ?? 1,
        per_page: pageSize ?? 10,
      },
    })
      .then((res) => res.data)
      .catch(() => {
        throw new Error('Сервис временно не доступен, попробуйте позже');
      }),

  /**
   * Получить данные пользователя.
   */
  getUser: (id: string): Promise<IUserFull> =>
    axios({
      url: `${BASE_URL}/user/${id}`,
    })
      .then((res) => res.data)
      .catch((error: AxiosError) => {
        if (error?.response?.status === 404) {
          throw new Error('Пользователь не найден');
        }

        throw new Error('Сервис временно не доступен, попробуйте позже');
      }),
};
