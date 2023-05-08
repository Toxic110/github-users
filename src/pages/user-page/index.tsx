import './styles.scss';

import { Loader } from '@components';
import { URLS } from '@constants';
import { useAppDispatch, useAppSelector } from '@hooks';
import { IUserFull } from '@interface';
import { fetchUser, usersSelectors } from '@store';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const UserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const user: IUserFull = useAppSelector(usersSelectors.userSelector);
  const loading = useAppSelector(usersSelectors.loadingSelector);

  useEffect(() => {
    if (id) {
      dispatch(fetchUser({ id }));
    }
  }, [id]);

  const handleBackClick = () => {
    navigate(URLS.HOME_PAGE);
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="user-page">
      <div className="user-page__head">
        <div className="user-page__back" onClick={handleBackClick}>
          &larr; Назад
        </div>
        <div className="user-page__head-info">
          <div className="user-page__head-info-column">
            <img className="user-page__avatar" src={user.avatar_url} alt="avatar" />
            <a
              href={user.html_url}
              className="user-page__link"
              target="_blank"
              rel="noreferrer"
            >
              Посмотреть профиль
            </a>
          </div>
          <div className="user-page__head-info-column">
            <div className="user-page__name">{user.name}</div>
            <div className="user-page__location">{user.location}</div>
          </div>
        </div>
      </div>
      <div className="user-page__body">
        <div className="user-page__body-column">
          <div className="user-page__body-column-title">Подписок</div>
          <div className="user-page__body-column-text">{user.following}</div>
        </div>
        <div className="user-page__body-column">
          <div className="user-page__body-column-title">Подписчиков</div>
          <div className="user-page__body-column-text">{user.followers}</div>
        </div>
      </div>
      <h2 className="user-page__subtitle">О пользователе</h2>
      <div className="user-page__footer">
        <div className="user-page__footer-row">Немного о себе: {user.bio ?? '-'}</div>
        <div className="user-page__footer-row">Компания: {user.company ?? '-'}</div>
      </div>
    </div>
  );
};
