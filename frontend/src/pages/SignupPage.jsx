import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { object, string, ref } from 'yup';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  Button, Col, Container, Form, Row,
} from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import routes from '../routes';
import useAccountAPI from '../api/account';

const SignupPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const accountAPI = useAccountAPI();

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: object().shape({
      username: string()
        .required(t('errors.required'))
        .min(3, t('errors.min3'))
        .max(20, t('errors.max20')),
      password: string()
        .required(t('errors.required'))
        .min(6, t('errors.min6')),
      confirmPassword: string().oneOf(
        [ref('password'), null],
        t('errors.matchPassword'),
      ),
    }),
    onSubmit: async (values, { setFieldError }) => {
      try {
        await accountAPI.signUp(values);
        navigate(routes.mainPage());
      } catch (error) {
        formik.setSubmitting(false);
        if (error.status === 409) {
          setFieldError('username', t('errors.userAlreadyExist'));
          inputRef.current.select();
        }
      }
    },
  });

  return (
    <Container fluid>
      <Row className="justify-content-center pt-5">
        <Col className="col-sm-4">
          <Form onSubmit={formik.handleSubmit} className="p-3">
            <h2 className="text-center mb-3">
              {' '}
              {t('signupPage.heading')}
            </h2>
            <FloatingLabel
              label={t('signupPage.usernameLabel')}
              className="mb-3"
              controlId="username"
            >
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.username}
                name="username"
                autoComplete="off"
                isInvalid={formik.errors.username}
                ref={inputRef}
                disabled={formik.isSubmitting}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors.username}
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
              label={t('signupPage.passwordLabel')}
              className="mb-3"
              controlId="password"
            >
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="password"
                name="password"
                autoComplete="new-password"
                isInvalid={formik.errors.password}
                disabled={formik.isSubmitting}
                id="new-password"
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors.password}
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
              label={t('signupPage.confirmPasswordLabel')}
              className="mb-3"
              controlId="confirmPassword"
            >
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                placeholder="password"
                name="confirmPassword"
                isInvalid={formik.errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors.confirmPassword}
              </Form.Control.Feedback>
            </FloatingLabel>
            <Button
              type="submit"
              variant="outline-primary"
              size="lg"
              className="w-100"
              disabled={formik.isSubmitting}
            >
              {t('signupPage.signup')}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
