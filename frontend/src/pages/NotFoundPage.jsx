import React, { useTranslation } from "react-i18next";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Container className="vh-100">
      <Row className="justify-content-center  align-items-center h-100">
        <Col className="col-sm-4 mb-5">
          <h1>{t("errorPage.title")}</h1>
          <p>{t("errorPage.body")}</p>
        </Col>
      </Row>
    </Container>
  );
};
