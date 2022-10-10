import React from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { useAuth } from '../hooks';

const Header = () => {
  const { loggedIn, logOut } = useAuth();
  const { t } = useTranslation();

  const handleClick = () => {
    logOut();
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <a href="/" className="navbar-brand">
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
