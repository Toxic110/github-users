import { fireEvent, render, screen } from '@testing-library/react';
import { Input } from '@ui';

test('should be correct change value', () => {
  render(<Input name="test" label="select" />);
  const input = screen.getByTestId('ui-input');
  fireEvent.change(input, { target: { value: 'test value' } });

  expect(input).toHaveValue('test value');
});
