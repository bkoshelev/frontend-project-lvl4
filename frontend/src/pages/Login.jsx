import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/index.js";
import routes from "../routes.js";
import { useTranslation } from "react-i18next";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Card from "react-bootstrap/Card";
import * as Yup from "yup";

export const Login = () => {
  const { t } = useTranslation();

  const auth = useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();

  if (auth.loggedIn) {
    navigate("/");
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required(t("errors.required")),
      password: Yup.string().required(t("errors.required")),
    }),
    onSubmit: async (values, { setFieldError }) => {
      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem("userId", JSON.stringify(res.data));
        auth.logIn();
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setFieldError("username", t("loginPage.error"));
          setFieldError("password", t("loginPage.error"));
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Form onSubmit={formik.handleSubmit} className="p-3">
            <h2 className="text-center">{t("loginPage.signin")}</h2>
            <FloatingLabel
              label={t("loginPage.nickNameLabel")}
              className="mb-3"
            >
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder="username"
                name="username"
                id="username"
                autoComplete="username"
                isInvalid={!!formik.errors.username}
                required
                ref={inputRef}
              />
              <Form.Control.Feedback tooltip type="invalid">
                {formik.errors.username}
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
              label={t("loginPage.passwordLabel")}
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
                isInvalid={!!formik.errors.password}
                required
              />
              <Form.Control.Feedback tooltip type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </FloatingLabel>
            <Button type="submit" variant="outline-primary w-100">
              {t("loginPage.signin")}
            </Button>
          </Form>
          <Card>
            <Card.Body className="text-center">
              {[
                t("loginPage.noAccount"),
                " ",
                <a key={2} href="/signup">
                  {t("loginPage.toSignupPageLink")}
                </a>,
              ]}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};
