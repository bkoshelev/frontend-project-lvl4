/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { object, string } from 'yup';
import { useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import routes from '../routes.js';
import useAccountAPI from '../api/account';

const Login = () => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const { loggedIn } = useSelector((state) => state.auth);
  const accountAPI = useAccountAPI();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: object().shape({
      username: string().required(t('errors.required')),
      password: string().required(t('errors.required')),
    }),
    onSubmit: async (values, { setFieldError, setSubmitting }) => {
      setSubmitting(true);
      try {
        await accountAPI.logIn(values);
      } catch (error) {
        if (error.status === 401) {
          setFieldError('username', t('loginPage.error'));
          setFieldError('password', t('loginPage.error'));
          inputRef.current.select();
        }
      }
    },
  });

  return loggedIn ? <Navigate to={routes.mainPage()} /> : (
    <Container>
      <Row className="justify-content-center  align-items-center h-100">
        <Col className="col-sm-4 mb-5">
          <Form onSubmit={formik.handleSubmit} className="p-3">
            <h2 className="text-center">{t('loginPage.signin')}</h2>
            <FloatingLabel
              label={t('loginPage.nickNameLabel')}
              className="mb-3"
              controlId="username"
            >
              <Form.Control
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder="username"
                name="username"
                disabled={formik.isSubmitting}
                isInvalid={!!formik.errors.username}
                autoComplete="off"
                ref={inputRef}
              />
              <Form.Control.Feedback tooltip type="invalid">
                {formik.errors.username}
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
              label={t('loginPage.passwordLabel')}
              className="mb-3"
              controlId="current-password"
            >
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="password"
                name="password"
                autoComplete="current-password"
                disabled={formik.isSubmitting}
                isInvalid={!!formik.errors.password}
              />
              <Form.Control.Feedback tooltip type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </FloatingLabel>
            <Button type="submit" variant="outline-primary w-100">
              {t('loginPage.signin')}
            </Button>
          </Form>
          <Card>
            <Card.Body className="text-center">
              {[
                t('loginPage.noAccount'),
                ' ',
                <a key={2} href={routes.signupPage()}>
                  {t('loginPage.toSignupPageLink')}
                </a>,
              ]}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
