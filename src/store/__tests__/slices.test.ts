import { fetchUser, fetchUsersList } from '@store';

import { mainPageActions, mainPageReducer } from '../slices/main-page-slice';
import { userPageReducer } from '../slices/user-page-slice';

const mainPageInitialState = {
  error: false,
  filters: {},
  loading: false,
  users: { items: [], total_count: 0 },
};

const userPageInitialState = {
  loading: false,
  user: null,
  error: false,
};

describe('main page slice', () => {
  it('should return default state when passed an empty action', () => {
    const result = mainPageReducer(undefined, { type: '' });

    expect(result).toEqual(mainPageInitialState);
  });

  it('should set filters', () => {
    const filters = {
      location: 'china',
      repos: '1',
      login: '',
      language: 'javascript',
      followers: '',
    };

    const action = { type: mainPageActions.setFilters.type, payload: filters };

    const result = mainPageReducer(mainPageInitialState, action);

    expect(result).toEqual({ ...mainPageInitialState, filters });
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
    const result = userPageReducer(undefined, { type: '' });

    expect(result).toEqual(userPageInitialState);
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
