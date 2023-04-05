import { IStore } from '@interface';
import { usersItemsSelector, usersSelectors } from '@store';

const mokeStore = {
  usersReducer: {
    loading: false,
    ids: [0],
    entities: {
      '0': {
        avatar_url: 'asd',
        id: 1,
        login: 'asd',
        type: 'asd',
        html_url: 'asd',
      },
    },
    isShowSidebar: false,
    totalCount: 0,
    error: '',
    filters: {
      location: 'china',
      repos: '1',
      login: '',
      language: 'javascript',
      followers: '',
    },
    user: {
      avatar_url: 'asd',
      id: 1,
      login: 'asd',
      type: 'asd',
      html_url: 'asd',
      bio: 'asd',
      followers: 1,
      following: 2,
      location: 'asd',
      name: 'asd',
      company: 'asd',
    },
  },
};

describe('should main page selectors', () => {
  it('should return correct users', () => {
    const result = Object.assign({}, usersItemsSelector(mokeStore));

    expect(result).toEqual(mokeStore.usersReducer.entities);
  });

  it('should return correct filers', () => {
    const result = usersSelectors.filtersSelector(mokeStore);

    expect(result).toEqual(mokeStore.usersReducer.filters);
  });

  it('should return correct error', () => {
    const result = usersSelectors.errorSelector(mokeStore as unknown as IStore);

    expect(result).toBeNull;
  });

  it('should return correct loading', () => {
    const result = usersSelectors.loadingSelector(mokeStore);

    expect(result).toBeNull;
  });

  it('should return correct user', () => {
    const result = usersSelectors.userSelector(mokeStore);

    expect(result).toEqual(mokeStore.usersReducer.user);
  });
});
