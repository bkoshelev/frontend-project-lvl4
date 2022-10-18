import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import routes from '../routes';
import useAccountAPI from '../api/account';

const Header = () => {
  const { t } = useTranslation();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const accountAPI = useAccountAPI();

  const handleClick = async () => {
    await accountAPI.logOut();
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <a href={routes.mainPage()} className="navbar-brand">
          {t('header.hexletLogo')}
        </a>
        {loggedIn && (
          <Button className="ms-auto" variant="primary" onClick={handleClick}>
            {t('header.exit')}
          </Button>
        )}
      </Container>
    </nav>
  );
};

export default Header;
