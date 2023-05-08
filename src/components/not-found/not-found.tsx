import './styles.scss';

import { URLS } from '@constants';
import { Link } from 'react-router-dom';

export const NotFound = () => (
  <div className="not-found">
    <h1 className="not-found__title">404</h1>
    <p className="not-found__info">Страница не найдена</p>
    <Link to={URLS.HOME_PAGE} className="not-found__link">
      Вернуться на главную
    </Link>
  </div>
);
