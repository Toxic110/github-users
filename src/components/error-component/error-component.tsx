import './styles.scss';

import { Button } from '@ui';

export const ErrorComponent = () => (
  <div className="error-boundary">
    <h1 className="error-boundary__title">OOPS!</h1>
    <p className="error-boundary__info">Кажется что то пошло не так!</p>
    <Button
      variabel="primary"
      className="error-boundary__button"
      onClick={() => window.location.reload()}
    >
      Перезагрузить страницу и надеяться что все заработает
    </Button>
  </div>
);
