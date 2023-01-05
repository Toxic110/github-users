import { MainPage } from '@pages';
import { store } from '@store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

test('render main page', () => {
  const component = renderer.create(
    <Provider store={store}>
      <MainPage />
    </Provider>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
