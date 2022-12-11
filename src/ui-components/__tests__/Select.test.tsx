import { fireEvent, render, screen } from '@testing-library/react';
import { Select } from 'Ui';

const mokeOptions = [
  { label: 'moke-value-1', value: 'value-1' },
  { label: 'moke-value-2', value: 'value-2' },
];

test('should be open menu after click', () => {
  const { container } = render(
    <Select name="test" label="select" options={mokeOptions} />,
  );
  const inner = container.querySelector('.ui-select__inner');
  fireEvent.click(inner as Node);

  expect(container.querySelector('ul')).toBeInTheDocument();
});

test('should be current value input after click menu item', () => {
  const { container } = render(
    <Select name="test" label="select" options={mokeOptions} />,
  );
  const inner = container.querySelector('.ui-select__inner');
  fireEvent.click(inner as Node);
  const item = container.querySelector('.ui-select__menu-item');
  fireEvent.click(item as Node);

  expect(screen.getByTestId('ui-select-value')).toHaveValue('value-1');
});

test('should be close menu after click menu item', () => {
  const { container } = render(
    <Select name="test" label="select" options={mokeOptions} />,
  );
  const inner = container.querySelector('.ui-select__inner');
  fireEvent.click(inner as Node);
  const item = container.querySelector('.ui-select__menu-item');
  fireEvent.click(item as Node);

  expect(container.querySelector('ul')).not.toBeInTheDocument();
});
