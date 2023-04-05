import { fetchUser, fetchUsersList, usersActions, usersReducer } from '@store';

const usersInitialState = {
  error: '',
  filters: {},
  loading: false,
  isShowSidebar: false,
  totalCount: 0,
  ids: [],
  entities: {},
  user: null,
};

describe('main page slice', () => {
  it('should return default state when passed an empty action', () => {
    const result = usersReducer(undefined, { type: '' });

    expect(result).toEqual(usersInitialState);
  });

  it('should set filters', () => {
    const filters = {
      location: 'china',
      repos: '1',
      login: '',
      language: 'javascript',
      followers: '',
    };

    const action = { type: usersActions.setFilters.type, payload: filters };

    const result = usersReducer(usersInitialState, action);

    expect(result).toEqual({ ...usersInitialState, filters });
  });

  it('sould fetch user list resolved response', async () => {
    const dispatch = jest.fn();
    const thunk = fetchUsersList({});

    await thunk(dispatch, () => ({}), null);

    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(fetchUsersList.pending.type);
    expect(end[0].type).toBe(fetchUsersList.fulfilled.type);
  });
});

describe('user page slice', () => {
  it('should return default state when passed an empty action', () => {
    const result = usersReducer(undefined, { type: '' });

    expect(result).toEqual(usersInitialState);
  });

  it('sould fetch user resolved response', async () => {
    const dispatch = jest.fn();
    const thunk = fetchUser({ id: '47587012' });

    await thunk(dispatch, () => ({}), null);

    const { calls } = dispatch.mock;

    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(fetchUser.pending.type);
    expect(end[0].type).toBe(fetchUser.fulfilled.type);
  });
});
