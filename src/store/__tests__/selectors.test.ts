import { mainPageSelectors, userPageSelectors } from '@store';

const mokeStore = {
  mainPageReducer: {
    loading: false,
    users: {
      items: [
        {
          avatar_url: 'asd',
          id: 1,
          login: 'asd',
          type: 'asd',
          html_url: 'asd',
        },
      ],
      total_count: 0,
    },
    error: false,
    filters: {
      location: 'china',
      repos: '1',
      login: '',
      language: 'javascript',
      followers: '',
    },
  },
  userPageReducer: {
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
    loading: false,
    error: false,
  },
};

describe('should main page selectors', () => {
  it('should return correct users', () => {
    const result = mainPageSelectors.usersSelector(mokeStore);

    expect(result).toEqual(mokeStore.mainPageReducer.users.items);
  });

  it('should return correct filers', () => {
    const result = mainPageSelectors.filtersSelector(mokeStore);

    expect(result).toEqual(mokeStore.mainPageReducer.filters);
  });

  it('should return correct error', () => {
    const result = mainPageSelectors.errorSelector(mokeStore);

    expect(result).toBeNull;
  });

  it('should return correct loading', () => {
    const result = mainPageSelectors.loadingSelector(mokeStore);

    expect(result).toBeNull;
  });
});

describe('should user page selectors', () => {
  it('should return correct user', () => {
    const result = userPageSelectors.userSelector(mokeStore);

    expect(result).toEqual(mokeStore.userPageReducer.user);
  });

  it('should return correct error', () => {
    const result = userPageSelectors.errorSelector(mokeStore);

    expect(result).toBeNull;
  });

  it('should return correct loading', () => {
    const result = userPageSelectors.loadingSelector(mokeStore);

    expect(result).toBeNull;
  });
});
