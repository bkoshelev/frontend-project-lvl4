import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import { Button, Form } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import routes from "../routes";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";

export const SignupPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required(t("errors.required"))
        .min(3, t("errors.min3"))
        .max(20, t("errors.max20")),
      password: Yup.string()
        .required(t("errors.required"))
        .min(6, t("errors.min6")),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        t("errors.matchPassword")
      ),
    }),
    onSubmit: async (values, { setFieldError }) => {
      try {
        const res = await axios.post(routes.signupPath(), values);
        localStorage.setItem("userId", JSON.stringify(res.data));
        auth.logIn();
        navigate("/");
      } catch (err) {
        formik.setSubmitting(false);
        if (err.response.status === 409) {
          setFieldError("username", t("errors.userAlreadyExist"));
          inputRef.current.select();
        }
      }
    },
  });

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Form onSubmit={formik.handleSubmit} className="p-3">
            <h2 className="text-center">Регистрация</h2>
            <FloatingLabel
              label={t("signupPage.usernameLabel")}
              className="mb-3"
            >
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.username}
                name="username"
                id="username"
                autoComplete="username"
                isInvalid={formik.errors.username}
                ref={inputRef}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors.username}
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
              label={t("signupPage.passwordLabel")}
              className="mb-3"
            >
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="password"
                name="password"
                id="password"
                autoComplete="current-password"
                isInvalid={formik.errors.password}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors.password}
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
              label={t("signupPage.confirmPasswordLabel")}
              className="mb-3"
            >
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                placeholder="password"
                name="confirmPassword"
                id="confirmPassword"
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
              {t("signupPage.signup")}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
