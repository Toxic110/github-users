import { render } from '@testing-library/react';
import { Button } from '@ui';

test('should be primary class', () => {
  const { container } = render(<Button variabel="primary">its primary button</Button>);
  expect(container.firstChild).toHaveClass('ui-button--primary');
});

test('should be secondary class', () => {
  const { container } = render(
    <Button variabel="secondary">its secondary button</Button>,
  );
  expect(container.firstChild).toHaveClass('ui-button--secondary');
});

test('should be merge custom class', () => {
  const { container } = render(
    <Button variabel="secondary" className="test">
      merged custum class
    </Button>,
  );
  expect(container.firstChild).toHaveClass('ui-button--secondary test');
});
